import { Link } from "react-router-dom";
import "../styles/styles.css";
const VolunteerHub = () => {
  return (
    <>
      <div className="background">
        <header>
          <h1>Volunteer Hub</h1>
        </header>
        <div className="button-container">
          <div>
            <Link to="/VolunteerHub/ClockIn">
              <button>Clock In</button>
            </Link>
            <Link to="/VolunteerHub/ClockOut">
              <button>Clock Out</button>
            </Link>
          </div>
        </div>
        <div className="go-back-container">
          <Link to={"/"}>
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VolunteerHub;
