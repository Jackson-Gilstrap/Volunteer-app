import { Link } from "react-router-dom";
import "../styles/styles.css"
const AdminHub = () => {
  return (
    <>
      <div className="background">
        <header>
          <h1>Admin Hub</h1>
        </header>

        <div className="button-container">
          <div>
            <Link to="/AdminHub/volunteers">
              <button>Create Volunteer</button>
            </Link>
            <Link to="/AdminHub/viewworksessions">
              <button>View Work Sessions</button>
            </Link>
            <Link to="/AdminHub/viewvolunteers">
              <button>View Volunteers</button>
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

export default AdminHub;
