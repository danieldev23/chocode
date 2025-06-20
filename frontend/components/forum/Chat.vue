<template>
  <div class="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 z-50">
    <!-- Chat Window -->
    <Transition
      name="chat-slide"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 translate-y-8 scale-95"
      leave-to-class="opacity-0 translate-y-8 scale-95"
    >
      <div
        v-if="isChatOpen"
        class="bg-white rounded-lg sm:rounded-xl shadow-2xl border border-gray-200/50 mb-2 sm:mb-4 w-[calc(100vw-16px)] h-[calc(100vh-80px)] sm:w-80 sm:h-[500px] md:w-96 md:h-[550px] lg:w-[420px] lg:h-[600px] xl:w-[450px] xl:h-[650px] max-w-[95vw] max-h-[85vh] backdrop-blur-lg overflow-hidden"
      >
        <!-- Chat Header -->
        <div
          class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white p-2 sm:p-3 md:p-4 flex items-center justify-between"
        >
          <div class="flex items-center space-x-2">
            <div class="relative">
              <div
                class="w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg overflow-hidden"
              >
                <MessageCircle
                  class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white"
                />
              </div>
              <!-- Online status indicator -->
              <div
                class="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm animate-pulse"
              ></div>
            </div>
            <div class="min-w-0 flex-1">
              <div
                class="font-bold text-sm sm:text-base md:text-lg tracking-wide truncate"
              >
                ChoCode Chat
              </div>
              <!-- <div class="text-white/80 text-xs font-medium">
                {{ onlineUsersCount }} người online
              </div> -->
            </div>
          </div>

          <div class="flex items-center space-x-0.5 sm:space-x-1">
            <button
              @click="minimizeChat"
              class="hover:bg-white/20 rounded-lg p-1.5 sm:p-2 transition-all duration-200 hover:scale-105"
              title="Thu nhỏ"
            >
              <Minus class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </button>
            <button
              @click="closeChat"
              class="hover:bg-white/20 rounded-lg p-1.5 sm:p-2 transition-all duration-200 hover:scale-105"
              title="Đóng chat"
            >
              <X class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>

        <!-- Online Users Bar -->

        <!-- Chat Messages -->
        <div
          ref="messagesContainer"
          class="flex-1 p-2 sm:p-3 md:p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white space-y-2 sm:space-y-3 md:space-y-4 h-[calc(100%-140px)] sm:h-[calc(100%-180px)] md:h-[calc(100%-220px)]"
        >
          <!-- Welcome message -->
          <div
            v-if="messages.length === 0"
            class="flex flex-col items-center justify-center h-full text-gray-400 px-2"
          >
            <MessageCircle
              class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4 opacity-50"
            />
            <p class="text-center text-xs sm:text-sm leading-relaxed">
              Chào mừng đến với chat tổng ChoCode!<br />
              Hãy bắt đầu cuộc trò chuyện với cộng đồng
            </p>
          </div>

          <!-- System Messages -->
          <div
            v-for="message in systemMessages"
            :key="message.id"
            class="flex justify-center animate-fade-in"
          >
            <div
              class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium max-w-[80%] text-center"
            >
              {{ message.text }}
            </div>
          </div>

          <!-- Chat Messages -->
          <div
            v-for="message in messages"
            :key="message.id"
            class="animate-fade-in"
          >
            <!-- Other user message -->
            <div
              v-if="!message.isOwn"
              class="flex items-start space-x-1.5 sm:space-x-2 md:space-x-3 group"
            >
              <div class="relative flex-shrink-0">
                <NuxtLink
                  :to="`/trang-ca-nhan/${message.username}`"
                  class="block"
                >
                  <img
                    :src="
                      message.avatar ||
                      '/assets/images/header/default-avatar.png'
                    "
                    :alt="message.fullName || message.username"
                    class="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border-2 border-white shadow-md object-cover hover:scale-110 transition-transform duration-200"
                  />
                </NuxtLink>
                <!-- Online indicator -->
                <div
                  v-if="isUserOnline(message.userId)"
                  class="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-emerald-400 rounded-full border border-white"
                ></div>
              </div>

              <div class="max-w-[75%] sm:max-w-[70%] md:max-w-xs lg:max-w-sm">
                <div class="flex items-center flex-wrap gap-1 mb-1">
                  <NuxtLink
                    :to="`/trang-ca-nhan/${message.username}`"
                    class="text-xs font-semibold text-gray-700 hover:text-blue-600 transition-colors truncate max-w-[120px] sm:max-w-[150px]"
                  >
                    {{ message.fullName || message.username }}
                  </NuxtLink>
                  <span class="text-xs text-gray-400">{{ message.time }}</span>
                </div>
                <div
                  class="bg-gray-100 rounded-xl rounded-tl-md px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 shadow-sm border border-gray-200/80 text-gray-800 relative group-hover:shadow-md transition-all duration-200"
                >
                  <!-- Message Content with Reply Support -->
                  <div
                    class="break-words leading-relaxed text-gray-900 text-xs sm:text-sm md:text-base whitespace-pre-wrap"
                  >
                    <!-- Render reply message with highlighting -->
                    <div v-if="isReplyMessage(message.text)">
                      <template v-if="extractReplyInfo(message.text)">
                        <span
                          class="font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded"
                        >
                          @{{ extractReplyInfo(message.text).replyToUser }}
                        </span>
                        <span class="ml-1 text-gray-800">
                          {{ extractReplyInfo(message.text).actualMessage }}
                        </span>
                      </template>
                      <template v-else>
                        {{ message.text }}
                      </template>
                    </div>
                    <!-- Regular message -->
                    <div v-else>
                      {{ message.text }}
                    </div>
                  </div>

                  <!-- Reply Button -->
                  <button
                    v-if="currentUser"
                    @click="startReply(message)"
                    class="absolute top-2 -right-8 opacity-100 group-hover:opacity-100 p-1.5 bg-white shadow-md hover:bg-gray-50 rounded-full transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:shadow-lg transform hover:scale-105"
                    title="Trả lời tin nhắn"
                  >
                    <Reply class="w-3 h-3 text-gray-600 hover:text-blue-600" />
                  </button>

                  <!-- Message tail -->
                  <div
                    class="absolute -left-1.5 sm:-left-2 top-2 sm:top-3 md:top-4 w-0 h-0 border-t-[5px] sm:border-t-[6px] md:border-t-[8px] border-t-transparent border-r-[5px] sm:border-r-[6px] md:border-r-[8px] border-r-gray-100 border-b-[5px] sm:border-b-[6px] md:border-b-[8px] border-b-transparent"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Own message -->
            <div v-else class="flex items-end justify-end group">
              <div class="max-w-[75%] sm:max-w-[70%] md:max-w-xs lg:max-w-sm">
                <div class="flex items-center justify-end gap-1 mb-1">
                  <span class="text-xs text-gray-400">{{ message.time }}</span>
                  <span
                    class="text-xs font-semibold text-gray-700 truncate max-w-[120px] sm:max-w-[150px]"
                  >
                    {{ message.fullName || message.username }}
                  </span>
                </div>
                <div
                  class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-xl rounded-tr-md px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 shadow-lg relative group-hover:shadow-xl transition-all duration-200"
                >
                  <!-- Message Content with Reply Support -->
                  <div
                    class="break-words leading-relaxed text-xs sm:text-sm md:text-base whitespace-pre-wrap"
                  >
                    <!-- Render reply message with highlighting -->
                    <div v-if="isReplyMessage(message.text)">
                      <template v-if="extractReplyInfo(message.text)">
                        <span
                          class="font-bold text-blue-200 bg-blue-700/30 px-1 py-0.5 rounded"
                        >
                          @{{ extractReplyInfo(message.text).replyToUser }}
                        </span>
                        <span class="ml-1 text-white">
                          {{ extractReplyInfo(message.text).actualMessage }}
                        </span>
                      </template>
                      <template v-else>
                        {{ message.text }}
                      </template>
                    </div>
                    <!-- Regular message -->
                    <div v-else>
                      {{ message.text }}
                    </div>
                  </div>

                  <!-- Message tail -->
                  <div
                    class="absolute -right-1.5 sm:-right-2 top-2 sm:top-3 md:top-4 w-0 h-0 border-t-[5px] sm:border-t-[6px] md:border-t-[8px] border-t-transparent border-l-[5px] sm:border-l-[6px] md:border-l-[8px] border-l-blue-600 border-b-[5px] sm:border-b-[6px] md:border-b-[8px] border-b-transparent"
                  ></div>
                </div>

                <div class="flex items-center justify-end gap-1 mt-1">
                  <div v-if="message.status" class="flex items-center">
                    <Clock
                      v-if="message.status === 'sending'"
                      class="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-400 animate-spin"
                    />
                    <Check
                      v-else-if="message.status === 'sent'"
                      class="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-400"
                    />
                    <CheckCheck
                      v-else-if="message.status === 'delivered'"
                      class="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-500"
                    />
                    <AlertCircle
                      v-else-if="message.status === 'error'"
                      class="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-500"
                      title="Lỗi lưu tin nhắn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Typing indicators -->
          <div v-if="typingUsers.length > 0" class="space-y-1.5 sm:space-y-2">
            <div
              v-for="typingUser in typingUsers"
              :key="typingUser.userId"
              class="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 animate-slide-up"
            >
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm"
              >
                <div class="flex space-x-0.5 sm:space-x-1">
                  <div
                    class="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
                  ></div>
                  <div
                    class="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-100"
                  ></div>
                  <div
                    class="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"
                  ></div>
                </div>
              </div>
              <span
                class="text-xs sm:text-sm text-gray-500 italic font-medium truncate"
              >
                {{ typingUser.fullName || typingUser.username }} đang nhập...
              </span>
            </div>
          </div>
        </div>

        <!-- Reply Preview Bar -->
        <div
          v-if="replyingTo"
          class="px-4 py-2 bg-blue-50 border-t border-blue-200 flex items-center justify-between"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-2 text-sm">
              <Reply class="w-4 h-4 text-blue-600" />
              <span class="font-medium text-blue-700">
                Đang trả lời {{ replyingTo.fullName || replyingTo.username }}
              </span>
            </div>
            <div class="text-xs text-gray-600 truncate mt-1">
              {{ replyingTo.text }}
            </div>
          </div>
          <button
            @click="cancelReply"
            class="p-1 hover:bg-blue-100 rounded-full transition-colors ml-2"
          >
            <X class="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <!-- Chat Input -->
        <div
          class="p-2 sm:p-3 md:p-4 border-t border-gray-200 bg-white/90 backdrop-blur-sm"
        >
          <div class="flex items-end space-x-1.5 sm:space-x-2 md:space-x-3">
            <!-- Message input with emoji picker -->
            <div class="flex-1 relative">
              <div class="relative">
                <textarea
                  v-model="newMessage"
                  @keydown="handleKeyDown"
                  @input="handleTyping"
                  :placeholder="
                    replyingTo
                      ? `Trả lời ${
                          replyingTo.fullName || replyingTo.username
                        }...`
                      : 'Nhập tin nhắn...'
                  "
                  rows="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 transition-all duration-200 text-sm bg-white"
                  ref="messageInput"
                  :disabled="!isConnected || !currentUser"
                ></textarea>

                <!-- Emoji button -->
                <button
                  @click="toggleEmojiPicker"
                  class="absolute right-1.5 sm:right-2 md:right-3 bottom-2 sm:bottom-2.5 md:bottom-3 p-1 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                  type="button"
                  title="Thêm emoji"
                >
                  <Smile class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </button>
              </div>

              <!-- Emoji Picker -->
              <div
                v-if="showEmojiPicker"
                ref="emojiPickerRef"
                class="absolute bottom-full mb-2 left-0 z-50 shadow-2xl rounded-xl overflow-hidden border border-gray-200"
                :class="isMobile ? 'right-0' : ''"
              >
                <emoji-picker
                  @emoji-click="onEmojiClick"
                  class="light"
                  :style="emojiPickerStyle"
                />
              </div>

              <!-- Character limit indicator -->
              <div
                v-if="newMessage.length > 150"
                class="absolute bottom-0.5 sm:bottom-1 md:bottom-2 right-8 sm:right-10 md:right-12 text-xs"
                :class="
                  newMessage.length > 300 ? 'text-red-500' : 'text-orange-500'
                "
              >
                {{ newMessage.length }}/300
              </div>
            </div>

            <!-- Send button -->
            <button
              @click="sendMessage"
              :disabled="!canSendMessage"
              class="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 text-white p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl flex-shrink-0 transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:shadow-none mb-2"
              title="Gửi tin nhắn"
            >
              <Send class="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            </button>
          </div>

          <!-- Connection status -->
          <div
            v-if="!isConnected"
            class="mt-2 flex items-center justify-center text-xs text-red-500"
          >
            <AlertCircle class="w-3 h-3 mr-1" />
            Mất kết nối. Đang thử kết nối lại...
          </div>
        </div>
      </div>
    </Transition>

    <!-- Chat Toggle Button -->
    <Transition
      name="button-bounce"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 scale-0"
      leave-to-class="opacity-0 scale-0"
    >
      <div v-if="!isChatOpen" class="relative">
        <button
          @click="openChat"
          class="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white rounded-full shadow-2xl p-2.5 sm:p-3 md:p-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
          title="Mở chat tổng"
        >
          <MessageCircle
            class="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 relative z-10"
          />

          <!-- Ripple effect -->
          <div
            class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transform scale-0 group-hover:scale-100 transition-all duration-500"
          ></div>
        </button>

        <!-- Unread message indicator -->
        <div
          v-if="unreadCount > 0"
          class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center shadow-lg animate-pulse"
        >
          {{ unreadCount > 99 ? "99+" : unreadCount }}
        </div>

        <!-- Online pulse indicator -->
        <div
          class="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-emerald-400 rounded-full border-2 border-white shadow-sm animate-pulse"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  X,
  Minus,
  Send,
  MessageCircle,
  Check,
  CheckCheck,
  Clock,
  Users,
  AlertCircle,
  Smile,
  Reply,
} from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core";

interface ChatMessage {
  id: string;
  fullName?: string;
  username: string;
  text: string;
  time: string;
  isOwn: boolean;
  avatar?: string;
  status?: "sending" | "sent" | "delivered" | "error";
  userId: string;
  timestamp: string;
}

interface SystemMessage {
  id: string;
  text: string;
  timestamp: string;
}

interface TypingUser {
  userId: string;
  username: string;
  fullName?: string;
}

interface OnlineUser {
  userId: string;
  username: string;
  avatar?: string;
  lastActive: Date;
}

const { $socket } = useNuxtApp();

// Reactive states
const isChatOpen = ref(false);
const newMessage = ref("");
const messagesContainer = ref<HTMLElement>();
const messageInput = ref<HTMLTextAreaElement>();
const isConnected = ref(false);
const unreadCount = ref(0);
const typingUsers = ref<TypingUser[]>([]);
const onlineUsers = ref<OnlineUser[]>([]);
const onlineUsersCount = ref(0);

// Reply states
const replyingTo = ref<ChatMessage | null>(null);

// Emoji picker states
const showEmojiPicker = ref(false);
const emojiPickerRef = ref<HTMLElement | null>(null);

// Mobile detection
const isMobile = computed(() => {
  if (process.client) {
    return window.innerWidth < 640;
  }
  return false;
});

// Emoji picker style based on screen size
const emojiPickerStyle = computed(() => {
  if (isMobile.value) {
    return {
      "--category-emoji-size": "16px",
      "--emoji-size": "18px",
      width: "280px",
      height: "300px",
    };
  }
  return {
    "--category-emoji-size": "18px",
    "--emoji-size": "20px",
    width: "300px",
    height: "350px",
  };
});

// Current user info
const currentUser = await useCurrentUser();

// Messages state
const messages = ref<ChatMessage[]>([]);
const systemMessages = ref<SystemMessage[]>([]);

// Track sent messages to prevent duplicates
const sentMessageIds = new Set<string>();

// Computed
const canSendMessage = computed(() => {
  return (
    newMessage.value.trim() &&
    newMessage.value.length <= 300 &&
    isConnected.value &&
    currentUser.value
  );
});

let typingTimeout: NodeJS.Timeout;
let reconnectInterval: NodeJS.Timeout;

// Database functions using existing API
const saveMessageToDatabase = async (messageData: any) => {
  try {
    const response = await $fetch("/api/chat", {
      method: "POST",
      body: {
        messageId: messageData.messageId,
        message: messageData.message,
        timestamp: messageData.timestamp,
        fullName: messageData.fullName,
        username: messageData.username,
        avatar: messageData.avatar,
        userId: messageData.userId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error saving message to database:", error);
    throw error;
  }
};

const loadRecentMessages = async () => {
  try {
    const response = await $fetch("/api/chat", {
      method: "GET",
    });

    // Handle different response formats
    let messagesArray = [];

    if (Array.isArray(response)) {
      // Direct array response
      messagesArray = response;
    } else if (response && response.data && Array.isArray(response.data)) {
      // Response wrapped in data property
      messagesArray = response.data;
    } else if (response && Array.isArray(response.messages)) {
      // Response with messages property
      messagesArray = response.messages;
    } else {
      console.warn("Unexpected response format:", response);
      return;
    }

    if (messagesArray.length > 0) {
      const loadedMessages = messagesArray.map((msg: any) => {
        return {
          id:
            msg.messageId ||
            msg.id ||
            msg._id ||
            `msg_${Date.now()}_${Math.random()}`,
          username: msg.username || "Unknown",
          fullName: msg.fullName || msg.username || "Unknown User",
          text: msg.message || msg.text || msg.content || "",
          time: formatTime(
            new Date(
              msg.timestamp || msg.createdAt || msg.created_at || Date.now()
            )
          ),
          isOwn: String(msg.userId) === String(currentUser.value?.id),
          avatar: msg.avatar || "/assets/images/header/default-avatar.png",
          status: "delivered",
          userId: String(msg.userId),
          timestamp:
            msg.timestamp ||
            msg.createdAt ||
            msg.created_at ||
            new Date().toISOString(),
        };
      });

      // Sort messages by timestamp (oldest first)
      loadedMessages.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      messages.value = loadedMessages;
      nextTick(() => {
        scrollToBottom();
      });
    } else {
      messages.value = [];
    }
  } catch (error) {
    console.error("Error loading recent messages:", error);
    addSystemMessage("Không thể tải tin nhắn gần đây");
    messages.value = []; // Set empty array on error
  }
};

// Emoji picker handlers
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

const onEmojiClick = (event: any) => {
  const emoji = event.detail.unicode;
  newMessage.value += emoji;

  // Focus back to textarea after emoji selection
  nextTick(() => {
    messageInput.value?.focus();
    adjustTextareaHeight();
  });
};

// Close emoji picker when clicking outside
onClickOutside(emojiPickerRef, () => {
  showEmojiPicker.value = false;
});

// Socket initialization and event handlers
const initializeSocket = () => {
  if (!$socket) return;

  isConnected.value = $socket.connected;

  // Connection events
  $socket.on("connect", () => {
    isConnected.value = true;

    // Join global chat room
    $socket.emit("join-global-chat", {
      userId: currentUser.value?.id,
      username: currentUser.value?.username,
      fullName: currentUser.value?.fullName,
      avatar: currentUser.value?.avatar,
    });

    // Clear reconnect interval
    if (reconnectInterval) {
      clearInterval(reconnectInterval);
      reconnectInterval = null;
    }

    // Add system message
    addSystemMessage(`Đã kết nối thành công`);

    // Load recent messages when connected - add delay to ensure everything is ready
    setTimeout(() => {}, 1000);
  });

  $socket.on("disconnect", () => {
    isConnected.value = false;
    addSystemMessage(`Mất kết nối. Đang thử kết nối lại...`);

    // Try to reconnect
    startReconnectInterval();
  });

  // Global chat events
  $socket.on("global-message", (data) => {
    // Check if this is our own message that we already added
    if (sentMessageIds.has(data.messageId)) {
      // Update the status of our existing message
      const existingMessage = messages.value.find(
        (m) => m.id === data.messageId
      );
      if (existingMessage && existingMessage.isOwn) {
        existingMessage.status = "delivered";
      }
      return;
    }

    const newMsg: ChatMessage = {
      id: data.messageId || `msg_${Date.now()}`,
      username: data.username,
      fullName: data.fullName,
      text: data.message,
      time: formatTime(new Date(data.timestamp)),
      isOwn: data.userId === currentUser.value?.id,
      avatar: data.avatar,
      status: "delivered",
      userId: data.userId,
      timestamp: data.timestamp,
    };

    messages.value.push(newMsg);

    // Limit message history in memory
    if (messages.value.length > 100) {
      messages.value.shift();
    }

    // Update unread count if chat is closed
    if (!isChatOpen.value && !newMsg.isOwn) {
      unreadCount.value++;
    }

    nextTick(() => {
      scrollToBottom();
    });
  });

  // Typing events
  $socket.on("global-typing", (data) => {
    if (data.userId !== currentUser.value?.id) {
      const existingUser = typingUsers.value.find(
        (u) => u.userId === data.userId
      );
      if (!existingUser && data.typing) {
        typingUsers.value.push({
          userId: data.userId,
          fullName: data.fullName,
          username: data.username,
        });
      } else if (!data.typing) {
        typingUsers.value = typingUsers.value.filter(
          (u) => u.userId !== data.userId
        );
      }
    }
  });

  // Online users events
  $socket.on("online-users-update", (data) => {
    onlineUsers.value = data.users || [];
    onlineUsersCount.value = data.count || 0;
  });

  // User joined/left events
  $socket.on("user-joined-global", (data) => {
    addSystemMessage(`${data.fullName || data.username} đã tham gia chat`);
  });

  $socket.on("user-left-global", (data) => {
    addSystemMessage(`${data.fullName || data.username} đã rời khỏi chat`);
    // Remove from typing users
    typingUsers.value = typingUsers.value.filter(
      (u) => u.userId !== data.userId
    );
  });
};

// Utility functions
const formatTime = (date: Date) => {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return (
      date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }
};

const generateMessageId = () => {
  return `global_msg_${currentUser.value?.id}_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

const addSystemMessage = (text: string) => {
  const systemMsg: SystemMessage = {
    id: `system_${Date.now()}`,
    text,
    timestamp: new Date().toISOString(),
  };

  systemMessages.value.push(systemMsg);

  // Limit system messages
  if (systemMessages.value.length > 10) {
    systemMessages.value.shift();
  }
};

const isUserOnline = (userId: string) => {
  return onlineUsers.value.some((user) => user.userId === userId);
};

const startReconnectInterval = () => {
  reconnectInterval = setInterval(() => {
    if (!$socket.connected) {
      $socket.connect();
    }
  }, 3000);
};

// Chat methods
const openChat = () => {
  isChatOpen.value = true;
  unreadCount.value = 0;

  nextTick(() => {
    scrollToBottom();
    messageInput.value?.focus();
  });
};

const closeChat = () => {
  isChatOpen.value = false;
  showEmojiPicker.value = false;
  stopTyping();
};

const minimizeChat = () => {
  isChatOpen.value = false;
  showEmojiPicker.value = false;
  stopTyping();
};

const sendMessage = async () => {
  if (!canSendMessage.value || !$socket) return;

  const messageId = generateMessageId();
  const messageText = newMessage.value.trim();
  const timestamp = new Date().toISOString();

  // Add to sent messages tracking
  sentMessageIds.add(messageId);

  // Create local message
  const message: ChatMessage = {
    id: messageId,
    username: currentUser.value?.username || "Anonymous",
    text: messageText,
    time: formatTime(new Date()),
    isOwn: true,
    avatar: currentUser.value?.avatar,
    fullName: currentUser.value?.fullName,
    status: "sending",
    userId: currentUser.value?.id || "",
    timestamp,
  };

  messages.value.push(message);

  // Prepare message data for database and socket
  const messageData = {
    message: messageText,
    messageId,
    timestamp,
    fullName: currentUser.value?.fullName,
    username: currentUser.value?.username,
    avatar: currentUser.value?.avatar,
    userId: currentUser.value?.id,
  };

  try {
    const dbResponse = await saveMessageToDatabase(messageData);
    message.status = "sent";

    // Send to other users via socket
    $socket.emit("global-message", messageData);

    // Update status to delivered after socket emission
    setTimeout(() => {
      if (message.status === "sent") {
        message.status = "delivered";
      }
    }, 500);
  } catch (error) {
    console.error("Failed to save message to database:", error);

    // Update message status to show error
    message.status = "error";

    // Still emit to socket for real-time communication
    $socket.emit("global-message", messageData);

    // Show error notification
    ElNotification({
      title: "Lưu tin nhắn thất bại",
      message: "Tin nhắn đã được gửi nhưng không thể lưu vào database",
      type: "warning",
      duration: 3000,
    });

    // Try to change status back after a delay
    setTimeout(() => {
      if (message.status === "error") {
        message.status = "sent";
      }
    }, 2000);
  }

  // Stop typing indicator
  stopTyping();

  // Clear input and close emoji picker
  newMessage.value = "";
  showEmojiPicker.value = false;

  nextTick(() => {
    scrollToBottom();
    adjustTextareaHeight();
  });
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  } else if (event.key === "Escape") {
    showEmojiPicker.value = false;
  }
  adjustTextareaHeight();
};

const handleTyping = () => {
  if (!$socket || !currentUser.value) return;

  $socket.emit("global-typing", {
    typing: true,
    userId: currentUser.value.id,
    fullName: currentUser.value.fullName,
    username: currentUser.value.username,
  });

  // Clear existing timeout
  clearTimeout(typingTimeout);

  // Set timeout to stop typing
  typingTimeout = setTimeout(() => {
    stopTyping();
  }, 1000);

  adjustTextareaHeight();
};

const stopTyping = () => {
  if ($socket && currentUser.value) {
    $socket.emit("global-typing", {
      typing: false,
      userId: currentUser.value.id,
      fullName: currentUser.value.fullName,
      username: currentUser.value.username,
    });
  }
  clearTimeout(typingTimeout);
};

const adjustTextareaHeight = () => {
  nextTick(() => {
    if (messageInput.value) {
      messageInput.value.style.height = "auto";
      const scrollHeight = messageInput.value.scrollHeight;
      const maxHeight = isMobile.value ? 80 : 120;
      messageInput.value.style.height =
        Math.min(scrollHeight, maxHeight) + "px";
    }
  });
};

const scrollToBottom = () => {
  if (messagesContainer.value) {
    const container = messagesContainer.value;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }
};

// Watchers
watch(isChatOpen, (isOpen) => {
  if (isOpen) {
    unreadCount.value = 0;
    nextTick(() => {
      scrollToBottom();
    });
  }
});

// Lifecycle hooks
onMounted(async () => {
  loadRecentMessages();
  await nextTick();
  initializeSocket();
});

onUnmounted(() => {
  if ($socket) {
    stopTyping();
    $socket.emit("leave-global-chat", {
      userId: currentUser.value?.id,
      username: currentUser.value?.username,
    });

    // Remove all listeners
    $socket.off("connect");
    $socket.off("disconnect");
    $socket.off("global-message");
    $socket.off("global-typing");
    $socket.off("online-users-update");
    $socket.off("user-joined-global");
    $socket.off("user-left-global");
  }

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  if (reconnectInterval) {
    clearInterval(reconnectInterval);
  }

  sentMessageIds.clear();
});

// Thêm vào phần script setup (sau các existing functions)

// Reply functions
const startReply = (message: ChatMessage) => {
  if (message.isOwn) return; // Don't allow replying to own messages

  replyingTo.value = message;

  // Auto-fill the input with reply format
  const replyText = `@${message.fullName || message.username} `;
  newMessage.value = replyText;

  // Focus on input and set cursor at end
  nextTick(() => {
    messageInput.value?.focus();
    const length = newMessage.value.length;
    messageInput.value?.setSelectionRange(length, length);
    adjustTextareaHeight();
  });
};

const cancelReply = () => {
  replyingTo.value = null;
  newMessage.value = "";
  adjustTextareaHeight();
};

// Check if message is a reply (starts with @username)
const isReplyMessage = (text: string) => {
  return text.startsWith("@");
};

// Extract reply info from message text
const extractReplyInfo = (text: string) => {
  const match = text.match(/^@([^\s]+(?:\s+[^\s]+)*?)\s+(.*)$/);
  if (match) {
    return {
      replyToUser: match[1].trim(),
      actualMessage: match[2],
    };
  }
  return null;
};
</script>

<style scoped>
/* Hide scrollbar for online users */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Custom scrollbar for messages */
.overflow-y-auto::-webkit-scrollbar {
  width: 3px;
}

@media (min-width: 640px) {
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
}

/* Animation keyframes */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation classes */
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.4s ease-out;
}

.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.button-bounce-enter-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.button-bounce-leave-active {
  transition: all 0.2s ease-in;
}

/* Textarea styling */
textarea {
  min-height: 32px;
  max-height: 80px;
  line-height: 1.4;
}

@media (min-width: 640px) {
  textarea {
    min-height: 44px;
    max-height: 120px;
    line-height: 1.5;
  }
}

/* Bounce animation delays */
.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

/* Mobile-specific styles */
@media (max-width: 639px) {
  .truncate {
    max-width: 100px;
  }

  /* Ensure chat doesn't cover entire screen on very small devices */
  @media (max-height: 600px) {
    .h-\[calc\(100vh-80px\)\] {
      height: calc(100vh - 60px);
    }
  }
}

/* Tablet and desktop styles */
@media (min-width: 640px) {
  .truncate {
    max-width: 150px;
  }
}

/* Message text styling for emojis */
.whitespace-pre-wrap {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.4;
}

@media (min-width: 640px) {
  .whitespace-pre-wrap {
    line-height: 1.5;
  }
}

/* Emoji picker positioning on mobile */
@media (max-width: 639px) {
  emoji-picker {
    --background: #ffffff;
    --border-color: #e5e7eb;
    --indicator-color: #3b82f6;
  }
}

/* Custom hover animations */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Reply button positioning */
.group .absolute {
  z-index: 10;
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
