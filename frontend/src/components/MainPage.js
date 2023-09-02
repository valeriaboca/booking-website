import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    fetch(`/get-stylists`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 && data.data) {
          const stylists = data.data;
          setStylists(stylists);
          console.log(stylists);
        }
      })
      .catch((error) => console.error("Error fetching stylists data:", error));
  }, []);

  return (
    <Wrapper>
      {stylists &&
        stylists.length > 0 &&
        stylists.map((stylist) => {
          return (
            <Container key={stylist._id}>
              <Img
                src={`images/${stylist.imageName}.jpg`}
                alt={`${stylist.name}`}
              />
              {stylist.name}
              {stylist.price}
              <LinkToStylist to="/stylist" state={{ stylistId: `${stylist._id}` }}>Book Session</LinkToStylist>
            </Container>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LinkToStylist = styled(Link)`
  margin-top: 60px;
  margin-bottom: 5px;
  color: purple;
  text-decoration: none;
  cursor: pointer;
`;

const Img = styled.img`
  width: 293px;
  height: 293px;
  object-fit: cover;
  object-position: 50% 50%;
`;

const Container = styled.div`
  border: 1px solid black;
  display: flex;
  margin: 20px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export default MainPage;
