const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");
const bodyParser = require("body-parser");

const ejs = require("ejs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "",
});

const createTableSql =
  "CREATE TABLE IF NOT EXISTS  users(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)";
const selectAllFromTable = "SELECT * FROM users";
const insertUserData = "INSERT INTO users SET ?";

connection.connect(function (err) {
  // 接続確認
  if (err) {
    console.log("connection failed...");
    throw err;
  }
  console.log("connection succeed!");

  // DBの作成
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

  // テーブルの作成
  connection.query(createTableSql, function (err, result) {
    if (err) {
      console.log("create table failed...");
      throw err;
    }
    console.log("create table succeed!");
  });

  // 値の取得
  connection.query(selectAllFromTable, function (err, result, fields) {
    if (err) {
      console.log("select table failed...");
      throw err;
    }
    console.log("select table succeed!");
  });

  // 値の追加
  connection.query(
    insertUserData,
    { name: "taro", email: "taro@test.com" },
    function (err, result, fields) {
      if (err) {
        console.log("insert table failed...");
        throw err;
      }
      console.log("insert table succeed!");
    }
  );
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, function (err, result, fields) {
    if (err) {
      console.log("send data insert failed...");
      throw err;
    }
    res.render("index", { users: result });
  });
});

app.post("/", (req, res) => {
  const sql = "INSERT INTO users SET ?";

  connection.query(sql, req.body, function (err, result, fields) {
    if (err) {
      console.log("send data insert failed...");
      throw err;
    }
    console.log("send data insert succeed!");
    res.send("登録が完了しました。");
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
