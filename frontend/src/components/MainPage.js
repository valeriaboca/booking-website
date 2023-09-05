import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MainPage = () => {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    fetch("/get-stylists")
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
              <H3>{stylist.name}</H3>
              <p>skill:</p>
              {stylist.skill}
              <LinkToStylist
                to="/stylist"
                state={{ stylistId: `${stylist._id}` }}
              >
                Book Session
              </LinkToStylist>
            </Container>
          );
        })}
    </Wrapper>
  );
};

const H3 = styled.h3``;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LinkToStylist = styled(Link)`
  color: royalblue;
  text-decoration: none;
  cursor: pointer;
  margin-top: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

const Container = styled.div`
  width: 293px;
  height: 600px;
  border: 1px solid black;
  display: flex;
  margin: 20px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-bottom: 60px;
  overflow: hidden;
`;

export default MainPage;
