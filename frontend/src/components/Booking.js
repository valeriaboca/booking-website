import { useEffect } from "react";
import ClientForm from "./ClientForm";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const location = useLocation();
  const { stylistId, date, timeSlot } = location.state;
  console.log(stylistId, date, timeSlot);

  useEffect(() => {});

  const handleSubmit = (e, formData) => {
    e.preventDefault();
    const bookingDetails = {
      ...formData,
      stylistId: stylistId,
      date: date,
      timeSlot: timeSlot,
    };
    console.log(
      "bookingDetails",
      bookingDetails,
      JSON.stringify(bookingDetails)
    );

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
          console.log(data.message);

          if (data.status === 201) {
            // Show Confirmation message
          } else {
            console.error("Error while booking: ", data);
            console.log("Server Response:", data);
          }
        })
        .catch((err) => {
          window.alert(err.message);
        });
    }
  };

  return (
    <>
      <ClientForm handleSubmit={handleSubmit} />
    </>
  );
};

export default Booking;
