import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <H1>Eyelash stylist Booking</H1>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/faq">FAQ</Link>
      </Nav>
    </Wrapper>
  );
};

const H1 = styled.h1`
  color: var(--color-white);
  text-align: center;
`;
const Nav = styled.nav`
  display: flex;
  flex: 100%;
  justify-content: center;
  height: 20px;
  a {
    text-decoration: none;
    color: var(--color-white);
    padding: 0 10px;
    border-right: 2px solid;
    &:last-child {
      border: none;
    }
  }
`;

const Wrapper = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: var(--color-blue-header);
  height: 150px;
  padding: var(--padding-page) 18px;
`;

export default Header;
