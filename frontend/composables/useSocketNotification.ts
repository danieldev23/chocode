interface NotificationData {
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  target: string;
}

export const useSocketNotification = () => {
  const { $socket } = useNuxtApp();

  const handleNotification = (rawData: any) => {
    const notification: NotificationData = rawData?.spec?.args?.data;
  };

  onMounted(() => {
    if (!$socket) {
      console.error("❌ Socket chưa được khởi tạo!");
      return;
    }

    $socket.on("notification", handleNotification);
  });

  onUnmounted(() => {
    $socket?.off("notification", handleNotification);
  });
};
