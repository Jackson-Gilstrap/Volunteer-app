import { useState, useEffect } from "react";
import WorksessionFinder from "../apis/WorksessionFinder";
import { Link } from "react-router-dom";
import {
  calculateTimePunch,
  calculateDayWorked,
  calculateTimeDifference,
  calculateTotalMilage,
} from "../utility/functions";

const ViewWorkSessions = () => {
  const [searchResult, setSearchResult] = useState("");
  const [worksessions, setWorksessions] = useState([]);

  const handleSearch = (event) => {
    setSearchResult(event.target.value);
  };
  const filterWorkSessions = () => {
    if (searchResult === "") {
      return worksessions;
    } else {
      return worksessions.filter((work_session) =>
        String(work_session.code).includes(searchResult.toLowerCase())
      );
    }
  };

  const getWorksessions = async () => {
    try {
      const response = await WorksessionFinder.get("/");
      const promises = response.data.data.results.map(
        async (worksession_obj) => {
          const {
            session_id,
            volunteer_code,
            first_name,
            last_name,
            work_location,
            work_role,
            clock_in_time,
            clock_out_time,
          } = worksession_obj;

          const worksession = {
            session_id: session_id,
            code: volunteer_code,
            name: `${first_name} ${last_name}`,
            role: work_role,
            location: work_location,
            time_in: calculateTimePunch(clock_in_time),
            time_out: calculateTimePunch(clock_out_time),
            day_worked: calculateDayWorked(clock_in_time),
            total_time: calculateTimeDifference(clock_in_time, clock_out_time),
            total_milage: calculateTotalMilage(work_location),
          };
          return worksession;
        }
      );
      const updatedWorksessions = await Promise.all(promises);
      setWorksessions(updatedWorksessions);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getWorksessions();
  }, []);

  return (
    <>
      <div className="background">
        <header>
          <h2>Volunteer Work Sessions</h2>
        </header>
        <input
          className="search"
          type="text"
          placeholder="Volunteer Code"
          onChange={handleSearch}
        />
        <table>
          <thead>
            <tr>
              <th>Session Id</th>
              <th>Code</th>
              <th>name</th>
              <th>Role</th>
              <th>Location</th>
              <th>Date Worked</th>
              <th>Total time</th>
              <th>Total milage</th>
              <th>Time in</th>
              <th>Time out</th>
            </tr>
          </thead>
          <tbody>
            {filterWorkSessions().map((worksession) => (
              <tr key={worksession.session_id}>
                <td>{worksession.session_id}</td>
                <td>{worksession.code}</td>
                <td>{worksession.name}</td>
                <td>{worksession.role}</td>
                <td>{worksession.location}</td>
                <td>{worksession.day_worked}</td>
                <td>{worksession.total_time}</td>
                <td>{worksession.total_milage}</td>
                <td>{worksession.time_in}</td>
                <td>{worksession.time_out}</td>
              </tr>
            ))}
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

export default ViewWorkSessions;
