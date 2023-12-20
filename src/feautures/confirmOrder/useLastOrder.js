import { useQuery } from "@tanstack/react-query";
import { getLastOrder } from "../../services/apiOrders";
import { useLastOrderUser } from "../checkout/useLastOrderUser";

export function useLastOrder() {
  const { orderUser } = useLastOrderUser();

  const { isLoading, data: order } = useQuery({
    queryKey: ["order"],
    queryFn: () => {
      if (orderUser) {
        return getLastOrder(orderUser.id);
      }
    },
    enabled: !!orderUser,
  });

  return { isLoading, order };
}
