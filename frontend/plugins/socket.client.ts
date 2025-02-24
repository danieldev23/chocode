import { io, Socket } from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
  const SOCKET_URL = "http://localhost:3001"; // Đổi thành URL backend nếu deploy

  const socket: Socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5, // Thử lại 5 lần nếu mất kết nối
    reconnectionDelay: 3000, // Đợi 3 giây trước khi thử lại
  });

  socket.on("connect", () => {
    console.log("🔥 Socket connected:", socket.id);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Connection error:", error);
  });

  // Cung cấp socket vào toàn bộ ứng dụng
  nuxtApp.provide("socket", socket);
});
