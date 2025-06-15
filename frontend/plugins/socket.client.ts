import { io } from "socket.io-client";
import { BASE_PATH } from "~/auto_api/base";

export default defineNuxtPlugin((nuxtApp) => {
  const socket = io(BASE_PATH, {
    forceNew: true,
    withCredentials: true,
    transports: ["websocket"],
  });

  socket.on("connect", () => {});
  nuxtApp.provide("socket", socket);
});
