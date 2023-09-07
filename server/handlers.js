"use strict";

//import essential mongoDB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns an array of all stylists
const getStylists = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("booking-site");
    const stylists = db.collection("stylists");
    const stylistsArray = await stylists.find({}).toArray();
    res.status(200).json({ status: 200, data: stylistsArray });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

// returns selected stylist's information
const getStylist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("booking-site");
    const stylistId = req.params.stylistId;
    const stylistInfo = await db
      .collection("stylists")
      .findOne({ _id: stylistId });
    if (stylistInfo) {
      res.status(200).json({ status: 200, data: stylistInfo });
    } else {
      res.status(404).json({ status: 404, message: "stylist not found" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

// returns selected stylist's bookings for a particular date
const getBookings = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("booking-site");
    const stylistId = req.params.stylistId;
    const date = req.params.date;
    const bookings = await db
      .collection("bookings")
      .find({ stylistId: stylistId, date: date })
      .toArray();

    if (bookings) {
      res.status(200).json({ status: 200, data: bookings });
    } else {
      res.status(404).json({ status: 404, message: "No bookings found" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

// get FAQ's
const getFaq = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("booking-site");
    const faq = db.collection("faq");
    const faqArray = await faq.find({}).toArray();

    res.status(200).json({ status: 200, data: faqArray });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

// add a new booking
const addBooking = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const {
    stylistId,
    date,
    timeSlot,
    firstName,
    lastName,
    phoneNumber,
    email,
    total,
  } = req.body;
  const noMissingData =
    stylistId &&
    date &&
    timeSlot &&
    firstName &&
    lastName &&
    phoneNumber &&
    email &&
    total
      ? true
      : false;

  try {
    await client.connect();
    const db = client.db("booking-site");

    if (noMissingData) {
      const bookingId = uuidv4();
      const newBooking = {
        _id: bookingId,
        stylistId: stylistId,
        date: date,
        timeSlot,
        clientDetails: {
          firstName,
          lastName,
          phoneNumber,
          email,
          total,
        },
      };

      await db.collection("bookings").insertOne(newBooking);

      res
        .status(201)
        .json({ status: 201, data: newBooking, message: bookingId });
    } else {
      throw new Error("missing data");
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    client.close();
  }
};

// get promocodes
const getPromocode = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("booking-site");
    const promoCode = db.collection("promocode");

    const { code } = req.params;
    const discountObj = await promoCode.findOne({ code });

    if (discountObj) {
      res
        .status(200)
        .json({ status: 200, data: { discount: discountObj.discount } });
    } else {
      res.status(404).json({ status: 404, message: "Invalid promocode" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

// updates the selected booking
const updateBooking = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { _id, date, time } = req.body;

  try {
    await client.connect();
    const db = client.db("booking-site");
    const targetBooking = await db.collection("bookings").updateOne(
      { _id: _id },
      {
        $set: {
          date: date,
          timeSlot: time,
        },
      }
    );
    res.status(200).json({ status: 200, data: targetBooking, message: _id });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  } finally {
    client.close();
  }
};

// deletes the booking
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    client.connect();
    const db = client.db("booking-site");
    const targetBooking = await db
      .collection("bookings")
      .findOne({ _id: bookingId });
    const { _id } = targetBooking;
    const deleteBooking = await db
      .collection("bookings")
      .deleteOne({ _id: _id });

    if (deleteBooking.deletedCount === 1) {
      res.status(200).json({
        status: 200,
        data: deleteBooking.deletedCount,
        message: "Booking deleted successfully.",
      });
    } else {
      throw new Error("Booking not found.");
    }
  } catch (err) {
    res.status(404).json({ status: 404, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = {
  getStylists,
  getStylist,
  getBookings,
  getFaq,
  addBooking,
  getPromocode,
  updateBooking,
  deleteBooking,
};
