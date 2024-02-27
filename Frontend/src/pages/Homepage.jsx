import { Link } from "react-router-dom";
import "../styles/styles.css"
const Homepage = () => {
  return (
    <>
      <div className="background">
        <header>
          <h1>Volunteer Hub</h1>
        </header>
        <div className="button-container">
          <Link to="/VolunteerHub">
            <button>Volunteers</button>
          </Link>
          <Link to="/AdminHub">
            <button>Site Cordinators</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homepage;
