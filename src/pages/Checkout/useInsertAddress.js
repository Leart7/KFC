import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertAddress as insertAddressApi } from "../../services/apiAddresses";
import toast from "react-hot-toast";

export function useInsertAddress() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: insertAddress } = useMutation({
    mutationFn: insertAddressApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Saved address");
    },
  });

  return { isLoading, insertAddress };
}
