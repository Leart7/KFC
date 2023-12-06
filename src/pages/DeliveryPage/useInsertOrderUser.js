import { useMutation } from "@tanstack/react-query";
import { insertOrderUser as insertOrderUserApi } from "../../services/apiOrderUsers";

export function useInsertOrderUser() {
  const { isLoading, mutate: insertOrderUser } = useMutation({
    mutationFn: insertOrderUserApi,
  });

  return { isLoading, insertOrderUser };
}
