import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking = {}, isLoading, isError, error } = useBooking()
  const { status, id: bookingId } = booking
  const { checkout, isCheckingout } = useCheckout()
  const { isDeleting, deleteBooking } = useDeleteBooking()
  const moveBack = useMoveBack();
  const navigate = useNavigate()

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />
  if (isError) return <p>{error.message}</p>;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <ButtonGroup>
        {status == 'unconfirmed' && (<Button
          onClick={() => navigate(`/checkin/${bookingId}`)}>
          Check In
        </Button>)
        }
        {status == 'checked-in' && (
          <Button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingout}>
            Check out
          </Button>)
        }
        <Modal>
          {status !== 'checked-in' &&
            <Modal.Open opens='delete'>
              <Button variation='danger'>Delete Booking</Button>
            </Modal.Open>
          }

          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1)
                })
              }} />
          </Modal.Window>
        </Modal >
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
