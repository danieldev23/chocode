<script setup lang="ts">
import { onMounted } from "vue";

const { $socket } = useNuxtApp(); // TypeScript sẽ không báo lỗi nữa ✅

onMounted(() => {
  if (!$socket.connected) {
    $socket.connect();
  }

  $socket.emit("message", "Hello WebSocket");

  $socket.on("message", (data) => {
    console.log("📩 Nhận được:", data);
  });
});
</script>

<template>
  <div>
    <h1 class="text-2xl">WebSocket trong Nuxt 3</h1>
    <button @click="$socket.emit('message', 'Ping')">Gửi tin nhắn</button>
  </div>
</template>
