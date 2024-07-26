import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import useUpdateUser from './useUpdateUser.js'

import { useUser } from "./useUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { userData: { user } } = useUser()
  const { fullName: currentFullName, email } = user.user_metadata
  const { updateUser, isUpdating } = useUpdateUser()

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return
    updateUser({ fullName, avatar }, {
      onSuccess: () => {
        setAvatar(null);
        e.target.reset()
      }
    })
  }

  function handleCancel() {
    setFullName(currentFullName)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input value={email} disabled />
      </FormRowVertical>
      <FormRowVertical label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRowVertical>
    </Form>
  );
}

export default UpdateUserDataForm;
