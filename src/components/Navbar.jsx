import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_esante.png";
import Dropdown from "./Dropdown";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";

export default function Navbar(props) {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white sticky shadow-sm top-0 z-50">
      {/* <div className="mx-auto p-4 lg:px-16 px-5 flex flex-row bg-white sticky top-0 z-50">
        <img className="h-14" src={logo} alt="logo" />

        {props.patient === "patient" && <button className="pl-10 px-3 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">Consultation</button>}
        {props.patient === "patient" && <button className="px-3 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">Documents</button>}
        {props.patient === "patient" && <button className="px-3 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">Historique des consultation</button>}

        <div className="grow"></div>
        {props.patient === "patient" && <Dropdown/>}
        <button className={` ${props.edit}  px-6 h-12 transition ease-in duration-200  text-primary rounded-2xl hover:bg-primary hover:text-white border-2 border-primary focus:outline-none`} 
        onClick={()=>{navigate('/login',{replace: true})}}>
          Connexion
        </button>
        
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex ">
              <img className="h-14" src={logo} alt="logo" />
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {props.patient === "patient" && (
                  <button className="px-3 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                    Consultation
                  </button>
                )}
                {props.patient === "patient" && (
                  <button className="px-3 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                    Documents
                  </button>
                )}
                {props.patient === "patient" && (
                  <button className="px-3 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                    Historique des consultation
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="-m-2 hidden md:block">
            {props.patient === "patient" && (
              <div className="flex flex-row">
                <div>
                  <p className="font-extrabold text-darker_grey ">Bonjour,</p>
                  <p className="font-medium text-grey_light">Adel Dafi</p>
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
              {props.patient === "patient" && (
                <button className="px-3 mt-5 block p-2 text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                  Consultation
                </button>
              )}
              {props.patient === "patient" && (
                <button className="px-3 mb-10 p-2 block text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                  Documents
                </button>
              )}
              {props.patient === "patient" && (
                <button className="px-3 mt-5 pb-4 p-2 block text-grey_light hover:text-darker_grey focus:text-darker_grey font-bold">
                  Historique des consultation
                </button>
              )}
              {
                <button className="bg-primary text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">
                  Account
                </button>
              }
              {
                <button
                  className={`bg-red-500 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Log Out
                </button>
              }
            </div>
          </div>
        }
      </Transition>
    </nav>
  );
}
