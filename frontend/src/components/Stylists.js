import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientForm from "./ClientForm";

const Stylists = () => {
  const location = useLocation();
  const { stylistId } = location.state;
  const [stylistInfo, getStylistInfo] = useState({});
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
  return (
    <>
      {stylistInfo && (
        <div>
          <div>
            <Img
              src={`images/${stylistInfo.imageName}.jpg`}
              alt={`${stylistInfo.name}`}
            />
            {stylistInfo.name}
            {stylistInfo.price}
            <Link to="/booking">Book now</Link>
          </div>
          <ClientForm />
        </div>
      )}
    </>
  );
};

const Img = styled.img`
  width: 293px;
  height: 293px;
  object-fit: cover;
  object-position: 50% 50%;
`;

export default Stylists;
