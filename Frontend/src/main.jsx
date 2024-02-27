import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import VolunteerHub from "./pages/VolunteerHub";
import AdminHub from "./pages/AdminHub";
import CreateVolunteerForm from "./components/CreateVolunteerForm";
import VolunteerTimeInForm from "./components/VolunteerClockIn";
import VolunteerTimeOutForm from "./components/VolunteerClockOut";
import ViewWorkSessions from "./pages/ViewWorkSessions";
import ViewVolunteers from "./pages/ViewVolunteers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/VolunteerHub",
        element: <VolunteerHub/>,
    },
    {
        path: "/VolunteerHub/ClockIn",
        element: <VolunteerTimeInForm isClockIn={true}/>,
    },
    {
        path: "/VolunteerHub/ClockOut",
        element: <VolunteerTimeInForm isClockIn={false}/>,
    },
    {
        path: "/AdminHub",
        element: <AdminHub/>,
    },
    {
        path: "/AdminHub/volunteers",
        element: <CreateVolunteerForm/>,
    },
    {
        path: "/AdminHub/worksessions",
        element: <ViewWorkSessions/>,
    },
    {
        path: "/AdminHub/viewVolunteers",
        element: <ViewVolunteers/>,
    },

])


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <RouterProvider router={router}/> */}
        <App/>
    </React.StrictMode>
)