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
    console.log(stylistsArray);
    // const stylistsNames = stylistsArray.map((stylists) => stylists.name);
    // const stylistsSet = Array.from(new Set(stylistsNames));

    res.status(200).json({ status: 200, data: stylistsArray });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

// returns selected Stylist's information
const getStylist = async (req, res) => {
  console.log("getStylist", req.params.stylistId);

  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("booking-site");
    const stylistId = req.params.stylistId;
    console.log(stylistId);

    const StylistInfo = await db
      .collection("stylists")
      .findOne({ _id: stylistId });
    if (StylistInfo) {
      res.status(200).json({ status: 200, data: StylistInfo });
    } else {
      res.status(404).json({ status: 404, message: "Stylist not found" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  } finally {
    client.close();
  }
};

// add a new booking
const addBooking = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { stylistId, date, timeSlot, firstName, lastName, phoneNumber, email } =
    req.body;
  const noMissingData = stylistId && date && timeSlot ? true : false;

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

module.exports = {
  getStylists,
  getStylist,
  addBooking,
};
