import { useQuery } from "@tanstack/react-query";

function getKfcLocation() {
  return localStorage.getItem("kfcLocation");
}

export function useKfcLocation() {
  const { isLoading, data: kfcLocation } = useQuery({
    queryFn: getKfcLocation,
    queryKey: ["kfcLocation"],
  });

  return { isLoading, kfcLocation };
}
