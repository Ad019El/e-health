/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LeadingPage from "./pages/Leading_pages/Leading_patient.js";
import LeadingPraticient from "./pages/Leading_pages/Leading_praticient";

function App() {
  const [type, setType] = useState("patient");

  return (
    <div className="App">
      <nav className="bg-darker_grey text-right p-1">
        <a
          className={`${type === "praticient" && "bg-slate-400 p-1.5 pr-2"}
          pr-2 cursor-pointer text-white hover:bg-slate-400 hover:p-1.5 hover:pr-2`}
          onClick={() => {
            setType("praticient");
          }}
        >
          Vous êtes praticient
        </a>
        <a
          className={`${
            type === "patient" && "bg-slate-400 p-1.5 pr-2"
          } pl-2 cursor-pointer pr-5 text-white hover:bg-slate-400 hover:p-1.5 hover:pr-5 hover:pl-2`}
          onClick={() => {
            setType("patient");
          }}
        >
          Vous êtes patient
        </a>
      </nav>
      <Navbar landing_phone_hide="invisible" />
      {type === "patient" && <LeadingPage />}
      {type === "praticient" && <LeadingPraticient />}
    </div>
  );
}

export default App;
