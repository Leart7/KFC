import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress as updateAddressApi } from "../../services/apiAddresses";

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateAddress } = useMutation({
    mutationFn: ({ id, active }) => updateAddressApi(id, active),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  return { isLoading, updateAddress };
}
