import express, { Request, Response } from "express";
import MB from "./MB";
import config from "../config.json";
import apiRouter from "./routes/api.routes";
import cron from "node-cron";
import axios from "axios";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/api", apiRouter);

// ------------------ TÍCH HỢP CRON JOB TẠI ĐÂY ------------------ //

const mb = new MB({
  username: config.username,
  password: config.password,
  preferredOCRMethod: "default",
  saveWasm: true,
});

// Cache lưu các refNo đã gửi
const cachePath = path.join(__dirname, "../transactionCache.json");
let sentTransactions: string[] = [];

if (fs.existsSync(cachePath)) {
  sentTransactions = JSON.parse(fs.readFileSync(cachePath, "utf8"));
}

const saveCache = () => {
  fs.writeFileSync(cachePath, JSON.stringify(sentTransactions, null, 2));
};

// async function sendTelegramMessage(message: string) {
//   const url = `https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/sendMessage`;
//   await axios.post(url, { chat_id: config.TELEGRAM_CHAT_ID, text: message });
// }

const sendToDiscord = async (message: string) => {
  try {
    await axios.post(config.discordWebhookUrl, {
      content: message,
    });
  } catch (err) {
    console.error("❌ Lỗi gửi Discord:", String(err));
  }
};

// Job chạy mỗi phút
cron.schedule("* * * * *", async () => {
  console.log(
    "⏰ Đang kiểm tra giao dịch mới lúc",
    new Date().toLocaleString("vi-VN")
  );
  try {
    await mb.login();
    const data = await mb.getTransactionsHistory({
      accountNumber: "09999838622222",
      fromDate: "16/05/2025",
      toDate: "25/05/2025",
    });

    const newTransactions = data.filter(
      (tx: any) => !sentTransactions.includes(tx.refNo)
    );
    for (const tx of newTransactions) {
      const message = `
        🔔 **Giao dịch mới**  
        ────────────────────────────
        🕒 **Thời gian:** ${tx?.transactionDate}  
        💳 **Tài khoản:** ${tx?.accountNo}  
        💸 **Tiền vào:** ${tx.creditAmount} VNĐ  
        💵 **Tiền ra:** ${tx.debitAmount} VNĐ  
        📜 **Nội dung:** ${tx.addDescription?.trim()}  
        🔑 **Mã giao dịch:** ${tx.refNo}  
        ────────────────────────────
        `;
      console.log(message);
      await sendToDiscord(message);
      sentTransactions.push(tx.refNo);
    }

    if (newTransactions.length > 0) saveCache();
  } catch (err) {
    console.error("❌ Cron Job Error:", String(err));
  }
});

app.listen(PORT, () => console.log("✅ Server running on port", PORT));
