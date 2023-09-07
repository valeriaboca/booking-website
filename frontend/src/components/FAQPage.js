import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from "./Banner";

const FaqPage = () => {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    fetch("/get-faq")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200 && data.data) {
          const faqData = data.data;
          setFaq(faqData);
        }
      })
      .catch((error) => console.error("Error fetching FAQ data:", error));
  }, []);

  return (
    <PageWrapper>
      <Banner pageTitle="FAQ" />
      <Wrapper>
        {faq.map((item) => (
          <Container key={item._id}>
            <H3>{item.question}</H3>
            <P>{item.answer}</P>
          </Container>
        ))}
      </Wrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.section`
  margin: 0 auto;
  width: 90%;
  min-height: 450px;
`;

const P = styled.p`
  line-height: 1.4;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Container = styled.div`
  color: black;
  text-align: center;
  margin: 10px;
  width: 500px;
  line-height: 1.3;
`;

const H3 = styled.h3`
  color: var(--color-blue-header);
  margin-bottom: 8px;
  margin-top: 10px;
`;

export default FaqPage;
