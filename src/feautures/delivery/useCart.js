import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/apiCart";
import { useUser } from "../authentication/useUser";

export function useCart() {
  const { user, isLoading: userIsLoading } = useUser();
  const { isLoading, data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      if (user) {
        return getCart(user.id);
      }
    },
    enabled: !!user, // Only execute the query if user is available
  });

  return { isLoading: userIsLoading || isLoading, cart };
}
