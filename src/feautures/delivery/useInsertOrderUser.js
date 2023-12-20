import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertOrderuser as insertOrderUserApi } from "../../services/apiOrderUsers";

export function useInsertOrderUser() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: insertOrderUser } = useMutation({
    mutationFn: insertOrderUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderUser"] });
    },
  });

  return { isLoading, insertOrderUser };
}
