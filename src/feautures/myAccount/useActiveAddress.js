import { useQuery } from "@tanstack/react-query";
import { useAddresses } from "../checkout/useAddresses";

function getActiveAddress() {
  return localStorage.getItem("activeAddress");
}

export function useActiveAddress() {
  const { addresses } = useAddresses();

  const { isLoading, data: activeAddress } = useQuery({
    queryKey: ["activeAddress"],
    queryFn: () => {
      if (addresses && addresses.length !== 0) {
        return getActiveAddress();
      }
    },
    enabled: !!addresses, // This will prevent the query from running if addresses is falsy
  });

  return { isLoading, activeAddress };
}
