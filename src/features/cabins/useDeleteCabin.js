import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi} from "../../services/ApiCabin";
import toast from "react-hot-toast";

export function useDeleteCabin(){
const queryClient = useQueryClient();
  
const { isPending:isDeleting , mutate: deleteCabin} = useMutation({
  mutationFn: deleteCabinApi, 
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["cabins"]
    });
    toast.success("Cabin successfully deleted");
  },
  onError: (err)=>toast.error(err.message)
});

    return {isDeleting, deleteCabin}
}