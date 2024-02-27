import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AdminHub from "./pages/AdminHub";
import VolunteerHub from "./pages/VolunteerHub";
import CreateVolunteerForm from "./components/CreateVolunteerForm";
import ViewWorkSessions from "./pages/ViewWorkSessions";
import ViewVolunteers from "./pages/ViewVolunteers";
import VolunteerTimeInForm from "./components/VolunteerClockIn";
import VolunteerTimeOutForm from "./components/VolunteerClockOut";
import { VolunteerContextProvider } from "./context/VolunteersContext";

const App = () => {
  return (
    <VolunteerContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" Component={Homepage} />
            <Route exact path="/adminhub" Component={AdminHub} />
            <Route
              exact
              path="/adminhub/volunteers"
              Component={CreateVolunteerForm}
            />
            <Route
              exact
              path="/adminhub/viewworksessions"
              Component={ViewWorkSessions}
            />
            <Route
              exact
              path="/adminhub/viewvolunteers"
              Component={ViewVolunteers}
            />
            <Route exact path="/volunteerhub" Component={VolunteerHub} />
            <Route
              exact
              path="/volunteerhub/clockin"
              element={<VolunteerTimeInForm isClockIn={true}/>}
            />
            <Route
              exact
              path="/volunteerhub/clockout"
              element={<VolunteerTimeOutForm isClockIn={false}/>}
            />
          </Routes>
        </Router>
      </div>
    </VolunteerContextProvider>
  );
};

export default App;
