import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertAddress as insertAddressApi } from "../../services/apiAddresses";
import toast from "react-hot-toast";
import { useSetActiveAddress } from "../myAccount/useSetActiveAddress";

export function useInsertAddress() {
  const queryClient = useQueryClient();
  const { setAddress } = useSetActiveAddress();

  const { isLoading, mutate: insertAddress } = useMutation({
    mutationFn: insertAddressApi,
    onSuccess: (newAddress) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Saved address");
      setAddress(newAddress.id);
    },
  });

  return { isLoading, insertAddress };
}
