import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

// import functions, from the "date-fns" library.
import { addDays, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import Banner from "./Banner";

const StylistsPage = () => {
  const location = useLocation();
  // destructuring the location.state object to get values
  const { stylistId, bookingId, isEdit, scheduleDate, selectedTimeSlot } =
    location.state;

  const [stylistInfo, getstylistInfo] = useState({});

  //if 'isEdit' is true and 'scheduleDate' exists, use 'scheduleDate'.
  // otherwise, it sets a default value of the date one day from the current date.
  const [selectedDate, setSelectedDate] = useState(
    isEdit && scheduleDate ? new Date(scheduleDate) : addDays(new Date(), 1)
  );
  const [selectedTime, setSelectedTime] = useState(
    isEdit && selectedTimeSlot ? selectedTimeSlot : ""
  );
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotSelected, setSlotSelected] = useState(false);

  const [rescheduleMessage, setRescheduleMessage] = useState("");
  const [rescheduleId, setRescheduleId] = useState("");

  let formattedDate = format(selectedDate, "MM-dd-yyyy");
  const timeSlots = ["9 a.m.", "10 a.m.", "11 a.m."];

  // fetch the stylist information
  useEffect(() => {
    if (stylistId) {
      fetch(`/get-stylist/${stylistId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200 && data.data) {
            const stylistInfo = data.data;
            getstylistInfo(stylistInfo);
          }
        })
        .catch((error) => console.error("Error fetching stylistInfo:", error));
    }
  }, []);

  // fetch available time slots for the selected date
  useEffect(() => {
    if (formattedDate && stylistId) {
      fetch(`/get-bookings/${stylistId}/${formattedDate}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200 && data.data) {
            const bookingsArr = data.data;
            let bookedSlots;
            if (bookingsArr) {
              bookedSlots = bookingsArr.map((booking) => booking.timeSlot);
              const availableSlots = timeSlots.filter(
                (slot) =>
                  bookedSlots.indexOf(slot) < 0 || slot === selectedTimeSlot
              );
              setAvailableSlots(availableSlots);
            }
          }
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [selectedDate]);

  // handle date selection
  const onDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
    setSlotSelected(false);
    formattedDate = format(selectedDate, "MM-dd-yyyy");
  };

  // function to reschedule a booking
  const rescheduleBooking = () => {
    const bookingInfo = {
      _id: bookingId,
      date: format(selectedDate, "MM-dd-yyyy"),
      time: selectedTime,
    };
    if (bookingInfo) {
      fetch(`/update-booking`, {
        method: "PATCH",
        body: JSON.stringify(bookingInfo),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200 && data.data.modifiedCount) {
            if (data.data.modifiedCount)
              setRescheduleMessage("Booking Rescheduled!");
            setRescheduleId(data.message);
          } else {
            setRescheduleMessage(
              "Could not Reschedule the booking. Try again later!"
            );
          }
        })
        .catch((err) => {
          setRescheduleMessage("Technical error. Try again later!", err);
        });
    }
  };

  return (
    <>
      {stylistInfo && (
        <PageWrapper>
          <Banner pageTitle="Schedule Appointment" />
          <div>
            <Wrapper>
              <Container>
                <Img
                  src={`images/${stylistInfo.imageName}.jpg`}
                  alt={`${stylistInfo.name}`}
                />
                <H3>{stylistInfo.name}</H3>
                <p>Services: {stylistInfo.skill}</p>
                <p>Price: ${stylistInfo.price}</p>
              </Container>
              {rescheduleMessage ? (
                <Reschedule>
                  {rescheduleMessage} {rescheduleId}
                </Reschedule>
              ) : (
                <BookingSlots>
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
                  <TimeSlotContainer>
                    <H3>Choose Time:</H3>
                    {availableSlots &&
                      availableSlots.map((timeSlot) => {
                        return (
                          <TimeSlot
                            onClick={() => {
                              setSelectedTime(timeSlot);
                              // enabling next link
                              setSlotSelected(true);
                            }}
                            $color={selectedTime === timeSlot ? "green" : ""}
                          >
                            {timeSlot}
                          </TimeSlot>
                        );
                      })}
                    {availableSlots.length === 0 && (
                      <NoAvailableSlots>No slots available</NoAvailableSlots>
                    )}
                    {isEdit ? (
                      <RescheduleBooking onClick={() => rescheduleBooking()}>
                        Rechedule Booking
                      </RescheduleBooking>
                    ) : (
                      <NextLink
                        $isEnabled={slotSelected}
                        to={slotSelected && "/booking"}
                        state={{
                          stylistId: `${stylistId}`,
                          date: `${formattedDate}`,
                          timeSlot: `${selectedTime}`,
                          price: `${parseInt(stylistInfo.price)}`,
                        }}
                      >
                        Next
                      </NextLink>
                    )}
                  </TimeSlotContainer>
                </BookingSlots>
              )}
            </Wrapper>
          </div>
        </PageWrapper>
      )}
    </>
  );
};

const PageWrapper = styled.section`
  margin: 0 auto;
  width: 90%;
`;

const Container = styled.div`
  display: flex;
  border: 2px solid var(--color-blue-header);
  border-radius: 10px;
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

const Img = styled.img`
  height: 293px;
`;

const BookingSlots = styled.div`
  border: 2px solid var(--color-blue-header);
  border-radius: 10px;
  padding: 10px;
  flex: 60%;
`;

const DatePickerContainer = styled.div`
  display: inline-block;
`;

const TimeSlotContainer = styled.div`
  text-align: center;
  display: inline-block;
  vertical-align: top;
  margin-left: 20px;
`;

const TimeSlot = styled.div`
  border: 1px solid black;
  padding: 5px;
  margin: 10px;
  cursor: pointer;
  background-color: ${(props) => props.$color || "#FFFFFF"};
  border-color: ${(props) => props.$color || "#000000"};
  color: ${(props) => (props.$color ? "#FFFFFF" : "#000000")};
  width: fit-content;
  display: inline-block;
  &:hover {
    background-color: ${(props) => props.$color || "skyblue"};
    border-color: ${(props) => props.$color || "blue"};
    color: ${(props) => (props.$color ? "#FFFFFF" : "#000000")};
  }
`;

const NoAvailableSlots = styled.div`
  padding: 10px;
  margin: 10px;
`;

const NextLink = styled(Link)`
  text-decoration: none;
  cursor: ${(props) => (props.$isEnabled ? "pointer" : "not-allowed")};
  color: ${(props) => (props.$isEnabled ? "#ffffff" : "#000000")};
  background: ${(props) =>
    props.$isEnabled ? "var(--color-blue-header)" : "#c5bebe"};
  text-align: center;
  padding: 10px;
  margin: 8px 10px;
  border-radius: 5px;
  display: block;
`;

const RescheduleBooking = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #ffffff;
  background: var(--color-blue-header);
  text-align: center;
  padding: 10px;
  margin: 8px 10px;
  border-radius: 5px;
  display: block;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: var(--padding-page) 18px;
  margin: 0 auto;
  width: 80%;
`;

const Reschedule = styled.div`
  padding: 10px;
`;

export default StylistsPage;
