import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/apiOrders";
import { useUser } from "../authentication/useUser";

export function useAllOrders() {
  const { user } = useUser();

  const { isLoading, data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      if (user) {
        return getAllOrders(user.id);
      }
    },
    enabled: !!user,
  });

  return { isLoading, orders };
}
