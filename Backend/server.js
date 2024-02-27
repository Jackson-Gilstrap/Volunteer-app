require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db/index.js");
const app = express();
const { getCurrentDate, getCurrentTime } = require("./utility/datetime.js");

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//ROUTES

//GET A ALL VOLUNTEERS
app.get("/api/v1/volunteers", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM volunteers");

    console.log(results.rows);
    const volunteers = results.rows.map((row) => {
      // Convert boolean value to string

      return {
        ...row,
        is_admin: row.is_admin.toString(),
      };
    });
    console.log(volunteers);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        volunteers: results.rows,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
});
//GET A VOLUNTEER
app.get("/api/v1/volunteers/:volunteer_code", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM volunteers WHERE volunteer_code = ($1)",
      [req.params.volunteer_code]
    );
    res.status(200).json({
      status: "success",
      data: {
        volunteer: results.rows[0],
      },
    });
    console.log(results);
  } catch (err) {
    console.error(err.message);
  }
});

//CREATE VOLUNTEER
app.post("/api/v1/volunteers", async (req, res) => {
  const { volunteer_code, first_name, last_name } = req.body;
  try {
    const results = await db.query(
      "INSERT INTO volunteers (volunteer_code, first_name, last_name) VALUES($1,$2,$3) RETURNING *",
      [volunteer_code, first_name, last_name]
    );
    res.status(201).json({
      status: "success",
      data: {
        results: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE VOLUNTEER
app.put("/api/v1/volunteers/:volunteer_code", async (req, res) => {
  console.log(req.params);
  const { first_name, last_name } = req.body;
  try {
    const results = await db.query(
      "UPDATE volunteers SET first_name = ($2), last_name = ($3) WHERE volunteer_code = ($1) RETURNING *",
      [req.params.volunteer_code, first_name, last_name]
    );
    res.status(201).json({
      status: "success",
      results: results.rows[0],
    });
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE VOLUNTEER
app.delete("/api/v1/volunteers/:volunteer_code", async (req, res) => {
  const results = await db.query(
    "DELETE FROM volunteers WHERE volunteer_code = ($1)",
    [req.params.volunteer_code]
  );
  res.status(204).json({
    status: "success",
  });
});

//GET ALL WORKSESSIONS

app.get("/api/v1/worksessions", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM volunteers JOIN worksessions on volunteers.volunteer_code = worksessions.volunteer_code"
    );

    res.status(200).json({
      status: "success",
      data: {
        results: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//CREATE A WORKSESSION

app.post("/api/v1/worksessions/clockin", async (req, res) => {
    try {
      console.log("successfully connected api");
      const { volunteer_code, work_location, work_role } = req.body;
      const date = getCurrentDate();
      const time = getCurrentTime();
      const date_time_string = `${date}` + " " + `${time}`;
      console.log("pre query");
      //INSERT QUERY TO ADD THE CLOCK IN TIME TO THE DATABASE THE ONLY COLUMN OMITTED IS CLOCK_OUT_TIME
      const volunteer_clock_in = await db.query(
        "INSERT INTO worksessions (volunteer_code, work_location, work_role, clock_in_time) VALUES($1,$2,$3,$4) RETURNING *",
        [volunteer_code, work_location, work_role, date_time_string]
      );
      console.log("post query successfully clocked in");
    } catch (error) {
      console.error("connection to api failed ", error);
    }
  });
  
  app.post("/api/v1/worksessions/clockout", async (req, res) => {
    try {
      const { volunteer_code } = req.body;
      const date = getCurrentDate();
      const time = getCurrentTime();
      const date_time_string = `${date}` + " " + `${time}`;
      // an UPDATE QUERY TO ADD THE CLOCK OUT TIME TO THE SPECIFIC CLOCK IN TIME BASED ON VOLUNTEER CODE
      const volunteer_clock_out = await db.query(
        `UPDATE worksessions SET clock_out_time = ($1) WHERE volunteer_code = ($2) AND clock_out_time IS NULL`,
        [date_time_string, volunteer_code]
      );
      console.log("post query successfully clocked out");
    } catch (error) {
      console.error("connection to api failed ", error);
    }
  });
  

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server has started on port ${port}`));
