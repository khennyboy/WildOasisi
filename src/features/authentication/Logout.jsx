import React from 'react'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useLogout } from './useLogOut'
import SpinnerMini from '../../ui/SpinnerMini'

const Logout = () => {
    const {logout, isPending} = useLogout()
  return (
    <ButtonIcon disabled = {isPending} onClick={logout}>
       {isPending ? <SpinnerMini/> : <HiArrowRightOnRectangle/>}
    </ButtonIcon>
  )
}

export default Logout