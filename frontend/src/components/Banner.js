import styled from "styled-components";

const Banner = ({ pageTitle }) => {
  return <H2>{pageTitle}</H2>;
};

const H2 = styled.h2`
  color: var(--color-blue-header);
  padding: 20px 0 10px 0;
`;

export default Banner;
