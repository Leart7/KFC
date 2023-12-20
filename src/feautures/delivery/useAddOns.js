import { useQuery } from "@tanstack/react-query";
import { getAddOns } from "../../services/apiAddOns";

export function useAddOns() {
  const { isLoading, data: addOns } = useQuery({
    queryKey: ["addOns"],
    queryFn: getAddOns,
  });

  return { isLoading, addOns };
}
