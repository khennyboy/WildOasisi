import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser(){
    const {isLoading , data:userData} = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        retry: false
    })
    
    return {isLoading, isAuthenticated: userData?.user?.role === "authenticated"}
}