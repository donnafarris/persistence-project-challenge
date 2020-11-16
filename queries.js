const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "class",
  password: "1967",
  port: 5432,
});

const getStudents = (request, response) => {
  pool.query("SELECT * FROM students ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getStudentById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM students WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createStudent = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO student (name) VALUES ($1)",
    [name],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Student added with ID: ${result.insertId}`);
    }
  );
};

const updateStudent = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE students SET name = $1 WHERE id = $2",
    [name, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Student modified with ID: ${id}`);
    }
  );
};

const deleteStudent = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM students WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Student deleted with ID: ${id}`);
  });
};

const searchStudents = (request, response) => {
  const name = request.query.name;
  const nameStr = `%${name.toLowerCase()}`;
  pool.query(
    "SELECT * FROM students WHERE LOWER(name) LIKE $1",
    [nameStr],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(results.rows);
    }
  );
};

const newGrade = (request, response) => {
  const { student_id, grade } = request.body;

  pool.query(
    "INSERT INTO grades (student_id, grade) VALUES ($1, $2)",
    [student_id, grade],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Grade added at: ${result.insertId}`);
    }
  );
};

const getGradesByStudent = (request, response) => {
  const id = parseInt(request.params.student_id);

  pool.query(
    "SELECT * FROM grades WHERE student_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents,
  newGrade,
  getGradesByStudent,
};
