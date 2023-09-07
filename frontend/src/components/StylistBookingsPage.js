import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Banner from "./Banner";

const StylistBookingsPage = () => {
  const location = useLocation();
  const { stylistId } = location.state;
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [bookings, setBookings] = useState([]);

  let formattedDate = format(selectedDate, "MM-dd-yyyy");

  useEffect(() => {
    viewBookings();
  }, [selectedDate]);

  const onDateChange = (date) => {
    setSelectedDate(date);
    formattedDate = format(selectedDate, "MM-dd-yyyy");
  };

  const viewBookings = () => {
    if (formattedDate && stylistId) {
      fetch(`/get-bookings/${stylistId}/${formattedDate}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200 && data.data) {
            const bookingsArr = data.data;
            if (bookingsArr) {
              setBookings(bookingsArr.sort().reverse());
            }
          }
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  };

  const cancelBooking = (bookingId) => {
    fetch(`/delete-booking/${bookingId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 && data.data) {
          const deleteCount = data.data;
          if (deleteCount) {
            viewBookings();
          }
        }
      })
      .catch((err) => {
        console.error("Error deleting booking:", err.message);
      });
  };

  return (
    <PageWrapper>
      <Banner pageTitle="Bookings" />
      <div>
        <Wrapper>
          <Container>
            <DatePickerContainer>
              <H3>Choose Date:</H3>
              <DatePicker
                selected={selectedDate}
                includeDateIntervals={[
                  { start: new Date(), end: addDays(new Date(), 13) },
                ]}
                onChange={(date) => onDateChange(date)}
                inline
              />
            </DatePickerContainer>
          </Container>
          <BookingSlots>
            <TimeSlotContainer>
              <H3>Booking Details:</H3>
              {bookings &&
                bookings.map((booking) => {
                  return (
                    <BookingInfo>
                      <Time>{booking.timeSlot}</Time>
                      <ClientDetails>
                        <p>
                          Name: {booking.clientDetails.firstName}{" "}
                          {booking.clientDetails.lastName}
                        </p>
                        <p>Contact: {booking.clientDetails.phoneNumber}</p>
                        <p>Email: {booking.clientDetails.email}</p>
                        <p>Total: ${booking.clientDetails.total}</p>
                      </ClientDetails>
                      <div>
                        <StyledLink
                          to="/stylist"
                          state={{
                            stylistId: `${stylistId}`,
                            bookingId: `${booking._id}`,
                            scheduleDate: `${selectedDate}`,
                            selectedTimeSlot: `${booking.timeSlot}`,
                            isEdit: true,
                          }}
                        >
                          Reschedule
                        </StyledLink>
                        <CancelBooking
                          onClick={() => cancelBooking(booking._id)}
                        >
                          Cancel Booking
                        </CancelBooking>
                      </div>
                    </BookingInfo>
                  );
                })}
              {bookings.length === 0 && (
                <NoAvailableSlots>No Bookings</NoAvailableSlots>
              )}
            </TimeSlotContainer>
          </BookingSlots>
        </Wrapper>
      </div>
    </PageWrapper>
  );
};

const BookingInfo = styled.div`
  border: 2px solid var(--color-blue-header);
  text-align: left;
  margin: 10px;
  border-radius: 10px;
`;

const Time = styled.p`
  background: var(--color-blue-header);
  color: var(--color-white);
  padding: 5px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ClientDetails = styled.div`
  p {
    padding: 5px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: white;
  background: var(--color-blue-header);
  text-align: center;
  padding: 10px;
  margin: 8px 10px;
  border-radius: 5px;
  display: inline-block;
`;

const CancelBooking = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: white;
  background: var(--color-blue-header);
  text-align: center;
  padding: 10px;
  margin: 8px 10px;
  border-radius: 5px;
  display: inline-block;
`;

const PageWrapper = styled.section`
  margin: 0 auto;
  width: 90%;
`;

const Container = styled.div`
  display: flex;
  margin-right: 30px;
  flex-direction: column;
  padding-bottom: 10px;
  overflow: hidden;
  p {
    margin: 5px 10px;
  }
`;

const H3 = styled.h3`
  padding: 10px;
  color: var(--color-blue-header);
`;

const BookingSlots = styled.div`
  padding: 10px;
  flex: 60%;
`;

const DatePickerContainer = styled.div`
  display: inline-block;
  padding: 15px;
`;

const TimeSlotContainer = styled.div`
  text-align: center;
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;
`;

const NoAvailableSlots = styled.div`
  padding: 10px;
  margin: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: var(--padding-page) 18px;
  margin: 0 auto;
  width: 80%;
`;

export default StylistBookingsPage;
