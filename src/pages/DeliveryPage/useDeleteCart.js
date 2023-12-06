import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart as deleteCartApi } from "../../services/apiCart";
import { useUser } from "../authentication/useUser";

export function useDeleteCart() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { isLoading: isDeleting, mutate: deleteCart } = useMutation({
    mutationFn: (cartId) => deleteCartApi(cartId, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { isDeleting, deleteCart };
}
