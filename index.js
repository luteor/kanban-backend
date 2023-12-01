require("dotenv").config();

const express = require("express");

const router = require("./app/router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
