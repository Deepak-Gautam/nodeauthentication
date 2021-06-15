const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const Role = db.role;
const app = express();

var corsOptions = {
  origin: "http:localhost:8081",
};
db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: " this is test application" });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
