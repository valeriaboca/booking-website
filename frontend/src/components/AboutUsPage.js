import styled from "styled-components";
import Banner from "./Banner";

const AboutUsPage = () => {
  return (
    <PageWrapper>
      <Banner pageTitle="About Us" />
      <Wrapper>
        <Img src="/working.jpg" alt="Working" />
        <P>
          We are a meticulous Microblading salon skilled in the latest
          hyper-realistic techniques. Our commitment is to create the most
          natural, high-quality results, customized to each client's bone
          structure and personality. As stylists, we empower our clients. <br />{" "}
          We pride ourselves on being the ultimate choice, excelling in both our
          application methods and procedural approach. Every lash is affixed
          with a meticulous focus on precision, with each one individually
          hand-placed to breathe life into your unique design.
        </P>
      </Wrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.section`
  margin: 0 auto;
  width: 90%;
  min-height: 450px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const P = styled.p`
  text-align: center;
  line-height: 1.8;
  width: 500px;
  margin: 53px;
`;

const Img = styled.img`
  width: 250px;
  height: 350px;
  margin-top: 55px;
  margin-bottom: 55px;
`;

export default AboutUsPage;
