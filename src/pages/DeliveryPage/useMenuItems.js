import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../../services/apiMenuItems";

export function useMenuItems() {
  const { isLoading, data: menuAddOns } = useQuery({
    queryKey: ["menuAddOns"],
    queryFn: getMenuItems,
  });

  return { isLoading, menuAddOns };
}
