import { useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LeadingPage from "./pages/Leading_pages/Leading_patient.js";

function App() {
  const [active, setActive] = useState("patient");

  return (
    <div className="App">
      <div className="bg-[#343443] text-right p-1">
        <a
          className="pr-2 cursor-pointer text-white active:bg-slate-400 group- hover:bg-slate-400 hover:p-1.5 hover:pr-2"
          onClick={() => {
            setActive("praticient");
          }}
        >
          Vous êtes praticient
        </a>
        <a
          className="pl-2 cursor-pointer pr-5 text-white active:bg-slate-400 hover:bg-slate-400 hover:p-1.5 hover:pr-5 hover:pl-2"
          onClick={() => {
            setActive("patient");
          }}
        >
          Vous êtes patient
        </a>
      </div>
      <Navbar />
      {active === "patient" && <LeadingPage />}
      {active === "praticient" && <h1>hi there</h1>}
      <Footer />
    </div>
  );
}

export default App;
