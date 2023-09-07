"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  getStylists,
  getStylist,
  getBookings,
  addBooking,
  getPromocode,
  getFaq,
  updateBooking,
  deleteBooking,
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  // get all stylists
  .get("/get-stylists", getStylists)

  //get selected stylist
  .get("/get-stylist/:stylistId", getStylist)

  // get booking details of a stylist
  .get("/get-bookings/:stylistId/:date", getBookings)

  // get discount if promocode is valid
  .get("/get-promocode/:code", getPromocode)

  // get FAQ
  .get("/get-faq", getFaq)

  // add new booking
  .post("/add-booking", addBooking)

  // update booking
  .patch("/update-booking", updateBooking)

  // cancel booking
  .delete("/delete-booking/:bookingId", deleteBooking)

  //catch for all endpoints
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
