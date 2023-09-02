import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Link to="/">
        <Home>Home</Home>
      </Link>
      <H1>Eyelash Technician Booking</H1>
    </Wrapper>
  );
};

const H1 = styled.h1`
  color: black;
  text-align: center;
`;

const Home = styled.p`
  position: relative;
  margin: 3px;
`;

const Wrapper = styled.div`
  padding: 18px;
`;

export default Header;
