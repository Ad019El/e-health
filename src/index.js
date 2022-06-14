import React from "react";

// import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Error from "./pages/Error";
import Login from "./pages/Auth/Login";
import Patinet from "./pages/Patient/Patient";
import Medecin from "./pages/Medecin/Medecin";
import PatientMedecineInfo from "./pages/Patient/PatientMedecineInfo";
import PrivateRoute from "./pages/Routes/Private_route";
import SignUp from "./pages/Auth/SignUp";
import Mes_patieints from "./pages/Medecin/Mes_patients";
import Calendar from "./pages/Medecin/Calendar";
import Account from "./pages/Accounts/Account";
import MesRendezVous from "./pages/Patient/Mes_rendez_vous";
import Confirmation from "./pages/Auth/Confirmation";
import Success from "./pages/Auth/Success";
import SignUpMed from "./pages/Auth/SignUpMed";
import MessageWait from "./pages/Medecin/Message_wait";
import Admin from "./pages/Admin/Admin";
import Patients from "./pages/Admin/Patients";
import Medecins from "./pages/Admin/Medecins";
import Validate from "./pages/Admin/Validate";
import Video from "./pages/meeting/Meeting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />,
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signupmed" element={<SignUpMed />} />
        <Route path="/meeting/:id" element={<Video />} />
        <Route
          path="/admin/patients"
          element={<PrivateRoute component={Admin} />}
        />
        <Route
          path="/admin/patients"
          element={<PrivateRoute component={Patients} />}
        />
        <Route
          path="/admin/medecins"
          element={<PrivateRoute component={Medecins} />}
        />
        <Route
          path="/admin/validation"
          element={<PrivateRoute component={Validate} />}
        />
        <Route
          path="/message_wait"
          element={<PrivateRoute component={MessageWait} />}
        />
        <Route
          path="/confirmation"
          element={<PrivateRoute component={Confirmation} />}
        />
        <Route
          path="/confirmation/success"
          element={<PrivateRoute component={Success} />}
        />
        <Route
          path="/InfoMed"
          element={<PrivateRoute component={PatientMedecineInfo} />}
        />
        <Route path="/patient" element={<PrivateRoute component={Patinet} />} />
        <Route
          path="/patient/mes_rendez_vous"
          element={<PrivateRoute component={MesRendezVous} />}
        />
        <Route path="/account" element={<PrivateRoute component={Account} />} />
        <Route path="/medecin" element={<PrivateRoute component={Medecin} />} />
        <Route
          path="/medecin/mes_patient"
          element={<PrivateRoute component={Mes_patieints} />}
        />
        <Route
          path="/medecin/calendar"
          element={<PrivateRoute component={Calendar} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
