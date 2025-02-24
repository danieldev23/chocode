<template>
  <el-avatar :size="size" :src="avatar || DefaultAvatarUser" class="mr-2" />
</template>

<script lang="ts" setup>
import DefaultAvatarUser from '~/assets/images/header/default-avatar.png';

defineProps({ 
  avatar: {
    type: String
  },
  size: {
    type: Number,
    default: 32
  }
})
</script>