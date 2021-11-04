require("dotenv").config();
const http = require("http");

const { program } = require("commander");

const {
  addition,
  substraction,
  multiplication,
  division,
} = require("./calculator");

const server = http.createServer();

program.option("-p, --port <port>");
program.parse(process.argv);

let port;
if (program.opts().port && !Number.isNaN(program.opts().port)) {
  port = program.opts().port;
} else {
  port = process.env.SERVER_PORT_ERO || 5000;
}

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
    <li>${number1} + ${number2} = ${addition(number1, number2)}</li>
    <li>${number1} - ${number2} = ${substraction(number1, number2)}</li>
    <li>${number1} * ${number2} = ${multiplication(number1, number2)}</li>
    <li>${number1} / ${number2} = ${division(number1, number2)}</li>

    <p>Bye</p>
  </body>
</html>`;

const notMyHtml = () =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>This is not a thunk</title>
  </head>
  <body>
  <h1>Mario, you've broken my server down with your wrong inputs.</h1>
  
  <p>(error404)</p>
  <p>Bye</p>
  </body>
</html>
  `;

const errorHtml = () =>
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>This is not a thunk</title>
  </head>
  <body>
  <h1>Congrats! You've broken my server down completely.</h1>
  <h2>This is ERROR 404</h2>
  
  <p>Bye</p>
  </body>
</html>
  `;

server.listen(port, () => {
  console.log(`Escuchando en el puerto ${port}`);
});

server.on("request", (request, response) => {
  const myUrl = new URL(request.url, `http://${request.headers.host}`);
  if (myUrl.pathname === "/calculator") {
    const myUrlValues = myUrl.searchParams.values();
    const userValues = [];
    for (const value of myUrlValues) {
      userValues.push(+value);
    }

    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    if (!Number.isNaN(+userValues[0]) && !Number.isNaN(+userValues[1])) {
      response.write(myHtml(userValues[0], userValues[1]));
    } else {
      response.write(notMyHtml());
    }
  } else {
    response.statusCode = 404;
    response.write(errorHtml());
  }
  response.end();
});
