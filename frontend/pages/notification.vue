<!-- pages/notifications.vue -->
<template>
  <div class="mx-4 md:mx-16 lg:mx-32 xl:mx-[12rem] mt-20">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold">Thông báo</h1>
      <div class="flex gap-2">
        <button class="text-gray-500 hover:text-gray-700">
          <CheckCheck class="w-6 h-6" />
        </button>
        <button class="text-gray-500 hover:text-gray-700">
          <Settings class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div class="mb-6 h-auto">
      <el-tabs v-model="activeTab" class="custom-tabs h-auto">
        <el-tab-pane label="Cá nhân" name="personal">

          <div class="space-y-4">
            <div v-for="notification in notifications" :key="notification.id" class="py-4 border-b border-gray-100">
              <div class="flex">
                <div class="flex-shrink-0 mr-4 relative">
                  <img :src="notification.avatar" alt="Avatar" class="w-12 h-12 rounded-full object-cover">
                  <div v-if="notification.online" class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start mb-1">
                    <div>
                      <span class="font-semibold">{{ notification.name }}</span>
                      <span class="text-gray-500"> {{ notification.action }} </span>
                      <span v-if="notification.target" class="font-semibold">{{ notification.target }}</span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-gray-500 text-sm">{{ notification.time }}</span>
                      <div class="w-2 h-2 rounded-full bg-blue-600 ml-2" v-if="notification.unread"></div>
                    </div>
                  </div>
                  <div class="text-sm text-gray-500 mb-2">{{ notification.timestamp }}</div>
                  
                  <div v-if="notification.comment" class="p-4 bg-gray-50 rounded-lg mb-2">
                    {{ notification.comment }}
                  </div>
                  
                  <div v-if="notification.file" class="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div class="bg-blue-600 text-white p-2 rounded-lg mr-3">
                      <FileText class="w-5 h-5" />
                    </div>
                    <div class="flex-1">
                      <div class="font-medium">{{ notification.file.name }}</div>
                      <div class="text-sm text-gray-500">{{ notification.file.size }}</div>
                    </div>
                    <button class="text-gray-500 hover:text-gray-700">
                      <Download class="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div v-if="notification.type === 'invitation'" class="mt-3">
                    <div class="flex gap-2">
                      <el-button plain>Decline</el-button>
                      <el-button type="primary">Accept</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="Hệ thống" name="stats">
          <div class="p-4 text-center bg-gray-50 rounded-lg">
            <p class="text-gray-600">Notification statistics and analytics will be displayed here.</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CheckCheck, Settings, Download, FileText } from 'lucide-vue-next';

const activeTab = ref('personal');
const viewMode = ref('all');

// Mock data for notifications
const notifications = ref([
  {
    id: 1,
    name: 'Amélie',
    avatar: 'https://randomuser.me/api/portraits/women/64.jpg',
    action: 'commented in',
    target: 'Dashboard 2.0',
    time: '2 hours ago',
    timestamp: 'Friday 3:12 PM',
    online: true,
    unread: true,
    comment: 'Really love this approach. I think this is the best solution for the document sync UX issue.',
  },
  {
    id: 2,
    name: 'Sienna',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    action: 'followed you',
    time: '2 hours ago',
    timestamp: 'Friday 3:04 PM',
    online: true,
    unread: true,
  },
  {
    id: 3,
    name: 'Ammar',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    action: 'invited you to',
    target: 'Blog design',
    time: '3 hours ago',
    timestamp: 'Friday 2:22 PM',
    type: 'invitation',
    online: false,
  },
  {
    id: 4,
    name: 'Mathilde',
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    action: 'shared a file in',
    target: 'Dashboard 2.0',
    time: '4 hours ago',
    timestamp: 'Friday 1:40 PM',
    online: true,
    file: {
      name: 'Prototype recording 01.mp4',
      size: '14 MB',
      type: 'mp4'
    }
  }
]);
</script>

<style scoped>
/* Custom styles for Element Plus tabs */
:deep(.el-tabs__header) {
  @apply mb-4;
}

:deep(.el-tabs__item) {
  @apply text-gray-500 font-medium;
}

:deep(.el-tabs__item.is-active) {
  @apply text-blue-600 font-semibold;
}

:deep(.el-tabs__active-bar) {
  @apply bg-blue-600;
}

:deep(.el-tabs__content) {
  height: auto !important;
}

/* Custom button styles to match the design */
.el-button {
  @apply h-10 px-4 rounded-md;
}

.el-button--plain {
  @apply border border-gray-300 bg-white text-gray-700;
}

.el-button--primary {
  @apply bg-blue-600 text-white border-none;
}
</style>