import { useQuery } from "@tanstack/react-query";
import { getHomeCategories } from "../../services/apiHomeCategories";

export function useHomeCategories() {
  const { isLoading, data: homeCategories } = useQuery({
    queryKey: ["homeCategories"],
    queryFn: getHomeCategories,
  });

  return { isLoading, homeCategories };
}
