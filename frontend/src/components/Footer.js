import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <FooterContent>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/faq">FAQ</Link>
          <Copyrights>
            &copy; Eyelash stylist Booking, Montreal. All rights reserved.
          </Copyrights>
        </Nav>
        <ContactSite>
          <p>Hours of Operation:</p>
          <p>MONDAY - SUNDAY</p>
          <p>9:00 a.m. - 3:00 p.m.</p>
          <p>eyelashstylists@gmail.com</p>
          <p>By Appointment only</p>
        </ContactSite>
      </FooterContent>
    </Wrapper>
  );
};

const Nav = styled.div`
  display: flex;
  flex: 50%;
  justify-content: left;
  flex-direction: column;
  a {
    text-decoration: none;
    color: var(--color-white);
    padding: 5px;
  }
`;

const ContactSite = styled.div`
  display: flex;
  flex: 50%;
  justify-content: right;
  flex-direction: column;
  text-align: right;
  p {
    padding: 5px;
  }
`;

const Wrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: var(--color-blue-header);
  height: 170px;
  padding: var(--padding-page) 18px;
`;

const FooterContent = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  color: var(--color-white);
`;

const Copyrights = styled.p`
  margin-top: 24px;
`;

export default Footer;
