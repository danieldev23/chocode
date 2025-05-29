import express, { Request, Response } from "express";
import MB from "./MB";
import config from "../config.json";
import apiRouter from "./routes/api.routes";
import cron from "node-cron";
import axios from "axios";
import fs from "fs/promises";
import path from "path";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware configuration
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

// ==================== INTERFACES AND TYPES ==================== //
interface CreateTransactionDto {
  username: string;
  posting_date: string; // ISO string format
  transaction_date: string; // ISO string format
  credit_amount: string;
  debit_amount: string;
  currency: string;
  description: string;
  ref_no: string;
  created: string; // ISO string format
}

interface BankTransaction {
  refNo: string;
  postingDate: string;
  transactionDate: string;
  creditAmount: string;
  debitAmount: string;
  currency?: string;
  addDescription?: string;
  accountNo: string;
}

// ==================== CONFIGURATION AND GLOBALS ==================== //
const CACHE_FILE_PATH = path.join(__dirname, "../transactionCache.json");
const CRON_SCHEDULE = "* * * * *"; // Run every 2 minutes for better performance
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Initialize MB banking service with error handling
let mbService: MB | null = null;
let sentTransactions: Set<string> = new Set(); // Use Set for O(1) lookup
let isProcessing = false; // Prevent concurrent executions

// ==================== UTILITY FUNCTIONS ==================== //

/**
 * Get current time in Vietnam timezone
 */
function getVietnamTime(): string {
  return new Date().toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Initialize MB banking service with retry logic
 */
async function initializeMBService(): Promise<void> {
  try {
    mbService = new MB({
      username: config.username,
      password: config.password,
      preferredOCRMethod: "default",
      saveWasm: true,
    });
    console.log("🎉 Khởi tạo dịch vụ MB thành công");
  } catch (error) {
    console.error("❌ Không thể khởi tạo dịch vụ MB:", error);
    throw error;
  }
}

/**
 * Load transaction cache from file
 */
async function loadTransactionCache(): Promise<void> {
  try {
    const data = await fs.readFile(CACHE_FILE_PATH, "utf8");
    const transactions = JSON.parse(data) as string[];
    sentTransactions = new Set(transactions);
    console.log(`📁 Đã tải ${sentTransactions.size} giao dịch từ bộ nhớ đệm`);
  } catch (error) {
    // File doesn't exist or is corrupted, start with empty cache
    sentTransactions = new Set();
    console.log("📁 Bắt đầu với bộ nhớ đệm giao dịch trống");
  }
}

/**
 * Save transaction cache to file with error handling
 */
async function saveTransactionCache(): Promise<void> {
  try {
    const transactions = Array.from(sentTransactions);
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(transactions, null, 2));
    console.log(`💾 Đã lưu ${transactions.length} giao dịch vào bộ nhớ đệm`);
  } catch (error) {
    console.error("❌ Không thể lưu bộ nhớ đệm giao dịch:", error);
  }
}

/**
 * Convert date string from DD/MM/YYYY HH:mm:ss to ISO format
 */
function convertToISOString(dateStr: string): string {
  try {
    // Handle different date formats from MB bank
    if (dateStr.includes("/")) {
      // Format: DD/MM/YYYY HH:mm:ss or DD/MM/YYYY
      const [datePart, timePart = "00:00:00"] = dateStr.split(" ");
      const [day, month, year] = datePart.split("/");
      const isoDate = new Date(`${year}-${month}-${day}T${timePart}`);
      return isoDate.toISOString();
    }

    // If already in ISO format or other format, try to parse directly
    return new Date(dateStr).toISOString();
  } catch (error) {
    console.warn(
      `⚠️ Không thể chuyển đổi ngày tháng: ${dateStr}, sử dụng thời gian hiện tại`
    );
    return new Date().toISOString();
  }
}

function extractUserCodeFromDescription(description: string): string {
  return (
    description.split(" ")[0].replace("-", "").split("CHOCODE")[1] ??
    "Không tìm thấy"
  );
}

/**
 * Send notification to Discord with retry logic
 */
async function sendDiscordNotification(
  message: string,
  retries = 0
): Promise<void> {
  try {
    if (!config.discordWebhookUrl) {
      console.warn("⚠️ Chưa cấu hình URL webhook Discord");
      return;
    }

    await axios.post(
      config.discordWebhookUrl,
      { content: message },
      {
        timeout: 10000, // 10 second timeout
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Gửi thông báo Discord thành công");
  } catch (error) {
    console.error(
      `❌ Gửi thông báo Discord thất bại (lần thử ${retries + 1}):`,
      error
    );

    // Retry logic
    if (retries < MAX_RETRIES) {
      console.log(`🔄 Thử lại gửi thông báo Discord sau ${RETRY_DELAY}ms...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      await sendDiscordNotification(message, retries + 1);
    }
  }
}

/**
 * Add balance for user via API call with retry logic
 */
async function addUserBalance(
  transactionData: CreateTransactionDto,
  retries = 0
): Promise<void> {
  try {
    if (!config.WEBHOOK_BACKEND_URL) {
      console.warn("⚠️ Chưa cấu hình URL webhook backend");
      return;
    }

    await axios.post(
      `${config.WEBHOOK_BACKEND_URL}/api/user/add-balance`,
      transactionData,
      {
        timeout: 15000, // 15 second timeout
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await sendDiscordNotification(
      `💰 Đã cộng ${Math.floor(
        parseInt(transactionData.credit_amount.replace(".", "")) / 1000
      )} CP cho người dùng: ${transactionData.username}`
    );
    console.log(`✅ Đã cộng số dư cho người dùng: ${transactionData.username}`);
  } catch (error) {
    console.error(
      `❌ Không thể cộng số dư người dùng (lần thử ${retries + 1}):`,
      error
    );

    // Retry logic
    if (retries < MAX_RETRIES) {
      console.log(`🔄 Thử lại cập nhật số dư sau ${RETRY_DELAY}ms...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      await addUserBalance(transactionData, retries + 1);
    }
  }
}

/**
 * Format transaction for Discord message
 */
function formatTransactionMessage(transaction: BankTransaction): string {
  return `
🔔 **Phát hiện giao dịch mới**
────────────────────────────
🕒 **Thời gian:** ${transaction.transactionDate}
💳 **Tài khoản:** ${transaction.accountNo}
💸 **Tiền vào:** ${transaction.creditAmount || "0"} VND
💵 **Tiền ra:** ${transaction.debitAmount || "0"} VND
📜 **Mô tả:** ${transaction.addDescription?.trim() || "Không có"}
🔑 **Mã tham chiếu:** ${transaction.refNo}
────────────────────────────
  `.trim();
}

/**
 * Process a single transaction
 */
async function processTransaction(transaction: BankTransaction): Promise<void> {
  try {
    // Skip if already processed
    if (sentTransactions.has(transaction.refNo)) {
      return;
    }

    console.log(`🔄 Đang xử lý giao dịch: ${transaction.refNo}`);

    // Create transaction DTO with proper date formatting
    const transactionDto: CreateTransactionDto = {
      username: extractUserCodeFromDescription(
        transaction.addDescription || ""
      ),
      posting_date: convertToISOString(transaction.postingDate),
      transaction_date: convertToISOString(transaction.transactionDate),
      credit_amount: transaction.creditAmount || "0",
      debit_amount: transaction.debitAmount || "0",
      currency: transaction.currency || "VND",
      description: transaction.addDescription?.trim() || "",
      ref_no: transaction.refNo,
      created: new Date().toISOString(),
    };

    // Format Discord message
    const discordMessage = formatTransactionMessage(transaction);

    // Execute both operations concurrently for better performance
    await Promise.allSettled([
      sendDiscordNotification(discordMessage),
      addUserBalance(transactionDto),
    ]);

    // Mark as processed
    sentTransactions.add(transaction.refNo);
    console.log(`✅ Xử lý giao dịch thành công: ${transaction.refNo}`);
  } catch (error) {
    console.error(`❌ Lỗi khi xử lý giao dịch ${transaction.refNo}:`, error);
    throw error;
  }
}

/**
 * Main transaction checking function
 */
async function checkForNewTransactions(): Promise<void> {
  // Prevent concurrent executions
  if (isProcessing) {
    console.log("⏸️ Đang kiểm tra giao dịch, bỏ qua lần này...");
    return;
  }

  isProcessing = true;
  console.log(`⏰ Kiểm tra giao dịch mới lúc ${getVietnamTime()}`);

  try {
    // Ensure MB service is initialized
    if (!mbService) {
      await initializeMBService();
    }

    // Login to MB service
    await mbService!.login();
    console.log("🔐 Đăng nhập dịch vụ MB thành công");

    // Get current date range (last 10 days for safety)
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 10);

    const formatDate = (date: Date): string => {
      return date.toLocaleDateString("vi-VN"); // DD/MM/YYYY format
    };

    // Fetch transaction history
    const transactions = await mbService!.getTransactionsHistory({
      accountNumber: "09999838622222", // Consider moving to config
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
    });

    console.log(`📊 Đã lấy ${transactions.length} giao dịch tổng cộng`);

    // Filter new transactions
    const newTransactions = transactions.filter(
      (tx: BankTransaction) => !sentTransactions.has(tx.refNo)
    );

    console.log(`🆕 Tìm thấy ${newTransactions.length} giao dịch mới`);

    // Process new transactions
    if (newTransactions.length > 0) {
      // Process transactions sequentially to avoid overwhelming the system
      for (const transaction of newTransactions) {
        await processTransaction(transaction);
        // Small delay between transactions to be gentle on external APIs
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Save updated cache
      await saveTransactionCache();
      console.log(
        `✅ Xử lý thành công ${newTransactions.length} giao dịch mới`
      );
    }
  } catch (error) {
    console.error("❌ Lỗi khi kiểm tra giao dịch:", error);

    // Reset MB service on error
    if (error instanceof Error && error.message.includes("login")) {
      mbService = null;
      console.log("🔄 Đặt lại dịch vụ MB do lỗi đăng nhập");
    }
  } finally {
    isProcessing = false;
  }
}

// ==================== CRON JOB CONFIGURATION ==================== //

/**
 * Schedule periodic transaction checks
 */
cron.schedule(CRON_SCHEDULE, checkForNewTransactions, {
  timezone: "Asia/Ho_Chi_Minh", // Vietnam timezone
});

console.log(`⏰ Đã lên lịch cron job: ${CRON_SCHEDULE}`);

// ==================== SERVER INITIALIZATION ==================== //

/**
 * Initialize the application
 */
async function initializeApp(): Promise<void> {
  try {
    // Load transaction cache
    await loadTransactionCache();

    // Initialize MB service
    await initializeMBService();

    console.log("🚀 Khởi tạo ứng dụng thành công");
  } catch (error) {
    console.error("❌ Không thể khởi tạo ứng dụng:", error);
    // Continue without crashing - services will be retried
  }
}

// ==================== ERROR HANDLING ==================== //

/**
 * Global error handlers
 */
process.on("uncaughtException", (error) => {
  console.error("💥 Lỗi không được xử lý:", error);
  // Don't exit the process, just log the error
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("💥 Promise bị từ chối tại:", promise, "lý do:", reason);
  // Don't exit the process, just log the error
});

// ==================== SERVER STARTUP ==================== //

/**
 * Start the Express server
 */
app.listen(PORT, async () => {
  console.log(`✅ Server đang chạy trên cổng ${PORT}`);
  console.log(`🌍 Môi trường: ${process.env.NODE_ENV || "development"}`);
  console.log(`🕐 Thời gian hiện tại: ${getVietnamTime()}`);

  // Initialize application components
  await initializeApp();

  // Run initial check after startup (with delay)
  setTimeout(() => {
    console.log("🔄 Chạy kiểm tra giao dịch ban đầu...");
    checkForNewTransactions().catch(console.error);
  }, 5000); // 5 second delay
});

// ==================== GRACEFUL SHUTDOWN ==================== //

/**
 * Handle graceful shutdown
 */
process.on("SIGTERM", async () => {
  console.log("📴 Nhận SIGTERM, đang tắt ứng dụng một cách an toàn...");
  await saveTransactionCache();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("📴 Nhận SIGINT, đang tắt ứng dụng một cách an toàn...");
  await saveTransactionCache();
  process.exit(0);
});
