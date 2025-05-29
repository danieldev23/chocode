import { ref, onMounted, onUnmounted } from "vue";
import type { PaymentData } from "~/types/payment";


export const useSocketPayment = () => {
  const { $socket } = useNuxtApp();

  const paymentData = ref<PaymentData | null>(null);

  const handlePayment = (data: PaymentData) => {
    console.log("Nhận payment từ socket:", data);
    paymentData.value = data; 
  };

  onMounted(() => {
    $socket.on("payment-success", handlePayment);
  });

  onUnmounted(() => {
    $socket.off("payment-success", handlePayment);
  });

  // Trả về reactive ref để component có thể dùng
  return {
    paymentData,
  };
};
