interface NotificationData {
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error"; // ElNotification chỉ nhận lowercase
  target: string;
}

interface PaymentData {
  username: string;
  posting_date: string;
  transaction_date: string;
  credit_amount: string;
  debit_amount: string;
  currency: string;
  description: string;
  ref_no: string;
  created: string;
}

export const useSocketNotification = () => {
  const { $socket } = useNuxtApp();

  const handleNotification = (rawData: any) => {
    const noti: NotificationData | undefined = rawData?.spec?.args?.data;

    if (!noti || !noti.title || !noti.message || !noti.type) {
      console.warn("❗ Dữ liệu thông báo không hợp lệ:", rawData);
      return;
    }

    ElNotification({
      title: noti.title,
      message: noti.message,
      type: noti.type.toLowerCase() as NotificationData["type"],
      position: "bottom-left",
      duration: 5000,
    });
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
