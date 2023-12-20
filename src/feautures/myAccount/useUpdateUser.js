import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation(
    (updateUserObj) =>
      updateCurrentUser(updateUserObj.userId, updateUserObj.updateUserObj),
    {
      onSuccess: (updatedUser) => {
        toast.success("User account successfully updated");
        queryClient.setQueryData(["user"], updatedUser);
      },
      onError: (err) => toast.error(err.message),
    },
  );

  return { updateUser, isLoading };
}
