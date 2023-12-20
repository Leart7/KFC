import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress as deleteAddressApi } from "../../services/apiAddresses";
import toast from "react-hot-toast";

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: deleteAddress } = useMutation({
    mutationFn: deleteAddressApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address deleted");
    },
  });

  return { isLoading, deleteAddress };
}
