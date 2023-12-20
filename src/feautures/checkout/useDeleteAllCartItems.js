import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllCartItems as deleteCartItems } from "../../services/apiCart";

export function useDeleteAllCartItems() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteAllCartItems } = useMutation({
    mutationFn: deleteCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { isLoading, deleteAllCartItems };
}
