require("dotenv").config();

const express = require("express");
const cors = require("cors");
const middlewareBodySanitizer = require("./app/middlewares/bodySanitizer");
const router = require("./app/router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(middlewareBodySanitizer);

app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
