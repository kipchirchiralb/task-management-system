const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  database: "task management system",
  user: "root",
  password: "",
});
const app = express(); /// creating our server application that can liste to http requests and send back responses
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true })); // middleware -- a function that is execute before any route in our app
app.use(express.static("public")) // look for static files eg images, csss, fonts in the public folder

// authentication middlware
app.get("/", (req, res) => {
  // get all tasks
  conn.query(
    "SELECT * FROM tasks JOIN users ON tasks.userid=users.userid",
    (err, tasks) => {
      if (err) {
        res.render("error", { errMessage: "A problem occured!!" });
      } else {
        conn.query("SELECT * FROM categories", (catError, catData) => {
          if (catError)
            return res.render("error", { errMessage: "A problem occured!!" });
          conn.query("SELECT * FROM users", (usersErr, usersData) => {
            if (usersErr)
              return res.render("error", { errMessage: "A problem occured!!" });

            res.render("index", {
              tasks: tasks,
              categories: catData,
              users: usersData,
            });
          });
        });
      }
    }
  );
});

app.get("/user", (req, res) => {
  conn.query(
    `SELECT * FROM users WHERE userid = ${req.query.id}`,
    (err, data) => {
      if (err) {
        res.render("error", { errMessage: "A problem occured!!" });
      } else {
        // console.log(data);
        res.render("profile", { profile: data[0] });
      }
    }
  );
});

app.post("/new-task", (req, res) => {
  const newTask = req.body;
  console.log(newTask);
  conn.query(
    "INSERT INTO tasks(title,description,duedate,userid,categoryid) VALUES(?,?,?,?,?)",
    [
      newTask.title,
      newTask.description,
      newTask.dueDate,
      newTask.user,
      newTask.category,
    ],
    (err) => {
      //check if there is an error
      if (err) {
        console.log(err);
        res.render("error", { errMessage: "A problem occured!! hereeee" });
      } else {
        res.redirect("/"); // go back to the root(/) route which will fetch all tasks including the newly added task
      }
    }
  );
});

app.get("/update", (req, res) => {
  const title = req.query.title;
  const description = req.query.description;
  const id = req.query.id;
  conn.query("SELECT * FROM categories", (catError, catData) => {
    if (catError)
      return res.render("error", { errMessage: "A problem occured!!" });
    conn.query("SELECT * FROM users", (usersErr, usersData) => {
      if (usersErr)
        return res.render("error", { errMessage: "A problem occured!!" });
      res.render("updatetask", {
        title: title,
        description: description,
        id: id,
        categories: catData,
        users: usersData,
      });
    });
  });
});
app.post("/update-task", (req, res) => {
  const newTask = req.body;
  console.log(newTask);
  conn.query(
    "UPDATE tasks SET title = ? ,description= ?,duedate=?,userid=?,categoryid=? WHERE taskid = ?",
    [
      newTask.title,
      newTask.description,
      newTask.dueDate,
      newTask.user,
      newTask.category,
      req.query.id,
    ],
    (err) => {
      //check if there is an error
      if (err) {
        console.log(err);
        res.render("error", { errMessage: "A problem occured!! hereeee" });
      } else {
        res.redirect("/"); // go back to the root(/) route which will fetch all tasks including the newly added task
      }
    }
  );
});

app.listen(3000);
