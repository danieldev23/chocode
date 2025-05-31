<template>
  <div class="fixed bottom-0 right-4 z-50">
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
        class="bg-white rounded-xl shadow-2xl border border-gray-200/50 mb-0 w-80 h-[500px] sm:w-96 sm:h-[550px] md:w-[420px] md:h-[600px] max-w-[95vw] max-h-[85vh] backdrop-blur-lg overflow-hidden"
      >
        <!-- Chat Header -->
        <div
          class="bg-primary-gradient text-white p-4 flex items-center justify-between relative overflow-hidden"
        >
          <!-- Animated background -->
          <div class="absolute inset-0 opacity-20">
            <div
              class="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-xl -translate-x-16 -translate-y-16 animate-pulse"
            ></div>
            <div
              class="absolute bottom-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-lg translate-x-12 translate-y-12 animate-pulse delay-1000"
            ></div>
          </div>

          <div class="flex items-center space-x-3 relative z-10">
            <div class="relative">
              <div
                class="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg"
              >
                <MessageCircle class="w-6 h-6 text-white" />
              </div>
              <div
                v-if="isConnected"
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse shadow-sm"
              ></div>
              <div
                v-else
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-red-400 rounded-full border-2 border-white shadow-sm"
              ></div>
            </div>
            <div>
              <div class="font-bold text-lg tracking-wide">ChoCode Chat</div>
              <div class="text-white/80 text-xs font-medium">
                {{ onlineCount }} người trực tuyến
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-1 relative z-10">
            <!-- Online Users List Button -->
            <button
              @click="toggleOnlineUsers"
              class="hover:bg-white/20 rounded-xl p-2.5 transition-all duration-200 hover:scale-105 relative"
              title="Danh sách người dùng"
            >
              <Users class="h-5 w-5" />
              <div
                v-if="onlineUsers.length > 1"
                class="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full text-xs"
              ></div>
            </button>

            <button
              @click="minimizeChat"
              class="hover:bg-white/20 rounded-xl p-2.5 transition-all duration-200 hover:scale-105"
            >
              <Minus class="h-5 w-5" />
            </button>
            <button
              @click="closeChat"
              class="hover:bg-white/20 rounded-xl p-2.5 transition-all duration-200 hover:scale-105"
            >
              <X class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Online Users Panel -->
        <div
          v-if="showOnlineUsers"
          class="bg-gray-50 border-b border-gray-200 p-3 max-h-32 overflow-y-auto"
        >
          <div class="text-sm font-semibold text-gray-700 mb-2">
            Người dùng trực tuyến ({{ onlineUsers.length }})
          </div>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="user in onlineUsers"
              :key="user.userId"
              class="flex items-center space-x-2 bg-white rounded-lg px-2 py-1 shadow-sm border"
            >
              <img
                :src="user.avatar || '/api/placeholder/24/24'"
                :alt="user.username"
                class="w-6 h-6 rounded-full object-cover"
              />
              <span
                class="text-sm font-medium text-gray-700 truncate max-w-20"
                >{{ user.username }}</span
              >
              <div class="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Connection Status -->
        <div
          v-if="!isConnected"
          class="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-3 text-amber-800 text-sm"
        >
          <div class="flex items-center">
            <div
              class="animate-spin rounded-full h-4 w-4 border-2 border-amber-400 border-t-transparent mr-2"
            ></div>
            <span class="font-medium">Đang kết nối tới server...</span>
          </div>
        </div>

        <!-- Chat Messages -->
        <div
          ref="messagesContainer"
          class="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white space-y-4"
          :class="{
            'h-80': !isConnected,
            'h-96': isConnected && !showOnlineUsers,
            'h-64': isConnected && showOnlineUsers,
          }"
        >
          <div
            v-for="message in messages"
            :key="message.id"
            class="animate-fade-in"
          >
            <!-- System message -->
            <div v-if="message.userId === 'system'" class="flex justify-center">
              <div
                class="bg-secondary-gradient px-3 py-2 rounded-full text-sm font-medium max-w-xs text-center"
              >
                {{ message.text }}
              </div>
            </div>

            <!-- Other user message -->
            <div
              v-else-if="!message.isOwn"
              class="flex items-start space-x-3 group"
            >
              <div class="relative flex-shrink-0">
                <NuxtLink
                  :to="{
                    name: 'trang-ca-nhan',
                    params: {
                      username: message.userId?.split('_')[1],
                    },
                  }"
                >
                  <img
                    :src="message.avatar || '/api/placeholder/40/40'"
                    :alt="message.sender"
                    class="w-9 h-9 rounded-full border-2 border-white shadow-md object-cover"
                  />
                </NuxtLink>

                <div
                  v-if="message.isMember"
                  class="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-gradient rounded-full border-2 border-white flex items-center justify-center"
                >
                  <Crown class="w-2 h-2 text-white" />
                </div>
              </div>

              <div class="max-w-xs sm:max-w-sm">
                <div class="flex items-center flex-wrap gap-2 mt-2 ml-1">
                  <NuxtLink
                    :to="{
                      name: 'trang-ca-nhan',
                      params: {
                        username: message.userId?.split('_')[1],
                      },
                    }"
                  >
                    <span
                      class="text-sm font-semibold text-gray-700 truncate"
                      >{{ message.sender }}</span
                    >
                  </NuxtLink>

                  <span class="text-xs text-gray-400">{{ message.time }}</span>
                  <span
                    v-if="message.isMember"
                    class="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-semibold border border-blue-200/50"
                  >
                    VIP
                  </span>
                </div>
                <div
                  class="bg-[#f0f0f0] rounded-2xl rounded-tl-md px-4 py-2 shadow-sm border border-gray-100/80 text-gray-800 relative group-hover:shadow-md transition-all duration-200 w-auto"
                >
                  <div
                    class="break-words leading-relaxed text-[#080809] w-auto"
                  >
                    {{ message.text }}
                  </div>
                  <!-- Message tail -->
                  <div
                    class="absolute -left-2 top-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[8px] border-r-white border-b-[8px] border-b-transparent"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Own message -->
            <div v-else class="flex items-end justify-end group">
              <div class="max-w-xs sm:max-w-sm">
                <div
                  class="bg-primary-gradient to-pink-500 text-white rounded-2xl rounded-tr-md px-4 py-3 shadow-lg relative group-hover:shadow-xl transition-all duration-200"
                >
                  <div class="break-words leading-relaxed">
                    {{ message.text }}
                  </div>
                  <!-- Message tail -->
                </div>

                <div class="flex items-center justify-end gap-2 mt-2 mr-1">
                  <span class="text-xs text-gray-400">{{ message.time }}</span>
                  <div v-if="message.status" class="flex items-center">
                    <Clock
                      v-if="message.status === 'sending'"
                      class="h-4 w-4 text-gray-400 animate-spin"
                    />
                    <Check
                      v-else-if="message.status === 'sent'"
                      class="h-4 w-4 text-gray-400"
                    />
                    <CheckCheck
                      v-else-if="message.status === 'delivered'"
                      class="h-4 w-4 text-gray-400"
                    />
                    <CheckCheck
                      v-else-if="message.status === 'read'"
                      class="h-4 w-4 text-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Typing indicators -->
          <div v-if="typingUsers.length > 0" class="space-y-2">
            <div
              v-for="typingUser in typingUsers"
              :key="typingUser.userId"
              class="flex items-center space-x-3 animate-slide-up"
            >
              <div
                class="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm"
              >
                <div class="flex space-x-1">
                  <div
                    class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                  ></div>
                  <div
                    class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"
                  ></div>
                  <div
                    class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"
                  ></div>
                </div>
              </div>
              <span class="text-sm text-gray-500 italic font-medium"
                >{{ typingUser.username }} đang nhập...</span
              >
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div
          class="p-4 border-t border-gray-100/80 bg-white/90 backdrop-blur-sm mt-14"
        >
          <div class="flex items-end space-x-3 items-center">
            <!-- Attachment button -->
            <button
              class="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 flex-shrink-0 hover:scale-105"
              title="Đính kèm file"
            >
              <Paperclip class="h-5 w-5 text-gray-500" />
            </button>

            <!-- Message input -->
            <div class="flex-1 relative">
              <textarea
                v-model="newMessage"
                @keydown="handleKeyDown"
                @input="handleTyping"
                placeholder="Nhập tin nhắn của bạn..."
                rows="1"
                class="w-full px-4 py-3 pr-12 border border-gray-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 resize-none text-sm bg-gray-50/50 transition-all duration-200 placeholder-gray-400"
                :disabled="!isConnected"
                ref="messageInput"
              ></textarea>
              <!-- Emoji picker -->
              <div
                v-if="showEmojiPicker"
                class="absolute bottom-12 right-0 z-50 shadow-lg rounded-xl overflow-hidden"
              >
                <emoji-picker @emoji-click="onEmojiClick" class="light" />
              </div>

              <!-- Emoji button -->
              <button
                class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-all duration-200"
                title="Emoji"
                @click="toggleEmojiPicker"
              >
                <Smile class="h-4 w-4 text-gray-500" />
              </button>
            </div>

            <!-- Send button -->
            <button
              @click="sendMessage"
              :disabled="!canSendMessage"
              class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 text-white p-3 rounded-xl flex-shrink-0 transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:shadow-none items-center mb-1"
              title="Gửi tin nhắn"
            >
              <Send class="h-5 w-5" />
            </button>
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
      <button
        v-if="!isChatOpen"
        @click="openChat"
        class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-full shadow-2xl p-4 w-16 h-16 flex items-center justify-center transition-all duration-300 transform hover:scale-110 relative overflow-hidden group"
      >
        <!-- Animated background -->
        <div
          class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        ></div>

        <!-- Pulse effect -->
        <div
          class="absolute inset-0 rounded-full bg-white/30 animate-ping"
        ></div>

        <MessageCircle class="h-7 w-7 relative z-10" />

        <!-- Notification badge -->
        <div
          v-if="unreadCount > 0"
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-bounce"
        >
          {{ unreadCount > 99 ? "99+" : unreadCount }}
        </div>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  username: string;
  avatar: string;
  name: string;
}>();
import {
  X,
  Minus,
  Send,
  Smile,
  Paperclip,
  MessageCircle,
  Check,
  CheckCheck,
  Crown,
  Users,
  Clock,
} from "lucide-vue-next";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
  avatar?: string;
  isMember?: boolean;
  status?: "sending" | "sent" | "delivered" | "read";
  userId?: string;
  timestamp?: string;
}

interface OnlineUser {
  userId: string;
  username: string;
  avatar?: string;
  lastActive: string;
}

interface TypingUser {
  userId: string;
  username: string;
}

const { $socket } = useNuxtApp();
const showEmojiPicker = ref(false);
// Reactive states
const isChatOpen = ref(false);
const newMessage = ref("");
const messagesContainer = ref<HTMLElement>();
const messageInput = ref<HTMLTextAreaElement>();
const isConnected = ref(false);
const onlineCount = ref(0);
const unreadCount = ref(0);
const showOnlineUsers = ref(false);

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

// Users state
const onlineUsers = ref<OnlineUser[]>([]);
const typingUsers = ref<TypingUser[]>([]);

// Current user info
const currentUser = ref({
  id: `user_${props.username}_${Date.now()}`,
  username: props.name || props.username,
  avatar: props.avatar,
});

// Messages state
const messages = ref<ChatMessage[]>([]);

// Computed
const canSendMessage = computed(() => {
  return newMessage.value.trim() && isConnected.value;
});

let typingTimeout: NodeJS.Timeout;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

// Socket initialization and event handlers
const initializeSocket = () => {
  if (!$socket) {
    console.error("Socket not available");
    return;
  }

  // Connection events
  $socket.on("connect", () => {
    console.log("✅ Connected to chat server");
    isConnected.value = true;
    reconnectAttempts = 0;

    // Register user as online
    $socket.emit("userOnline", {
      userId: currentUser.value.id,
      username: currentUser.value.username,
      avatar: currentUser.value.avatar,
    });
  });

  $socket.on("disconnect", (reason: string) => {
    console.log("❌ Disconnected from server:", reason);
    isConnected.value = false;

    // Attempt reconnection for certain disconnect reasons
    if (reason === "io server disconnect") {
      // Server disconnected us, don't reconnect automatically
      return;
    }

    attemptReconnection();
  });

  $socket.on("connect_error", (error: any) => {
    console.error("Connection error:", error);
    isConnected.value = false;
    attemptReconnection();
  });

  // Chat message events
  $socket.on("newMessage", (messageData: any) => {
    console.log("Received new message:", messageData);

    const message: ChatMessage = {
      id: messageData.id,
      sender: messageData.sender,
      text: messageData.text,
      time: formatTime(new Date(messageData.timestamp)),
      isOwn: messageData.userId === currentUser.value.id,
      avatar: messageData.avatar,
      isMember: messageData.isMember || false,
      status: "delivered",
      userId: messageData.userId,
      timestamp: messageData.timestamp,
    };

    // Don't add duplicate messages or own messages (already added locally)
    if (!messages.value.find((m) => m.id === message.id) && !message.isOwn) {
      messages.value.push(message);

      // Increment unread count if chat is closed
      if (!isChatOpen.value) {
        unreadCount.value++;
      }

      nextTick(() => {
        scrollToBottom();
      });
    }
  });

  // Message history
  $socket.on("messageHistory", (historyData: any[]) => {
    console.log("Received message history:", historyData);

    const historyMessages = historyData.map((msg: any) => ({
      id: msg.id,
      sender: msg.sender,
      text: msg.text,
      time: formatTime(new Date(msg.timestamp)),
      isOwn: msg.userId === currentUser.value.id,
      avatar: msg.avatar,
      isMember: msg.isMember || false,
      status: "delivered" as const,
      userId: msg.userId,
      timestamp: msg.timestamp,
    }));

    // Add history messages that aren't already in the list
    historyMessages.forEach((historyMsg: ChatMessage) => {
      if (!messages.value.find((m) => m.id === historyMsg.id)) {
        messages.value.push(historyMsg);
      }
    });

    // Sort messages by timestamp
    messages.value.sort(
      (a, b) =>
        new Date(a.timestamp || 0).getTime() -
        new Date(b.timestamp || 0).getTime()
    );

    nextTick(() => {
      scrollToBottom();
    });
  });

  // Typing indicator events
  $socket.on("userTyping", (data: any) => {
    if (data.userId !== currentUser.value.id) {
      const existingTypingUser = typingUsers.value.find(
        (u) => u.userId === data.userId
      );
      if (!existingTypingUser) {
        typingUsers.value.push({
          userId: data.userId,
          username: data.username,
        });
      }

      nextTick(() => {
        scrollToBottom();
      });
    }
  });

  $socket.on("userStoppedTyping", (data: any) => {
    typingUsers.value = typingUsers.value.filter(
      (u) => u.userId !== data.userId
    );
  });

  // Online users events
  $socket.on("onlineCount", (count: number) => {
    onlineCount.value = count;
  });

  $socket.on("onlineUsersList", (users: OnlineUser[]) => {
    onlineUsers.value = users.filter((u) => u.userId !== currentUser.value.id);
  });

  // Message status events
  $socket.on("messageDelivered", (messageId: string) => {
    const message = messages.value.find((m) => m.id === messageId);
    if (message && message.isOwn) {
      message.status = "delivered";
    }
  });

  $socket.on("messageRead", (messageId: string) => {
    const message = messages.value.find((m) => m.id === messageId);
    if (message && message.isOwn) {
      message.status = "read";
    }
  });

  $socket.on("messageError", (error: any) => {
    console.error("Message error:", error);
    // Handle message error (e.g., show error message to user)
  });
};

// Reconnection logic
const attemptReconnection = () => {
  if (reconnectAttempts < maxReconnectAttempts) {
    reconnectAttempts++;
    console.log(
      `Attempting reconnection... (${reconnectAttempts}/${maxReconnectAttempts})`
    );

    setTimeout(() => {
      if ($socket && !$socket.connected) {
        $socket.connect();
      }
    }, Math.pow(2, reconnectAttempts) * 1000); // Exponential backoff
  } else {
    console.log("Max reconnection attempts reached");
  }
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
  return `msg_${currentUser.value.id}_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

// Chat methods
const openChat = () => {
  isChatOpen.value = true;
  unreadCount.value = 0;

  nextTick(() => {
    scrollToBottom();
    messageInput.value?.focus();

    // Request online users list
    if (isConnected.value && $socket) {
      $socket.emit("getOnlineUsers");
    }
  });
};

const closeChat = () => {
  isChatOpen.value = false;
  showOnlineUsers.value = false;
  stopTyping();
};

const minimizeChat = () => {
  isChatOpen.value = false;
  showOnlineUsers.value = false;
  stopTyping();
};

const toggleOnlineUsers = () => {
  showOnlineUsers.value = !showOnlineUsers.value;

  if (showOnlineUsers.value && isConnected.value && $socket) {
    $socket.emit("getOnlineUsers");
  }
};

const sendMessage = () => {
  if (!canSendMessage.value || !$socket) return;

  const messageId = generateMessageId();
  const messageText = newMessage.value.trim();
  const timestamp = new Date().toISOString();

  // Create local message
  const message: ChatMessage = {
    id: messageId,
    sender: currentUser.value.username,
    text: messageText,
    time: formatTime(new Date()),
    isOwn: true,
    avatar: currentUser.value.avatar,
    status: "sending",
    userId: currentUser.value.id,
    timestamp,
  };

  messages.value.push(message);

  // Send to server
  $socket.emit("sendMessage", {
    id: messageId,
    text: messageText,
    userId: currentUser.value.id,
    sender: currentUser.value.username,
    avatar: currentUser.value.avatar,
    timestamp,
  });

  // Stop typing indicator
  stopTyping();

  // Clear input
  newMessage.value = "";

  // Update message status after a delay
  setTimeout(() => {
    if (message.status === "sending") {
      message.status = "sent";
    }
  }, 500);

  nextTick(() => {
    scrollToBottom();
    adjustTextareaHeight();
  });
};

const onEmojiClick = (event: any) => {
  const emoji = event.detail.unicode;
  console.log("Emoji selected:", emoji);

  // Insert emoji at cursor position or at the end
  const textarea = messageInput.value;
  if (textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = newMessage.value;

    // Insert emoji at cursor position
    newMessage.value =
      currentValue.slice(0, start) + emoji + currentValue.slice(end);

    // Set cursor position after the emoji
    nextTick(() => {
      const newCursorPos = start + emoji.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
      adjustTextareaHeight();
    });
  } else {
    // Fallback: just append to the end
    newMessage.value += emoji;
    nextTick(() => {
      adjustTextareaHeight();
    });
  }

  // Trigger typing indicator
  handleTyping();

  // Optional: Close emoji picker after selection (remove this line if you want to keep it open)
  // showEmojiPicker.value = false;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
  adjustTextareaHeight();
};

const handleTyping = () => {
  if (!isConnected.value || !$socket) return;

  // Send typing indicator
  $socket.emit("typing", {
    userId: currentUser.value.id,
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
  if (isConnected.value && $socket) {
    $socket.emit("stopTyping", {
      userId: currentUser.value.id,
    });
  }
  clearTimeout(typingTimeout);
};

const adjustTextareaHeight = () => {
  nextTick(() => {
    if (messageInput.value) {
      messageInput.value.style.height = "auto";
      const scrollHeight = messageInput.value.scrollHeight;
      messageInput.value.style.height = Math.min(scrollHeight, 120) + "px";
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

watch(isConnected, (connected) => {
  if (connected && isChatOpen.value) {
    // Request online users when reconnected
    nextTick(() => {
      if ($socket) {
        $socket.emit("getOnlineUsers");
      }
    });
  }
});

// Lifecycle hooks
onMounted(async () => {
  console.log("Chat component mounted for user:", currentUser.value);
  initializeSocket();
});

onUnmounted(() => {
  console.log("Chat component unmounted");

  if ($socket) {
    // Stop typing before leaving
    stopTyping();

    // Remove all listeners
    $socket.off("connect");
    $socket.off("disconnect");
    $socket.off("connect_error");
    $socket.off("newMessage");
    $socket.off("messageHistory");
    $socket.off("userTyping");
    $socket.off("userStoppedTyping");
    $socket.off("onlineCount");
    $socket.off("onlineUsersList");
    $socket.off("messageDelivered");
    $socket.off("messageRead");
    $socket.off("messageError");
  }

  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
});
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
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
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(15px);
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
  min-height: 44px;
  max-height: 120px;
  line-height: 1.5;
}

/* Bounce animation delays */
.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-1000 {
  animation-delay: 1s;
}
</style>
