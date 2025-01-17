import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin(){
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const{mutate: login, isPending }= useMutation({
        mutationFn: loginApi,
        onSuccess: (user) =>{
            toast.success("Successfully login")
            queryClient.setQueryData(["user"], user)
            navigate('/dashboard', {replace: true})
        },
        onError: (err)=>{
            toast.error(err.message)
        }
    })
    return {login , isPending}
}