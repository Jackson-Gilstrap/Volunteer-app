import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

//form validation
const validate = (values) => {
  const errors = {};

  if (!values.volunteer_code) {
    errors.volunteer_code = "Required";
  } else if (values.volunteer_code.length < 3) {
    errors.volunteer_code = "Code should be at least 3 characters long";
  } else if (!/^[0-9]+$/.test(values.volunteer_code)) {
    errors.volunteer_code = "Code should be numbers";
  }

  if (!values.first_name) {
    errors.first_name = "Required";
  } else if (values.first_name.length > 51) {
    errors.first_name = "less than 50 characters";
  }
  if (!values.last_name) {
    errors.last_name = "Required";
  } else if (values.last_name.length > 51) {
    errors.last_name = "less than 50 characters";
  }

  return errors;
};

//form component
const CreateVolunteerForm = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      volunteer_code: "",
      first_name: "",
      last_name: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await axios.post(
          "http://localhost:3006/api/v1/volunteers",
          values
        );
        setSuccessMessage(
          `Successfully Created Volunteer #${formik.values.volunteer_code}!`
        );
        formik.resetForm();
      } catch (error) {
        console.error(error.message);
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
            placeholder="123"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.volunteer_code}
          />
          {formik.touched.volunteer_code && formik.errors.volunteer_code ? (
            <span>{formik.errors.volunteer_code}</span>
          ) : null}
        </div>
        <div className="input-container" id="first_name-container">
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            name="first_name"
            placeholder="John"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <span>{formik.errors.first_name}</span>
          ) : null}
        </div>
        <div className="input-container" id="last_name-container">
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            placeholder="123"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <span>{formik.errors.last_name}</span>
          ) : null}
        </div>
        <button type="submit" name="submit">
          Save
        </button>
      </form>

      {successMessage && (
        <p style={{ textAlign: "center", color: "black", fontSize:"20px"}}>
          {successMessage}
        </p>
      )}
      <div className="go-back-container">
          <Link to={"/AdminHub"}>
            <button>Go Back</button>
          </Link>
        </div>
    </>
  );
};

export default CreateVolunteerForm;
