import Navbar from "../../components/Navbar";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import profile from "../../assets/profile.png";

import * as React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  EditRecurrenceMenu,
  ConfirmationDialog,
  AppointmentTooltip,
  AppointmentForm,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useNavigate } from "react-router-dom";

const currentDate = "2022-05-13";
const schedulerData = [
  {
    startDate: "2022-05-13T09:45",
    endDate: "2022-05-13T11:00",
    title: "Meeting",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
  },
];

function PatientMedecineInfo() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar edit="hidden" type="patient" homepath="/patient" />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-5 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-start md:text-left">
            <button
              onClick={() => {
                navigate("/patient");
              }}
              type="button"
              class="text-darker_grey hover:text-grey_light"
            >
              <ArrowLeftIcon className="h-8 w-8" />
            </button>
            <div className="flex flex-row items-center">
              <div class="w-20 h-20 mt-10">
                <img className="rounded-full" src={profile} alt="profile" />
              </div>
              <div className="flex flex-col items-start pl-5">
                <p class="text-gray-800 text-xl text-center font-medium mb-2 mt-4">
                  Dr Michel FROMENT
                </p>
                <p class="text-gray-400 text-center text-xs">
                  Médecin Généraliste
                </p>
              </div>
            </div>
            <div className="w-full md:p-5 pt-10">
              <Scheduler data={schedulerData}>
                <ViewState defaultCurrentDate="2022-05-13" />
                <WeekView startDayHour={9} endDayHour={19} />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                {/* <EditRecurrenceMenu /> */}
                {/* <ConfirmationDialog /> */}
                <Appointments />
                <AppointmentTooltip
                  headerComponent={() => (
                    <div className="w-full flex place-content-center">
                      <button className="my-4 px-6 h-12 transition ease-in duration-200  text-white rounded-2xl bg-[#64B5F6] hover:bg-transparent hover:text-[#64B5F6] border-2 border-[#64B5F6] focus:outline-none">
                        Reserve
                      </button>
                    </div>
                  )}
                />
              </Scheduler>
            </div>
            <p class="text-gray-800 text-xl text-center font-medium mb-2 mt-8">
              Profil du particien
            </p>
            /// profile
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientMedecineInfo;
