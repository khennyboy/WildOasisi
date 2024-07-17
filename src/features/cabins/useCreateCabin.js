import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/ApiCabin';
import toast from 'react-hot-toast';

const useCreateCabin = () => {
    const queryClient = useQueryClient()
    const {mutate:createCabin, isPending:isCreating} = useMutation({
      mutationFn: createEditCabin ,
      onSuccess:()=>{
        queryClient.invalidateQueries({
          queryKey: ["cabins"]
        });
        toast.success('New cabin successfully created');
      },
      onError: (err)=>toast.error(err.message)
    })
    return {isCreating, createCabin}
}

export default useCreateCabin