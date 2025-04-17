<template>
  <img
    :src="avatar || DefaultAvatarUser"
    :alt="altText"
    :width="size"
    :height="size"
    class="rounded-full mr-2 object-cover"
  />
</template>

<script lang="ts" setup>
import DefaultAvatarUser from '~/assets/images/header/default-avatar.png';

const props = defineProps({ 
  avatar: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 32
  }
})

// Alt text mặc định cho avatar (có thể tùy biến thêm nếu có username)
const altText = 'Avatar user'
</script>
