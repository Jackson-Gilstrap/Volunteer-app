import { useState, useEffect, useContext } from "react";
import VolunteersFinder from "../apis/VolunteersFinder";
import { VolunteersContext } from "../context/VolunteersContext";
import { Link } from "react-router-dom";

const ViewVolunteers = (props) => {
  const { volunteers, setVolunteers } = useContext(VolunteersContext);
  useEffect(() => {
    const getVolunteers = async () => {
      try {
        const response = await VolunteersFinder.get("/");
        const promises = response.data.data.volunteers.map(
          async (volunteer_obj) => {
            const {
              volunteer_code,
              first_name,
              last_name,
              times_volunteered,
              is_admin,
            } = volunteer_obj;
            const volunteer = {
              volunteer_code: volunteer_code,
              first_name: first_name,
              last_name: last_name,
              times_volunteered: times_volunteered,
              is_admin: is_admin.toString().toUpperCase(),
            };
            return volunteer;
          }
        );
        const updatedVolunteerList = await Promise.all(promises);
        console.log(response.data);
        setVolunteers(updatedVolunteerList);
      } catch (error) {
        console.error(error.message);
      }
    };
    getVolunteers();
  }, []);
  return (
    <>
      <div className="background">
        <header>
          <h2>View Volunteers</h2>
        </header>
        <table>
          <thead>
            <tr>
              <th>Volunteer Code</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Times Volunteered</th>
              <th>Admin Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => {
              return (
                <tr key={volunteer.volunteer_code}>
                  <td>{volunteer.volunteer_code}</td>
                  <td>{volunteer.first_name}</td>
                  <td>{volunteer.last_name}</td>
                  <td>{volunteer.times_volunteered}</td>
                  <td>{volunteer.is_admin}</td>
                  <td>
                    <button>Update</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="go-back-container">
          <Link to={"/AdminHub"}>
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ViewVolunteers;
