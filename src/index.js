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
import Account from "./pages/Account";
import MesRendezVous from "./pages/Patient/Mes_rendez_vous";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />,
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/infoMed"
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
