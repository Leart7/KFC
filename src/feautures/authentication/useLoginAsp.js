import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAsp } from "../../services/apiAuth";

export function useLoginAsp() {
  const queryClient = useQueryClient();

  const { mutate: loginTest, isLoading } = useMutation({
    mutationFn: loginAsp,
    onSuccess: () => {
      console.log("loggedIn");
      queryClient.setQueryData(["arti"]);
    },
  });

  return { loginTest, isLoading };
}
