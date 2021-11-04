const express = require("express");

const router = express.Router();

const { substraction } = require("../../calculator");

const myHtml = (number1, number2) =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>This is not a thunk</title>
  </head>
  <body>
    <h1>The calculator has calculated these values for you</h1>
    <p>Results: </p>
    <li>${number1} - ${number2} = ${substraction(number1, number2)}</li>

    <p>Bye</p>
  </body>
</html>`;

router.get("/", (req, res) => {
  const number1 = +req.query.a;
  const number2 = +req.query.b;

  if (!Number.isNaN(number1) && !Number.isNaN(number2)) {
    res.send(myHtml(number1, number2));
  } else {
    const error = new Error("Error! The values shared are not numbers.");
    error.code = 404;
    throw error;
  }
});

module.exports = router;
