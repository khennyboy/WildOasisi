import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/ApiCabin";
import toast from "react-hot-toast";

const useEditCabin = () => {
    const queryClient = useQueryClient()
    const {mutate:editCabin, isPending:isEditing} = useMutation({
        mutationFn: ({newCabinData, id})=>createEditCabin(newCabinData, id) ,
        onSuccess:()=>{
            queryClient.invalidateQueries({
            queryKey: ["cabins"]
            });
            toast.success('Cabin successfully edited');
        },
        onError: (err)=>toast.error(err.message)
    })

    return {editCabin, isEditing}
}

export default useEditCabin