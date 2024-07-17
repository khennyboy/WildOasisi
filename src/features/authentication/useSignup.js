import { useMutation } from '@tanstack/react-query'
import { signup  as signupApi} from '../../services/apiAuth'
import toast from 'react-hot-toast'

const useSignup = () => {
    const {mutate: signup, isPending} = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) =>{
            console.log(user.user, 'Account created successfully')
            toast.success("Account successfully created! Please verify the new account from the user's email address.")
        }
    })
  return { signup, isPending}
}

export default useSignup