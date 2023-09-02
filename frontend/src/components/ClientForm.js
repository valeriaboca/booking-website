import { useState } from "react";
import styled from "styled-components";

const ClientForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Div>
      <Wrapper>
        <Input
          type="text"
          placeholder="First Name"
          name="firstName"
          required
          handleChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          required
          handleChange={handleChange}
        />
        <Input
          type="tel"
          placeholder="Phone Number"
          name="phoneNumber"
          required
          handleChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          required
          handleChange={handleChange}
        />
        <Submit type="submit">Book Now</Submit>
      </Wrapper>
    </Div>
  );
};

const Input = styled.input`
  border: solid 1px gray;
  margin: 4px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
`;

const Submit = styled.button`
  background-color: teal;
  border: none;
  margin-top: 5px;
  border-radius: 2px;
`;

const Wrapper = styled.div`
  margin-top: 24px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: 500px;
  border: solid 2px teal;
`;

export default ClientForm;
