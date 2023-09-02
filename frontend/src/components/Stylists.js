import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

const Stylists = ({ stylist_id }) => {
  return (
    <div>
      Jennifer
      <img
        src="https://cdn.shopifycdn.net/s/files/1/0473/5103/8114/files/13_480x480.jpg?v=1653641368"
        alt="eyelash styles"
      />
      more info
      <Link to="/booking">Book now</Link>
    </div>
  );
};

export default Stylists;
