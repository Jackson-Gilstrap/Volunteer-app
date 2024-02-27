import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const validate = (values) => {
  const errors = {};
  if (!values.volunteer_code) {
    errors.volunteer_code = "Required";
  } else if (values.volunteer_code.length < 3) {
    errors.volunteer_code = "Code should be at least 3 characters long";
  } else if (!/^[0-9]+$/.test(values.volunteer_code)) {
    errors.volunteer_code = "Code should be numbers";
  }

  return errors;
};

function VolunteerTimeOutForm({ isClockIn }) {
  const [successMessage, setSuccessMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      volunteer_code: "",
    },
    validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values.eventType = isClockIn ? "clockIn" : "clockOut";
      console.log(values);

      try {
        setSuccessMessage(`Successfully clocked out ${values.volunteer_code}`);
        resetForm();
        const response = await axios.post(
          "http://localhost:3006/api/v1/worksessions/clockout",
          values
        );
      } catch (error) {
        console.error(
          "There has been an error submitting the form",
          error.message
        );
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-container" id="volunteer_code-container">
          <label htmlFor="volunteer_code">Volunteer Code</label>
          <input
            id="volunteer_code"
            name="volunteer_code"
            placeholder="3 digit volunteer code"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.volunteer_code}
          />
          {formik.touched.volunteer_code && formik.errors.volunteer_code ? (
            <span>{formik.errors.volunteer_code}</span>
          ) : null}
        </div>
        <input
          type="hidden"
          name="eventType"
          value={isClockIn ? "clockIn" : "clockOut"}
        />
        <button type="submit" name="submit">
          {isClockIn ? "Clock in" : "Clock Out"}
        </button>
      </form>
      {successMessage && (
        <p style={{ textAlign: "center", color: "black", fontSize:"20px"}}>
          {successMessage}
        </p>
      )}
      <div className="go-back-container">
        <Link to={"/VolunteerHub"}>
          <button>Go Back</button>
        </Link>
      </div>
    </>
  );
}

export default VolunteerTimeOutForm;
