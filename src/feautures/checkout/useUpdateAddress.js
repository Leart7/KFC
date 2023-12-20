import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress as updateAddressApi } from "../../services/apiAddresses";

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateAddress } = useMutation({
    mutationFn: (updateAddressObj) =>
      updateAddressApi(updateAddressObj.id, updateAddressObj.updateAddressObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });

  return { isLoading, updateAddress };
}
