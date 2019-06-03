var express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./models");
const router = require('./routes/router');

db.sequelize.sync({force: false});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist/bench-strength")));
}

app.use(router(db));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/bench-strength/index.html"));
});



app.listen(PORT, function() {
    console.log(`App listening on Port ${PORT}`);
});
