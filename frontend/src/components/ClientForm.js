import { useState, useEffect } from "react";
import styled from "styled-components";

const ClientForm = ({ handleSubmit, price }) => {
  const [formData, setFormData] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(price);
  const [promoMessage, setPromoMessage] = useState("");
  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const applyPromo = () => {
    if (promoCode) {
      fetch(`/get-promocode/${promoCode.toLowerCase()}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200 && data.data && data.data.discount) {
            const discount = parseInt(data.data.discount);
            setDiscount(discount);
            calculateTotal(discount);
            setPromoMessage("Promo code applied!");
          } else {
            setPromoMessage("Invalid promoCode");
          }
        })
        .catch((error) => console.error("Error fetching discount:", error));
    }
  };

  const calculateTotal = (discount) => {
    let total = 0;
    if (discount) {
      total = price - (price * discount) / 100;
    } else {
      total = price;
    }
    setTotal(total);
    handleChange("total", total);
  };

  useEffect(() => {
    calculateTotal(discount);
  }, []);

  return (
    <Div>
      <StyledForm
        onSubmit={(e) => {
          handleSubmit(e, formData);
        }}
      >
        <PaymentDetails>
          <H3>Payment Details</H3>
          <Input
            type="text"
            placeholder="Promo code"
            name="promoCode"
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <ApplyButton
            $isEnabled={promoCode ? true : false}
            type="button"
            onClick={applyPromo}
          >
            Apply
          </ApplyButton>
          <PromoMessage>{promoMessage}</PromoMessage>
          <p>Price: ${price}</p>
          {discount ? <p>Discount: {discount}%</p> : ""}
          <p>Total: ${total}</p>
        </PaymentDetails>
        <ClientDetails>
          <H3>Client Details</H3>
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
          <Submit $isEnabled={true} type="submit">
            Book Now
          </Submit>
        </ClientDetails>
      </StyledForm>
    </Div>
  );
};

const H3 = styled.h3`
  padding: 10px;
  color: var(--color-blue-header);
`;

const ClientDetails = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-blue-header);
  border-radius: 10px;
  margin-right: 30px;
  padding: 15px;
`;

const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid var(--color-blue-header);
  border-radius: 10px;
  padding: 15px;
  margin-right: 30px;
  p {
    margin: 5px 10px;
  }
`;

const Input = styled.input`
  border: solid 1px gray;
  margin: 4px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Submit = styled.button`
  cursor: ${(props) => (props.$isEnabled ? "pointer" : "not-allowed")};
  color: ${(props) => (props.$isEnabled ? "#ffffff" : "#000000")};
  background: ${(props) =>
    props.$isEnabled ? "var(--color-blue-header)" : "#c5bebe"};
  text-align: center;
  padding: 10px;
  margin: 8px 2px;
  border-radius: 5px;
  display: block;
  font-size: 16px;
`;

const ApplyButton = styled.button`
  cursor: ${(props) => (props.$isEnabled ? "pointer" : "not-allowed")};
  color: ${(props) => (props.$isEnabled ? "#ffffff" : "#000000")};
  background: ${(props) =>
    props.$isEnabled ? "var(--color-blue-header)" : "#c5bebe"};
  text-align: center;
  padding: 10px;
  margin: 8px 2px;
  border-radius: 5px;
  display: block;
  font-size: 16px;
`;

const PromoMessage = styled.p``;

const StyledForm = styled.form`
  margin-top: 24px;
  padding: 30px;
  display: flex;
`;

export default ClientForm;
