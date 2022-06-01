import { ArrowLeftIcon } from "@heroicons/react/solid";
import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getUserType } from "../Auth";
import CalendarComp from "./Calendar_comp";

function Calendar() {
  const navigate = useNavigate();

  if (getUserType() !== "medecin") return <Navigate to="/login" />;

  return (
    <>
      <Navbar
        edit="hidden"
        type="medecin"
        homepath="/medecin"
        calendar={"text-darker_grey"}
      />
      <div className="lg:p-10 lg:px-32 p-5 pt-18">
        <div className="container px-3 mb-5 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-start md:text-left">
            <div className="flex flex-row items-stretch">
              <button
                onClick={() => {
                  navigate("/medecin");
                }}
                type="button"
                className="text-darker_grey hover:text-grey_light"
              >
                <ArrowLeftIcon className="h-8 w-8" />
              </button>
              <p className="font-medium text-3xl mt-10 mb-10 self-center text-darker_grey p-2 md:pl-10">
                Agenda
              </p>
            </div>
            <div className="w-full md:p-5 pt-10 z-0">
              <CalendarComp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calendar;
