<!-- pages/notifications.vue -->
<template>
  <div class="min-h-screen bg-gray-25 pt-16">
    <div class="mx-[1rem] md:mx-16 lg:mx-32 xl:mx-[12rem]">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
          Thông báo
        </h1>
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0"
        >
          <p class="text-gray-600 text-sm sm:text-base">
            {{ unreadCount }} thông báo chưa đọc
          </p>
          <div class="flex items-center space-x-3">
            <button
              @click="markAllAsRead"
              :disabled="unreadCount === 0"
              class="inline-flex items-center px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCheck class="w-4 h-4 mr-2" />
              <span class="hidden sm:inline">Đánh dấu tất cả</span>
              <span class="sm:hidden">Đánh dấu</span>
            </button>
            <button
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Settings class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div
        class="bg-white rounded-lg border border-gray-200 shadow-sm mb-6 overflow-hidden"
      >
        <!-- Mobile Filter Dropdown -->
        <div class="sm:hidden px-4 py-3 border-b border-gray-200">
          <select
            v-model="activeFilter"
            class="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option
              v-for="filter in filterOptions"
              :key="filter.value"
              :value="filter.value"
            >
              {{ filter.label }}
              {{
                filter.value === "unread" && unreadCount > 0
                  ? `(${unreadCount})`
                  : ""
              }}
            </option>
          </select>
        </div>

        <!-- Desktop Filter Tabs -->
        <div class="hidden sm:block px-6 py-4 border-b border-gray-200">
          <nav class="flex flex-wrap gap-1" role="tablist">
            <button
              v-for="filter in filterOptions"
              :key="filter.value"
              @click="activeFilter = filter.value"
              class="px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
              :class="
                activeFilter === filter.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              "
            >
              {{ filter.label }}
              <span
                v-if="filter.value === 'unread' && unreadCount > 0"
                class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full"
              >
                {{ unreadCount }}
              </span>
            </button>
          </nav>
        </div>

        <!-- Notifications List -->
        <div class="divide-y divide-gray-100">
          <div
            v-for="notification in filteredNotifications"
            :key="notification.id"
            class="relative p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            :class="{
              'bg-blue-25 border-l-4 border-l-blue-500': notification.unread,
            }"
            @click="markAsRead(notification.id)"
          >
            <!-- Unread indicator -->
            <div
              v-if="notification.unread"
              class="absolute top-4 sm:top-6 right-4 sm:right-6 w-2 h-2 bg-blue-500 rounded-full"
            ></div>

            <div class="flex space-x-3 sm:space-x-4">
              <!-- Avatar -->
              <div class="relative flex-shrink-0">
                <img
                  :src="notification.avatar"
                  :alt="notification.name"
                  class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div
                  v-if="notification.online"
                  class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-white rounded-full"
                ></div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0 pr-4 sm:pr-0">
                <!-- Header -->
                <div
                  class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-1"
                >
                  <div
                    class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2 sm:mb-0"
                  >
                    <span
                      class="font-medium text-gray-900 text-sm sm:text-base"
                    >
                      {{ notification.name }}
                    </span>
                    <span class="text-gray-600 text-sm">
                      {{ notification.action }}
                    </span>
                    <span
                      v-if="notification.target"
                      class="font-medium text-blue-600 text-sm break-words"
                    >
                      {{ notification.target }}
                    </span>
                  </div>
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium self-start sm:self-auto"
                    :class="getNotificationTypeStyle(notification.type)"
                  >
                    {{ getNotificationTypeLabel(notification.type) }}
                  </span>
                </div>

                <!-- Timestamp -->
                <div
                  class="flex items-center space-x-1 text-xs sm:text-sm text-gray-500 mb-3"
                >
                  <Clock class="w-3 h-3" />
                  <span>{{ notification.timestamp }}</span>
                </div>

                <!-- Comment Content -->
                <div
                  v-if="notification.comment"
                  class="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3"
                >
                  <div class="flex items-start space-x-2">
                    <MessageSquare
                      class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                    />
                    <p
                      class="text-gray-700 text-sm leading-relaxed break-words"
                    >
                      {{ notification.comment }}
                    </p>
                  </div>
                </div>

                <!-- File Attachment -->
                <div
                  v-if="notification.file"
                  class="flex items-center space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg mb-3"
                >
                  <div
                    class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <FileText class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 text-sm truncate">
                      {{ notification.file.name }}
                    </p>
                    <p class="text-xs text-gray-500">
                      {{ notification.file.size }}
                    </p>
                  </div>
                  <button
                    class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Download class="w-4 h-4" />
                  </button>
                </div>

                <!-- Action Buttons -->
                <div
                  v-if="notification.type === 'invitation'"
                  class="flex flex-col sm:flex-row gap-2 sm:space-x-2 mt-3"
                >
                  <button
                    @click.stop="declineInvitation(notification.id)"
                    class="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium w-full sm:w-auto"
                  >
                    Từ chối
                  </button>
                  <button
                    @click.stop="acceptInvitation(notification.id)"
                    class="px-3 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto"
                  >
                    Chấp nhận
                  </button>
                </div>

                <div v-if="notification.type === 'follow'" class="mt-3">
                  <button
                    @click.stop="followBack(notification.id)"
                    class="px-3 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto"
                  >
                    Theo dõi lại
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredNotifications.length === 0"
            class="p-8 sm:p-12 text-center"
          >
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <Bell class="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">
              Không có thông báo
            </h3>
            <p class="text-gray-500 max-w-sm mx-auto text-sm sm:text-base">
              {{
                activeFilter === "all"
                  ? "Bạn chưa có thông báo nào."
                  : "Không có thông báo nào phù hợp với bộ lọc hiện tại."
              }}
            </p>
          </div>
        </div>

        <!-- Load More -->
        <div
          v-if="filteredNotifications.length > 0"
          class="p-4 sm:p-6 border-t border-gray-200"
        >
          <div class="text-center">
            <button
              @click="loadMore"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 w-full sm:w-auto justify-center"
            >
              <div
                v-if="loading"
                class="w-4 h-4 mr-2 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"
              ></div>
              {{ loading ? "Đang tải..." : "Tải thêm thông báo" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCheck,
  Settings,
  Download,
  FileText,
  Clock,
  MessageSquare,
  Bell,
} from "lucide-vue-next";
import { ElMessage } from "element-plus";

// SEO Meta
useSeoMeta({
  title: "Thông báo - Chocode",
  description: "Quản lý thông báo và cập nhật mới nhất",
});

interface NotificationFile {
  name: string;
  size: string;
  type: string;
}

interface Notification {
  id: number;
  name: string;
  avatar: string;
  action: string;
  target?: string;
  timestamp: string;
  online: boolean;
  unread: boolean;
  comment?: string;
  file?: NotificationFile;
  type: "comment" | "follow" | "invitation" | "file" | "like" | "mention";
}

const activeFilter = ref("all");
const loading = ref(false);

const filterOptions = [
  { label: "Tất cả", value: "all" },
  { label: "Chưa đọc", value: "unread" },
  { label: "Bình luận", value: "comment" },
  { label: "Theo dõi", value: "follow" },
  { label: "Lời mời", value: "invitation" },
  { label: "Tệp tin", value: "file" },
];

// Mock notifications data
const notifications = ref<Notification[]>([
  {
    id: 1,
    name: "Nguyễn Văn An",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    action: "đã bình luận trong",
    target: "Dự án Dashboard 2.0",
    timestamp: "2 giờ trước",
    online: true,
    unread: true,
    comment:
      "Tôi thực sự thích cách tiếp cận này. Tôi nghĩ đây là giải pháp tốt nhất cho vấn đề UX đồng bộ tài liệu.",
    type: "comment",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    action: "đã bắt đầu theo dõi bạn",
    timestamp: "3 giờ trước",
    online: true,
    unread: true,
    type: "follow",
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    action: "đã mời bạn tham gia",
    target: "Thiết kế Blog",
    timestamp: "4 giờ trước",
    type: "invitation",
    online: false,
    unread: false,
  },
  {
    id: 4,
    name: "Phạm Thu Hà",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    action: "đã chia sẻ tệp tin trong",
    target: "Dashboard 2.0",
    timestamp: "5 giờ trước",
    online: true,
    unread: false,
    file: {
      name: "Bản ghi nguyên mẫu 01.mp4",
      size: "14 MB",
      type: "mp4",
    },
    type: "file",
  },
  {
    id: 5,
    name: "Đỗ Quang Huy",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    action: "đã thích bài viết của bạn",
    target: "UI/UX Best Practices",
    timestamp: "1 ngày trước",
    online: false,
    unread: false,
    type: "like",
  },
  {
    id: 6,
    name: "Vũ Thị Lan",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    action: "đã nhắc đến bạn trong",
    target: "Cuộc thảo luận về API",
    timestamp: "2 ngày trước",
    online: true,
    unread: false,
    comment:
      "@user Bạn có thể chia sẻ kinh nghiệm về việc tối ưu hóa API không?",
    type: "mention",
  },
]);

// Computed properties
const unreadCount = computed(
  () => notifications.value.filter((n) => n.unread).length
);

const filteredNotifications = computed(() => {
  if (activeFilter.value === "all") {
    return notifications.value;
  }
  if (activeFilter.value === "unread") {
    return notifications.value.filter((n) => n.unread);
  }
  return notifications.value.filter((n) => n.type === activeFilter.value);
});

// Methods
const getNotificationTypeStyle = (type: string) => {
  const styles = {
    comment: "bg-blue-100 text-blue-700",
    follow: "bg-green-100 text-green-700",
    invitation: "bg-orange-100 text-orange-700",
    file: "bg-purple-100 text-purple-700",
    like: "bg-red-100 text-red-700",
    mention: "bg-yellow-100 text-yellow-700",
  };
  return styles[type as keyof typeof styles] || "bg-gray-100 text-gray-700";
};

const getNotificationTypeLabel = (type: string) => {
  const labels = {
    comment: "Bình luận",
    follow: "Theo dõi",
    invitation: "Lời mời",
    file: "Tệp tin",
    like: "Thích",
    mention: "Nhắc đến",
  };
  return labels[type as keyof typeof labels] || type;
};

const markAsRead = (id: number) => {
  const notification = notifications.value.find((n) => n.id === id);
  if (notification && notification.unread) {
    notification.unread = false;
  }
};

const markAllAsRead = () => {
  const unreadNotifications = notifications.value.filter((n) => n.unread);
  if (unreadNotifications.length === 0) return;

  notifications.value.forEach((n) => (n.unread = false));
  ElMessage.success("Đã đánh dấu tất cả thông báo là đã đọc");
};

const acceptInvitation = (id: number) => {
  ElMessage.success("Đã chấp nhận lời mời");
  markAsRead(id);
};

const declineInvitation = (id: number) => {
  ElMessage.info("Đã từ chối lời mời");
  markAsRead(id);
};

const followBack = (id: number) => {
  ElMessage.success("Đã theo dõi lại");
  markAsRead(id);
};

const loadMore = () => {
  loading.value = true;
  // Simulate loading more notifications
  setTimeout(() => {
    const newNotifications = [
      {
        id: notifications.value.length + 1,
        name: "Hoàng Văn Nam",
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 50
        )}.jpg`,
        action: "đã bình luận trong",
        target: "Dự án mới",
        timestamp: "3 ngày trước",
        online: false,
        unread: false,
        type: "comment" as const,
      },
      {
        id: notifications.value.length + 2,
        name: "Mai Thị Hương",
        avatar: `https://randomuser.me/api/portraits/women/${Math.floor(
          Math.random() * 50
        )}.jpg`,
        action: "đã thích dự án",
        target: "Website E-commerce",
        timestamp: "4 ngày trước",
        online: true,
        unread: false,
        type: "like" as const,
      },
    ];
    notifications.value.push(...newNotifications);
    loading.value = false;
    ElMessage.success("Đã tải thêm thông báo");
  }, 1000);
};
</script>

<style scoped>
/* Custom gray background */
.bg-gray-25 {
  background-color: #fafafa;
}

.bg-blue-25 {
  background-color: #f8faff;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, transform,
    box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
button:focus-visible,
select:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Mobile specific adjustments */
@media (max-width: 640px) {
  /* Ensure text wrapping on mobile */
  .break-words {
    word-wrap: break-word;
    word-break: break-word;
  }

  /* Better touch targets */
  button {
    min-height: 44px;
  }

  /* Improved spacing for mobile */
  .notification-content {
    padding: 1rem;
  }
}

/* Tablet adjustments */
@media (min-width: 641px) and (max-width: 1024px) {
  .notification-item {
    padding: 1.25rem;
  }
}

/* Desktop optimizations */
@media (min-width: 1025px) {
  .notification-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
}

/* Ensure proper text truncation */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Custom select styling for mobile */
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
