const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  database: "task management system",
  user: "root",
  password: "",
});

conn.query(
  "CREATE TABLE users(userid INT NOT NULL AUTO_INCREMENT, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(userid))",
  (err) => {
    if (err) console.log(err.message);
  }
);

conn.query(
  "CREATE TABLE categories(categoryid INT(4), categoryname VARCHAR(50), PRIMARY KEY(categoryid))",
  (err) => {
    if (err) console.log(err.message);
  }
);

conn.query(
  "CREATE TABLE tasks(taskid INT NOT NULL AUTO_INCREMENT, title VARCHAR(100), description TEXT, duedate DATE, userid INT, categoryid INT(4), PRIMARY KEY(taskid), FOREIGN KEY(userid) REFERENCES users(userid), FOREIGN KEY(categoryid) REFERENCES categories(categoryid) )",
  (err) => {
    if (err) console.log(err.message);
  }
);
// seeding the database
conn.query(
  "INSERT INTO users(username,email,password) VALUES('Albert','albert@eldohub.co.ke', 'password123'), ('Lindsay', 'lindsayamati@gmail.com','1995december'), ('Victor', 'vickruzz@gmail.com', 'jhjshdbshbfhs')",
  (err) => {
    if (err) console.log(err.message);
  }
);

conn.query(
  "INSERT INTO categories(categoryid, categoryname) VALUES (111, 'Work'), (222, 'Personal'),(333, 'Shopping')",
  (err) => {
    if (err) console.log(err.message);
  }
);

conn.query(
  "INSERT INTO Tasks ( Title, Description, DueDate, UserID, CategoryID) VALUES  ( 'Project Meeting', 'Discuss project progress', '2023-12-01', 1, 111),  ('Grocery Shopping', 'Buy groceries for the week', '2023-11-20', 2, 333), ('Task Management', 'Implement task management UI', '2023-12-05', 3, 111), ('Dentist Appointment', 'Schedule a dentist appointment', '2023-11-25', 1, 222)",
  (err) => {
    if (err) console.log(err.message);
  }
);
