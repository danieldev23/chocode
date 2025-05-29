export const useCurrentBalanceUser = () => {
  const balance = ref<number | null>(null);
  const currentUser = useCurrentUser();
  const token = useCookie("auth.token");

  const fetchBalance = async () => {
    if (!currentUser.value?.username) {
      balance.value = null;
      return;
    }
    try {
      const data = await userService.userControllerGetBallance(
        currentUser.value.username,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      balance.value = data.balance;
    } catch (error) {
      console.error("Lấy balance thất bại:", error);
      balance.value = null;
    }
  };

  return { balance, fetchBalance };
};
