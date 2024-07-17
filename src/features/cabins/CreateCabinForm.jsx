import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRowVertical from "../../ui/FormRowVertical";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";


function CreateCabinForm(info) {
  const { onCloseModal, cabinToEdit = {} } = info
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditsession = Boolean(editId)

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditsession ? editValues : {}
  })

  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin(onCloseModal)
  const { isEditing, editCabin } = useEditCabin()

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image :
      data.image[0]

    if (isEditsession) editCabin({
      newCabinData: {
        ...data, image: image
      }, id: editId
    }, {
      onSuccess: () => {
        reset()
        onCloseModal()
      }
    });

    else createCabin({ ...data, image: image }, {
      onSuccess: () => {
        reset()
        onCloseModal()
      }
    })
  }
  const isWorking = isCreating || isEditing

  function onError(err) {
    // console.error(err)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRowVertical label="cabin name" error={errors?.name?.message}>
        <Input type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required"
          })} />
      </FormRowVertical>

      <FormRowVertical label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at be least 1"
            }
          })} />
      </FormRowVertical>

      <FormRowVertical label="Regular Price" error={errors?.regularPrice?.message}>
        <Input type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required"
          })} />
      </FormRowVertical>

      <FormRowVertical label="discount" error={errors?.discount?.message}>
        <Input type="number"
          id="discount"
          defaultValue={0}
          disabled={isWorking}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              if (+value >= 0) {
                return (value <= +getValues().regularPrice || "Discount should be less than regular price")
              }
              else {
                return ("Discount cant be less than zero ")
              }
            }
          })} />
      </FormRowVertical>

      <FormRowVertical label="Description" error={errors?.description?.message}>
        <Textarea type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required"
          })} />
      </FormRowVertical>

      <FormRowVertical label="Cabin Photo">
        <FileInput id="image"
          accept="image/*" {...register("image", {
            required: isEditsession ? false : "This field is required"
          })} />
      </FormRowVertical>

      <FormRowVertical>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{
          isEditsession ? "Edit Cabin" : "Create new cabin"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default CreateCabinForm;
