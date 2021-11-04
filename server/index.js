const chalk = require("chalk");
const debug = require("debug")("pets:server");
const express = require("express");
const morgan = require("morgan");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.magenta(`Escuchando en el puerto ${port}`));
  });
  server.on("error", (error) => {
    debug(chalk.red("Ha habido un error al iniciar el servidor :( ."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.blue(`El puerto ${port} está ocupado.`));
    }
  });
};

app.use(morgan("dev"));
app.use("/add", XXXX);
app.use("/substract", YYYY);
app.use("/multiply", ZZZZ);
app.use("/division", WWWW);

module.exports = initializeServer;