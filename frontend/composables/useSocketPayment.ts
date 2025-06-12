import { ref, onMounted, onUnmounted } from "vue";
import type { PaymentData } from "~/types/payment";

export const useSocketPayment = () => {
  const { $socket } = useNuxtApp();

  const paymentData = ref<PaymentData | null>(null);

  const handlePayment = (data: PaymentData) => {
    paymentData.value = data;
  };

  onMounted(() => {
    $socket.on("payment-success", handlePayment);
  });

  onUnmounted(() => {
    $socket.off("payment-success", handlePayment);
  });
  return {
    paymentData,
  };
};
