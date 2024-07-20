import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useSetting from '../settings/useSetting.js'


const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setaddBreakfast] = useState(false)

  const { booking = {}, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin()
  const { settings, isLoading: isLoadingSettings } = useSetting()

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
  }, [booking.isPaid])

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  if (isLoading || isLoadingSettings) return <Spinner />

  const optionalbreakfastPrice = settings.breakfastPrice * numNights * numGuests

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalbreakfastPrice,
          totalPrice: totalPrice + optionalbreakfastPrice
        }
      })
    }
    else {
      checkin({ bookingId, breakfast: {} })
    }
  }


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (<Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setaddBreakfast(add => !add);
            setConfirmPaid(false)
          }}
          id="breakfast"
        >
          Want to add breakfast for {formatCurrency(optionalbreakfastPrice)}
        </Checkbox>
      </Box>)
      }

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(confirm => !confirm)}
          id='confirm'
          disabled={confirmPaid}>
          I connfirm that {guests.fullName} has paid the total amount of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalbreakfastPrice)}(${formatCurrency(totalPrice)}+${formatCurrency(optionalbreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
