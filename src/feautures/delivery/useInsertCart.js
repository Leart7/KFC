import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCart as insertCartApi } from "../../services/apiCart";

export function useCart() {
  const queryClient = useQueryClient();

  const { mutate: insertCart, isLoading: isInserting } = useMutation({
    mutationFn: insertCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return { insertCart, isInserting };
}
