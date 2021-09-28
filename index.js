const express = require("express");
const { connect } = require("mongoose");
const consola = require("consola");
consola.success("Built!");
consola.info("Reporter: Some info");
consola.error(new Error("Foo"));
const { DB, PORT } = require("./api/config");
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  success({
    message: `Welcome to Large File Processor`,
    badge: true,
  });
  res.send({ message: "Welcome to Large File Processor", status: 200 });
});

app.use("/api/products", require("./api/routes/Products/products"));

const startApp = async () => {
  try {
    await connect(DB, {
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true,
    });

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server  on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: false,
    });
    startApp();
  }
};

startApp();
