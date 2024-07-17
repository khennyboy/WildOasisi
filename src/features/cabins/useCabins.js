import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/ApiCabin";

export const useCabins = () => {
    const { isLoading, data: cabins, error, isError } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins,
      });
      return {isLoading, cabins, error, isError}
}
