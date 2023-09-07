import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Banner from "./Banner";

const MainPage = () => {
  const [stylists, setstylists] = useState([]);

  useEffect(() => {
    fetch("/get-stylists")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 && data.data) {
          const stylists = data.data;
          setstylists(stylists);
        }
      })
      .catch((error) => console.error("Error fetching stylists data:", error));
  }, []);

  return (
    <PageWrapper>
      <Banner pageTitle="Choose a stylist" />
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
                <p>Price: ${stylist.price}</p>
                <Services>Services: {stylist.skill}</Services>

                {/* passing the stylist._id  in Link by using location state (useLocation to /stylist) */}
                <LinkTostylist
                  to="/stylist"
                  state={{ stylistId: `${stylist._id}` }}
                >
                  Book Session
                </LinkTostylist>
                <LinkTostylist
                  to="/stylistBookings"
                  state={{ stylistId: `${stylist._id}` }}
                >
                  View Bookings
                </LinkTostylist>
              </Container>
            );
          })}
      </Wrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.section`
  margin: 0 auto;
  width: 90%;
  min-height: 450px;
`;

const H3 = styled.h3`
  padding: 10px;
  color: var(--color-blue-header);
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LinkTostylist = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: white;
  background: var(--color-blue-header);
  text-align: center;
  padding: 10px;
  margin: 8px 10px;
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  object-position: 50% 50%;
`;

const Container = styled.div`
  width: 293px;
  height: 600px;
  min-height: 500px;
  border: 2px solid var(--color-blue-header);
  border-radius: 10px;
  display: flex;
  margin: 20px;
  flex-direction: column;
  padding-bottom: 60px;
  overflow: hidden;
  p {
    margin: 5px 10px;
  }
`;

const Services = styled.p`
  min-height: 50px;
`;

export default MainPage;
