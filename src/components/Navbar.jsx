import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_esante.png";
import Dropdown from "./Dropdown";
import { signout } from "../pages/Auth/index";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";

export default function Navbar(props) {
  let navigate = useNavigate();
  var user = "";
  if (localStorage.getItem("jwt")) {
    user = JSON.parse(localStorage.getItem("jwt"));
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white sticky shadow-sm top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex ">
              <img
                onClick={() => navigate(props.homepath)}
                className="h-14 cursor-pointer"
                src={logo}
                alt="logo"
              />
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* patient */}
                {props.type === "patient" && (
                  <button
                    onClick={() => {
                      navigate("/patient");
                    }}
                    className={`px-3 text-grey_light hover:text-darker_grey font-bold ${props.consultation}`}
                  >
                    Consultation
                  </button>
                )}
                {props.type === "patient" && (
                  <button
                    onClick={() => {
                      navigate("/patient/mes_rendez_vous");
                    }}
                    className={`px-3 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold ${props.mesrndv}`}
                  >
                    Mes rendez-vous
                  </button>
                )}

                {/* medecin */}
                {props.type === "medecin" && (
                  <button
                    onClick={() => {
                      navigate("/medecin/mes_patient");
                    }}
                    className={`px-3 text-grey_light hover:text-darker_grey  font-bold ${props.mespatient}`}
                  >
                    Mes patient
                  </button>
                )}
                {props.type === "medecin" && (
                  <button
                    onClick={() => {
                      navigate("/medecin/calendar");
                    }}
                    className={`px-3 text-grey_light hover:text-darker_grey  font-bold ${props.calendar}`}
                  >
                    Calendrier
                  </button>
                )}
                {props.type === "medecin" && (
                  <button className="px-3 text-grey_light hover:text-darker_grey  font-bold">
                    Historique des consultations
                  </button>
                )}
                {props.type === "medecin" && (
                  <button className="px-3 text-grey_light hover:text-darker_grey  font-bold">
                    Imagerie
                  </button>
                )}

                {/* admin */}
                {props.type === "admin" && (
                  <>
                    <button
                      onClick={() => {
                        navigate("/admin/patients");
                      }}
                      className={`px-3 text-grey_light hover:text-darker_grey  font-bold ${props.patients}`}
                    >
                      Patients
                    </button>
                    <button
                      onClick={() => {
                        navigate("/admin/medecins");
                      }}
                      className={`px-3 text-grey_light hover:text-darker_grey  font-bold ${props.medecins}`}
                    >
                      Medecins
                    </button>
                    <button
                      onClick={() => {
                        navigate("/admin/validation");
                      }}
                      className={`px-3 text-grey_light hover:text-darker_grey  font-bold ${props.validate}`}
                    >
                      Valider medecin
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="-m-2 hidden md:block">
            {props.type === "patient" && (
              <div className="flex flex-row">
                <div>
                  <p className="font-extrabold text-darker_grey ">Bonjour,</p>
                  <p className="font-medium text-grey_light">
                    {user.user.first_name.split(" ")[0]}
                  </p>
                </div>
                <Dropdown />
              </div>
            )}
            {props.type === "medecin" && (
              <div className="flex flex-row">
                <div>
                  <p className="font-extrabold text-darker_grey ">Bonjour,</p>
                  <p className="font-medium text-grey_light">
                    {user.user.first_name.split(" ")[0]}
                  </p>
                </div>
                <Dropdown />
              </div>
            )}
            {props.type === "admin" && (
              <div className="flex flex-row">
                <div>
                  <p className="font-extrabold text-darker_grey ">Bonjour,</p>
                  <p className="font-medium text-grey_light">Admin</p>
                </div>
                <Dropdown />
              </div>
            )}
          </div>

          <div className={`-mr-2 flex md:hidden ${props.landing_phone_hide}`}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-primary inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            className={` ${props.edit} px-6 h-12 transition ease-in duration-200  text-primary rounded-2xl hover:bg-primary hover:text-white border-2 border-primary focus:outline-none`}
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            Connexion
          </button>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* mobile itemes */}
              {props.type === "patient" && (
                <button
                  onClick={() => {
                    navigate("/patient");

                  }}
                  className="px-3 mt-5 block p-2 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold"
                >
                  Consultation
                </button>
              )}

              {props.type === "patient" && (
                <button className="px-3 mt-5 pb-4 p-2 block text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                  Historique des consultation
                </button>
              )}

              {/* medecin */}
              {props.type === "medecin" && (
                <button
                  onClick={() => {
                    navigate("/medecin/mes_patient");
                  }}
                  className={`px-3 mt-5 block p-2 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold ${props.mespatient}`}
                >
                  Mes patient
                </button>
              )}
              {props.type === "medecin" && (
                <button
                  onClick={() => {
                    navigate("/medecin/calendar");
                  }}
                  className={`px-3 mt-5 block p-2 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold ${props.calendar}`}
                >
                  Calendrier
                </button>
              )}
              {props.type === "medecin" && (
                <button className="px-3 mt-5 block p-2 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                  Historique des consultations
                </button>
              )}
              {props.type === "medecin" && (
                <button className="px-3 mt-5 pb-4 p-2 block text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                  Imagerie
                </button>
              )}

              {props.type === "admin" && (
                <>
                  <button
                    onClick={() => {
                      navigate("/admin/patients");
                    }}
                    className={`px-3 text-grey_light block hover:text-darker_grey  font-bold ${props.patients}`}
                  >
                    Patients
                  </button>
                  <button
                    onClick={() => {
                      navigate("/admin/medecins");
                    }}
                    className={`px-3 text-grey_light block hover:text-darker_grey  font-bold ${props.medecins}`}
                  >
                    Medecins
                  </button>
                  <button
                    onClick={() => {
                      navigate("/admin/validation");
                    }}
                    className={`px-3 text-grey_light block hover:text-darker_grey font-bold ${props.validate}`}
                  >
                    Valider medecin
                  </button>
                </>
              )}
              {(props.type === "admin" ||
                props.type === "mededin" ||
                props.type === "patient") && (
                <>
                  <button
                    onClick={() => {
                      navigate("/account");
                    }}
                    className="bg-primary text-white group flex w-full items-center rounded-md px-2 py-2 text-sm"
                  >
                    Account
                  </button>
                  <button
                    onClick={signout}
                    className={`bg-red-500 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Log Out
                  </button>
                </>
              )}
              {}
            </div>
          </div>
        }
      </Transition>
    </nav>
  );
}
