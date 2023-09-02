"use strict";

//import essential mongoDB
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

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

module.exports = {
  getStylists,
};
