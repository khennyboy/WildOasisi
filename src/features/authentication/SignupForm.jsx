import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";


// const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
function SignupForm() {
  const {register , formState, getValues, handleSubmit, reset} = useForm()
  const {errors} = formState 
  const {signup, isPending} = useSignup()

  function onSubmit({fullName, email, password}){
    signup({fullName, email, password}, {
      onSettled: reset()
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Full name" error = {errors?.fullName?.message}>
        <Input type="text" disabled={isPending} id="fullName" {
          ...register("fullName", {
            required: "This field is required"
          })
        } />
      </FormRowVertical>

      <FormRowVertical label="Email address" error = {errors?.email?.message}>
        <Input type="email" id="email" disabled={isPending} {
          ...register("email", {
            required: "This field is required",
            pattern : {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address"
            }
          })
        }/>
      </FormRowVertical>

      <FormRowVertical label="Password (min 8 characters)" error = {errors?.password?.message}>
        <Input type="password" id="password" disabled={isPending} {
          ...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters"
            }
          })
        } />
      </FormRowVertical>

      <FormRowVertical label="Repeat password" error = {errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={isPending} {
          ...register("passwordConfirm", {
            required: "This field is required",
            validate: (value)=> value === getValues().password || "Password need to match"
          })
        }/>
      </FormRowVertical>

      <FormRowVertical>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isPending}>
          Cancel
        </Button>
        <Button disabled={isPending}>{isPending? <SpinnerMini/> : "Create new user"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm;
