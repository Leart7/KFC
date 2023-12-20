import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../../services/apiAddresses";
import { useUser } from "../authentication/useUser";

export function useAddresses() {
  const { user } = useUser();

  const { isLoading, data: addresses } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => {
      if (user) {
        return getAddresses(user.id);
      }
    },
    enabled: !!user,
  });

  return { isLoading, addresses };
}
