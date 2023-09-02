"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const { getStylists } = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  // get all stylists
  .get("/get-stylists", getStylists)

  //catch-all endpoint
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));