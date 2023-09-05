import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, subDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const Stylists = () => {
  const location = useLocation();
  const { stylistId } = location.state;
  console.log("stylistId", stylistId);

  const [stylistInfo, getStylistInfo] = useState({});
  const [selectedDate, setSelectedDate] = useState(addDays(new Date(), 1));
  const [selectedTime, setSelectedTime] = useState("");
  const timeSlots = ["9 A.m."];
  useEffect(() => {
    if (stylistId) {
      fetch(`/get-stylist/${stylistId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200 && data.data) {
            const stylistInfo = data.data;
            getStylistInfo(stylistInfo);
            console.log(stylistInfo);
          }
        })
        .catch((error) => console.error("Error fetching stylistInfo:", error));
    }
  }, []);

  const onDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  return (
    <>
      {stylistInfo && (
        <div>
          <Container>
            <H1>{stylistInfo.skill}</H1>
            <Img
              src={`images/${stylistInfo.imageName}.jpg`}
              alt={`${stylistInfo.name}`}
            />
            <P>
              {stylistInfo.name} <br />
              {stylistInfo.price}
            </P>
            <Link
              to="/booking"
              state={{
                stylistId: `${stylistId}`,
                date: `${selectedDate}`,
                timeSlot: `${selectedTime}`,
              }}
            >
              Next
            </Link>
          </Container>
          <DatePicker
            selected={selectedDate}
            includeDateIntervals={[
              { start: new Date(), end: addDays(new Date(), 13) },
            ]}
            onChange={(date) => onDateChange(date)}
            inline
          />
          <TimeSlotContainer>
            <TimeSlot
              onClick={() => setSelectedTime("9 a.m.")}
              $color={selectedTime === "9 a.m." ? "green" : ""}
            >
              9 a.m.
            </TimeSlot>
            <TimeSlot
              onClick={() => setSelectedTime("10 a.m.")}
              $color={selectedTime === "10 a.m." ? "green" : ""}
            >
              10 a.m.
            </TimeSlot>
          </TimeSlotContainer>
        </div>
      )}
    </>
  );
};

const H1 = styled.h1``;

const Container = styled.div`
  margin-left: 100px;
`;

const P = styled.p``;

const Img = styled.img`
  height: 293px;
  margin-top: 40px;
  border-radius: 15px;
`;

const TimeSlotContainer = styled.div`
  display: inline-block;
  border: 1px solid black;
  text-align: center;
`;

const TimeSlot = styled.div`
  border: 1px solid black;
  display: inline-block;
  padding: 5px;
  margin: 10px;
  cursor: pointer;
  background-color: ${(props) => props.$color || "#FFFFFF"};
  border-color: ${(props) => props.$color || "#000000"};

  &:hover {
    background-color: skyblue;
    border-color: blue;
  }
`;

export default Stylists;
