import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function setActiveAddress(addressId) {
  localStorage.setItem("activeAddress", addressId);
}

export function useSetActiveAddress() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: setAddress } = useMutation({
    mutationFn: setActiveAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeAddress"] });
      toast.success("Address Changed");
    },
  });
  return { isLoading, setAddress };
}
