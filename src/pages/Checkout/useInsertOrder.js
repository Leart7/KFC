import { useMutation } from "@tanstack/react-query";
import { insertOrder as insertOrderApi } from "../../services/apiOrders";
import { useNavigate } from "react-router-dom";

export function useInsertOrder() {
  const navigate = useNavigate();

  const { isLoading, mutate: insertOrder } = useMutation({
    mutationFn: insertOrderApi,
    // onSuccess: () => navigate('')
  });

  return { isLoading, insertOrder };
}
