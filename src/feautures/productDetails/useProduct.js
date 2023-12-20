import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";
import { useParams } from "react-router-dom";

export function useProduct() {
  const { id } = useParams();

  const { isLoading, data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    retry: false,
  });

  return { isLoading, product };
}
