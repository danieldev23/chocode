import type { SessionData } from "#auth";

export const useCurrentUser = async () => {
  const currentUser = useState<SessionData | null>('current-user', () => null);

  if (!currentUser.value) {
    const { getSession } = useAuth();
    const session = await getSession();
    currentUser.value = session ?? null; // fallback to null if undefined
  }

  return currentUser;
}

