const mongoose = require("mongoose");

const key = process.env["dbKey"];
const project = process.env["project"];
const name = process.env["dbName"];

function initializeDBConnection() {
  mongoose
    .connect(
      `
mongodb+srv://${name}:${key}@cluster0.0vdny.mongodb.net/${project}?retryWrites=true&w=majority
`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )

    .then(() => console.log("successfully connected"))
    .catch((error) => console.error("mongoose connection failed...", error));
}

module.exports = { initializeDBConnection };
