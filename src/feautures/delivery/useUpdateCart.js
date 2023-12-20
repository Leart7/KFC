import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart as updateCartApi } from "../../services/apiCart";

export function useUpdateCart() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingCart, mutate: updateCart } = useMutation(
    (updateCartObj) =>
      updateCartApi(updateCartObj.id, updateCartObj.updateCartObj),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    },
  );

  return { isUpdatingCart, updateCart };
}
