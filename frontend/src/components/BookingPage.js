import styled from "styled-components";
import { useState } from "react";
import ClientForm from "./ClientForm";
import { useLocation } from "react-router-dom";
import Banner from "./Banner";

const BookingPage = () => {
  const location = useLocation();
  const { stylistId, date, timeSlot, price } = location.state;
  const [bookingStatus, setBookingStatus] = useState("");
  const [bookingId, setBookingId] = useState("");
  const handleSubmit = (e, formData) => {
    e.preventDefault();
    setBookingStatus("Booking in progress...");
    const bookingDetails = {
      ...formData,
      stylistId: stylistId,
      date: date,
      timeSlot: timeSlot,
    };
    //  post call to server with booking details
    if (bookingDetails) {
      fetch(`/add-booking`, {
        method: "POST",
        body: JSON.stringify(bookingDetails),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            // Show Confirmation message
            setBookingStatus("Booking Confirmed!");
            setBookingId(data.message);
          } else {
            setBookingStatus("Booking failed. Try again!");
          }
        })
        .catch((err) => {
          setBookingStatus("Booking failed. Try again!");
        });
    }
  };

  return (
    <>
      <PageWrapper>
        <Banner pageTitle="Booking Details" />
        <BookingStatus>
          <p>{bookingStatus} </p>
          <p>{bookingId} </p>
        </BookingStatus>
        {bookingStatus !== "Booking Confirmed!" && (
          <ClientForm handleSubmit={handleSubmit} price={price} />
        )}
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.section`
  margin: 0 auto;
  width: 90%;
  min-height: 450px;
`;

const BookingStatus = styled.div`
  text-align: center;
  p {
    padding: 10px;
  }
`;

export default BookingPage;
