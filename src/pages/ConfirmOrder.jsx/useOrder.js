import { useQuery } from "@tanstack/react-query";
import { getLastOrder } from "../../services/apiOrders";
import { useOrderUser } from "../Checkout/useOrderUser";

export function useOrder() {
  const { orderUser } = useOrderUser();

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
