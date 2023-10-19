const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cls21214",
  database: "express_db",
});

connection.connect(function (err) {
  const createTableSql =
    "CREATE TABLE IF NOT EXISTS  users(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)";
  if (err) {
    console.log("connection failed...");
    throw err;
  }
  console.log("connection succeed!");

  connection.query(
    "CREATE DATABASE IF NOT EXISTS express_db",
    function (err, result) {
      if (err) {
        console.log("create failed...");
        throw err;
      }
      console.log("create succeed!");
    }
  );

  connection.query(createTableSql, function (err, result) {
    if (err) {
      console.log("create table failed...");
      throw err;
    }
    console.log("create table succeed!");
  });
});

app.get("/", (req, res) => res.send("Hello World"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
