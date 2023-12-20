import { useMutation, useQueryClient } from "@tanstack/react-query";

function updateKfc(kfcLocation) {
  localStorage.setItem("kfcLocation", kfcLocation);
}

export function useUpdateKfcLocation() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateKfcLocation } = useMutation({
    mutationFn: updateKfc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kfcLocation"] });
    },
  });

  return { isLoading, updateKfcLocation };
}
