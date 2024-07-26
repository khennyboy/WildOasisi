import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

const useEditCabin = () => {
    const queryClient = useQueryClient()
    const {mutate:updateUser, isPending:isUpdating} = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess:(user)=>{
            queryClient.setQueryData(['user'], user)
            toast.success('User account successfully updated');
        },
        onError: (err)=>toast.error(err.message)
    })

    return {updateUser, isUpdating}
}

export default useEditCabin