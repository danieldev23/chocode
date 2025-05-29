<!-- pages/notifications.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 mt-14">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-sm border p-6 mb-6">
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
        >
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Thông báo</h1>
            <p class="text-gray-600 mt-1">
              {{ unreadCount }} thông báo chưa đọc
            </p>
          </div>
          <div class="flex items-center gap-3">
            <el-button
              :icon="CheckCheck"
              size="default"
              @click="markAllAsRead"
              :disabled="unreadCount === 0"
            >
              Đánh dấu tất cả
            </el-button>
            <el-button :icon="Settings" size="default" circle />
          </div>
        </div>
      </div>

      <!-- Filter Options -->
      <div class="bg-white rounded-xl shadow-sm border p-4 mb-6">
        <div class="flex flex-wrap gap-2">
          <el-button
            v-for="filter in filterOptions"
            :key="filter.value"
            :type="activeFilter === filter.value ? 'primary' : ''"
            size="small"
            @click="activeFilter = filter.value"
            class="transition-all duration-200"
          >
            {{ filter.label }}
          </el-button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div class="divide-y divide-gray-100">
          <div
            v-for="notification in filteredNotifications"
            :key="notification.id"
            class="p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            :class="{
              'bg-blue-50 border-l-4 border-l-blue-500': notification.unread,
            }"
            @click="markAsRead(notification.id)"
          >
            <div class="flex gap-4">
              <!-- Avatar with Status -->
              <div class="flex-shrink-0 relative">
                <img
                  :src="notification.avatar"
                  :alt="notification.name"
                  class="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  loading="lazy"
                />
                <div
                  v-if="notification.online"
                  class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                ></div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div
                  class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2"
                >
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-semibold text-gray-900">{{
                        notification.name
                      }}</span>
                      <span class="text-gray-600">{{
                        notification.action
                      }}</span>
                      <span
                        v-if="notification.target"
                        class="font-medium text-blue-600"
                      >
                        {{ notification.target }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                      <Clock class="w-4 h-4 text-gray-400" />
                      <span class="text-gray-500">{{
                        notification.timestamp
                      }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <el-tag
                      :type="getNotificationTypeTag(notification.type)"
                      size="small"
                      class="hidden sm:block"
                    >
                      {{ getNotificationTypeLabel(notification.type) }}
                    </el-tag>
                    <div
                      v-if="notification.unread"
                      class="w-2 h-2 rounded-full bg-blue-500"
                    ></div>
                  </div>
                </div>

                <!-- Comment Content -->
                <div
                  v-if="notification.comment"
                  class="bg-gray-100 rounded-lg p-4 mb-3 text-gray-700"
                >
                  <MessageSquare class="w-4 h-4 text-gray-500 inline mr-2" />
                  {{ notification.comment }}
                </div>

                <!-- File Attachment -->
                <div
                  v-if="notification.file"
                  class="flex items-center gap-3 p-4 bg-gray-100 rounded-lg mb-3"
                >
                  <div class="flex-shrink-0">
                    <div
                      class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center"
                    >
                      <FileText class="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 truncate">
                      {{ notification.file.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ notification.file.size }}
                    </div>
                  </div>
                  <el-button :icon="Download" size="small" circle />
                </div>

                <!-- Action Buttons -->
                <div
                  v-if="notification.type === 'invitation'"
                  class="flex gap-2 mt-4"
                >
                  <el-button
                    size="small"
                    @click.stop="declineInvitation(notification.id)"
                  >
                    Từ chối
                  </el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click.stop="acceptInvitation(notification.id)"
                  >
                    Chấp nhận
                  </el-button>
                </div>

                <div
                  v-if="notification.type === 'follow'"
                  class="flex gap-2 mt-4"
                >
                  <el-button
                    type="primary"
                    size="small"
                    @click.stop="followBack(notification.id)"
                  >
                    Theo dõi lại
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredNotifications.length === 0"
            class="p-12 text-center"
          >
            <Bell class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              Không có thông báo
            </h3>
            <p class="text-gray-500">
              Chưa có thông báo nào phù hợp với bộ lọc hiện tại.
            </p>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="filteredNotifications.length > 0" class="text-center mt-6">
        <el-button @click="loadMore" :loading="loading">
          Tải thêm thông báo
        </el-button>
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
import { ElMessage, ElNotification } from "element-plus";

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

const getNotificationTypeTag = (type: string) => {
  const typeMap: Record<string, string> = {
    comment: "primary",
    follow: "success",
    invitation: "warning",
    file: "info",
    like: "danger",
    mention: "primary",
  };
  return typeMap[type] || "";
};

const getNotificationTypeLabel = (type: string) => {
  const labelMap: Record<string, string> = {
    comment: "Bình luận",
    follow: "Theo dõi",
    invitation: "Lời mời",
    file: "Tệp tin",
    like: "Thích",
    mention: "Nhắc đến",
  };
  return labelMap[type] || type;
};

const markAsRead = (id: number) => {
  const notification = notifications.value.find((n) => n.id === id);
  if (notification) {
    notification.unread = false;
  }
};

const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.unread = false));
  ElMessage.success("Đã đánh dấu tất cả thông báo là đã đọc");
};

// Custom notification with smooth animations
const showCustomNotification = (data: any, newNotification: Notification) => {
  const typeConfig = {
    INFO: {
      type: "info" as const,
      iconClass: "text-blue-500",
      bgClass: "bg-gradient-to-r from-blue-50 to-blue-100",
      borderClass: "border-l-blue-500",
    },
    SUCCESS: {
      type: "success" as const,
      iconClass: "text-green-500",
      bgClass: "bg-gradient-to-r from-green-50 to-green-100",
      borderClass: "border-l-green-500",
    },
    WARNING: {
      type: "warning" as const,
      iconClass: "text-yellow-500",
      bgClass: "bg-gradient-to-r from-yellow-50 to-yellow-100",
      borderClass: "border-l-yellow-500",
    },
    ERROR: {
      type: "error" as const,
      iconClass: "text-red-500",
      bgClass: "bg-gradient-to-r from-red-50 to-red-100",
      borderClass: "border-l-red-500",
    },
  };

  const config =
    typeConfig[data.type as keyof typeof typeConfig] || typeConfig.INFO;

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
    ];
    notifications.value.push(...newNotifications);
    loading.value = false;
  }, 1000);
};

// Generate random Vietnamese names
const getRandomVietnameseName = () => {
  const firstNames = [
    "Nguyễn",
    "Trần",
    "Lê",
    "Phạm",
    "Hoàng",
    "Huỳnh",
    "Phan",
    "Vũ",
    "Võ",
    "Đặng",
    "Bùi",
    "Đỗ",
    "Hồ",
    "Ngô",
    "Dương",
  ];
  const middleNames = [
    "Văn",
    "Thị",
    "Minh",
    "Thu",
    "Quang",
    "Hữu",
    "Đức",
    "Thanh",
    "Tuấn",
    "Anh",
  ];
  const lastNames = [
    "An",
    "Bình",
    "Cường",
    "Dũng",
    "Hà",
    "Hùng",
    "Linh",
    "Mai",
    "Nam",
    "Phong",
    "Quân",
    "Sơn",
    "Tâm",
    "Thành",
    "Vy",
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middleName =
    middleNames[Math.floor(Math.random() * middleNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${middleName} ${lastName}`;
};

// Convert socket notification to internal format
const convertSocketNotification = (socketData: any) => {
  const typeMapping: Record<string, any> = {
    INFO: { action: "đã gửi thông báo", type: "mention" },
    WARNING: { action: "đã cảnh báo về", type: "mention" },
    ERROR: { action: "đã báo lỗi trong", type: "mention" },
    SUCCESS: { action: "đã hoàn thành", type: "like" },
  };

  const mapping = typeMapping[socketData.type] || {
    action: "đã thông báo",
    type: "mention",
  };

  return {
    id: Date.now() + Math.random(), // Unique ID
    name: getRandomVietnameseName(),
    avatar: `https://randomuser.me/api/portraits/${
      Math.random() > 0.5 ? "men" : "women"
    }/${Math.floor(Math.random() * 99)}.jpg`,
    action: mapping.action,
    target: socketData.target !== "ALL" ? socketData.target : undefined,
    timestamp: "Vừa xong",
    online: Math.random() > 0.3, // 70% chance online
    unread: true,
    comment: socketData.message,
    type: mapping.type,
  };
};

// Cleanup socket listeners on unmount

// Set page meta
useHead({
  title: "Thông báo",
  meta: [{ name: "description", content: "Quản lý thông báo của bạn" }],
});
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Custom notification styles */
:global(.custom-notification) {
  border-radius: 12px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  backdrop-filter: blur(10px) !important;
  animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

:global(.custom-notification .el-notification__content) {
  padding: 0 !important;
  margin: 0 !important;
}

:global(.custom-notification .el-notification__title) {
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #1f2937 !important;
  margin-bottom: 8px !important;
}

:global(.custom-notification .el-notification__closeBtn) {
  color: #6b7280 !important;
  font-size: 18px !important;
  right: 12px !important;
  top: 12px !important;
}

:global(.custom-notification .el-notification__closeBtn:hover) {
  color: #374151 !important;
}

/* Notification animations */
@keyframes slideInRight {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Highlight animation for clicked notification */
.highlight-notification {
  animation: highlightPulse 2s ease-in-out;
  transform: scale(1.02);
}

@keyframes highlightPulse {
  0%,
  100% {
    background-color: transparent;
    transform: scale(1);
  }
  50% {
    background-color: rgba(59, 130, 246, 0.1);
    transform: scale(1.02);
  }
}

/* Enhanced notification item animations */
.notification-item {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.notification-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  transition: left 0.5s;
}

.notification-item:hover::before {
  left: 100%;
}

.notification-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Custom notification content styles */
.notification-content {
  width: 100%;
}

.notification-content img {
  transition: transform 0.3s ease;
}

.notification-content:hover img {
  transform: scale(1.05);
}

/* Element Plus customizations */
:deep(.el-button) {
  border-radius: 8px;
  font-weight: 500;
}

:deep(.el-tag) {
  border-radius: 6px;
  font-size: 12px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
