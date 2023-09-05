import { useState } from "react";
import styled from "styled-components";

const ClientForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <Div>
      <StyledForm onSubmit={(e) => handleSubmit(e, formData)}>
        <Input
          type="text"
          placeholder="First Name*"
          name="firstName"
          required
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name*"
          name="lastName"
          required
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
        <Input
          type="tel"
          placeholder="Phone Number*"
          name="phoneNumber"
          required
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email*"
          name="email"
          required
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Submit type="submit">Book Now</Submit>
      </StyledForm>
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

const StyledForm = styled.form`
  margin-top: 24px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  width: 500px;
  border: solid 2px teal;
`;

export default ClientForm;
