const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");
const { getGradesByStudent } = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/students", db.getStudents);
app.get("/students/:id", db.getStudentById);
app.get("/student", db.searchStudents);
app.post("/register", db.createStudent);
app.put("/students/:id", db.updateStudent);
app.delete("/students/:id", db.deleteStudent);
app.get("/grades/:student_id", db.getGradesByStudent);
app.post("/grades", db.newGrade);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
