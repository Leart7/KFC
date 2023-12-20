import { useQuery } from "@tanstack/react-query";
import { getLastOrderUser } from "../../services/apiOrderUsers";
import { useUser } from "../authentication/useUser";

export function useLastOrderUser() {
  const { user, isLoading: userIsLoading } = useUser();

  const { isLoading, data: orderUser } = useQuery({
    queryKey: ["orderUser"],
    queryFn: () => {
      if (user) {
        return getLastOrderUser(user.id);
      }
    },
    enabled: !!user,
  });

  return { isLoading, orderUser };
}
