import { updateSetting } from '../../services/apiSettings';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useEditSetting from './useEditSetting';
import useSetting from './useSetting';

function UpdateSettingsForm() {
  const {isLoading, settings:{
    minBookingLength,
    maxBookingLength,
    maxGuestPerCabin,
    breakfastPrice
  }= {}} = useSetting()

  const {isUpdating, updateSetting} = useEditSetting()

  function handleUpdate(e, field){
    const {value} = e.target
    if(!value) return
    updateSetting({[field]: value})
  }

  if(isLoading) return <Spinner/>
  
  return (
    <Form>
      <FormRowVertical label='Minimum nights/booking'>
        <Input type='number' id='min-nights' 
        defaultValue={minBookingLength}
        onBlur={(e)=>handleUpdate(e, 'minBookingLength')}
        disabled= {isUpdating}/>
      </FormRowVertical>

      <FormRowVertical label='Maximum nights/booking'>
        <Input type='number' id='max-nights' 
        defaultValue={maxBookingLength} 
        onBlur={(e)=>handleUpdate(e, 'maxBookingLength')}
        disabled= {isUpdating}/>
      </FormRowVertical>

      <FormRowVertical label='Maximum guests/booking'>
        <Input type='number' id='max-guests' 
        defaultValue={maxGuestPerCabin}
        onBlur={(e)=>handleUpdate(e, 'maxGuestPerCabin')}
        disabled= {isUpdating}/>
      </FormRowVertical>

      <FormRowVertical label='Breakfast price'>
        <Input type='number' id='breakfast-price' 
        defaultValue={breakfastPrice}
        onBlur={(e)=>handleUpdate(e, 'breakfastPrice')}
        disabled= {isUpdating}/>
      </FormRowVertical>
    </Form>
  );
}

export default UpdateSettingsForm;
