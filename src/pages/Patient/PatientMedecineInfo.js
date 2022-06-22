import Navbar from "../../components/Navbar";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import * as React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import Footer from "../../components/Footer";
import { base64ToArrayBuffer } from "../Auth";
// const schedulerData = [
//   {
//     //2022-05-25T09:45
//     // Fri May 27 2022 10:30:00 GMT+0100
//     startDate: "2022-05-25T09:45",
//     endDate: "2022-05-25T10:45",
//     title: "Meeting",
//     id: 0,
//     reserved: false,
//     notes: "asd",
//   },
//   {
//     //2022-05-25T09:45
//     // Fri May 27 2022 10:30:00 GMT+0100
//     startDate: "2022-05-26T09:45",
//     endDate: "2022-05-26T10:45",
//     title: "Meeting",
//     notes: "hi there",
//     id: 1,
//     reserved: true,
//   },
// ];
const axios = require("axios");
const API = `http://${process.env.REACT_APP_SERVER_IP}`;

let userType = "";
let userID = "";
if (JSON.parse(localStorage.getItem("jwt"))) {
  userType = JSON.parse(localStorage.getItem("jwt")).user.type;
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;
}

function PatientMedecineInfo(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [alert, setAlert] = useState("");
  const [type, setType] = useState("Success");
  const [show, setShow] = useState(true);
  const [profile, setProfile] = useState("");

  const TooltipContent = ({ appointmentData, formatDate }) => {
    return (
      <div>
        <div className="text-2xl pl-10 text-primary_800 font-bold ">{`${
          appointmentData.title || "Meeting"
        } `}</div>
        <div className="pl-10 text-sm mb-5">
          {`
        ${new Date(appointmentData.startDate).toDateString()} `}
        </div>

        <div className="pl-10 text-primary_800 mb-2">
          {`${formatDate(appointmentData.startDate, {
            hour: "numeric",
            minute: "numeric",
          })} - ${formatDate(appointmentData.endDate, {
            hour: "numeric",
            minute: "numeric",
          })}`}
        </div>

        <div className="w-full flex place-content-center">
          {appointmentData.reserved ? (
            <button
              onClick={() => {
                const userID = JSON.parse(localStorage.getItem("jwt")).user._id;

                axios
                  .post(
                    `${API}/api/appointment/cancel/${userID}`,
                    {
                      appointment_id: appointmentData.id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${
                          JSON.parse(localStorage.getItem("jwt")).token
                        }`,
                      },
                    }
                  )
                  .then((result) => {
                    appointmentData.reserved = false;
                  })
                  .catch((err) => console.log(err));
              }}
              className="my-4 px-6 h-12 transition ease-in duration-200  text-white rounded-2xl bg-red-500 hover:bg-transparent hover:text-red-500 border-2 border-red-500 focus:outline-none"
            >
              Annuler
            </button>
          ) : (
            <button
              onClick={() => {
                console.log("appointement id", appointmentData.id);
                const userID = JSON.parse(localStorage.getItem("jwt")).user._id;

                axios
                  .post(
                    `${API}/api/appointment/reserve/${userID}`,
                    {
                      appointment_id: appointmentData.id,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${
                          JSON.parse(localStorage.getItem("jwt")).token
                        }`,
                      },
                    }
                  )
                  .then((result) => {
                    appointmentData.reserved = true;
                    setType("Success");
                    setAlert(`Successfully Reserved`);
                    // console.log(result.data);
                  })
                  .catch((err) => console.log(err));
              }}
              className="my-4 px-6 h-12 transition ease-in duration-200  text-white rounded-2xl bg-[#64B5F6] hover:bg-transparent hover:text-[#64B5F6] border-2 border-[#64B5F6] focus:outline-none"
            >
              Reserve
            </button>
          )}
        </div>
      </div>
    );
  };

  const Appointment = ({ children, style, data, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      data={data}
      style={{
        ...style,
        backgroundColor: data.reserved === true ? "#808080" : "#1ABAB9",
        borderRadius: "8px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );

  console.log();
  useEffect(() => {
    axios
      .get(`${API}/api/appointment/medecin/${location.state.id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwt")).token
          }`,
        },
      })
      .then((result) => {
        setData([]);
        let data = [];
        console.log(result.data);
        result.data.reservations.map((appointment) => {
          data.push({
            id: appointment._id,
            startDate: appointment.start_date,
            endDate: appointment.end_date,
            title: appointment.title,
            reserved: appointment.reserved,
            notes: appointment.notes,
            patientID: appointment.patient_id,
          });
          setData(data);
          setLoading(false);
        });
      })
      .catch((err) => console.log(err));

    axios({
      method: "get",
      url: `${API}/api/${userType}/photo/${userID}`,
      responseType: "stream",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("jwt")).token
        }`,
      },
    })
      .then((result) => {
        // setIsloading(true);

        setProfile(result.data.image);

        // setIsloading(false);
      })
      .catch((err) => console.log("error -------", err));

    const timeId = setTimeout(() => {
      setShow(false);
    }, 7000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

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
              className="text-darker_grey hover:text-grey_light"
            >
              <ArrowLeftIcon className="h-8 w-8" />
            </button>
            <div className="flex flex-row items-center md:w-full">
              <div className="w-20 h-20 mt-10">
                <img
                  className="rounded-full"
                  src={`data:image/jpeg;base64, ${profile}`}
                  alt="profile"
                />
              </div>
              <div className="flex flex-col items-start pl-5">
                <p className="tex`t-gray-800 text-xl text-center font-medium mb-2 mt-4">
                  {location.state.name}
                </p>
                <p className="text-gray-400 text-center text-xs">
                  {location.state.specialite}
                </p>
                <div>
                  <p
                    className="underline cursor-pointer text-primary"
                    onClick={() => {
                      axios
                        .get(`${API}/api/medecin/cv/${location.state.id}`)
                        .then((result) => {
                          var arrBuffer = base64ToArrayBuffer(result.data.cv);
                          const file = new Blob([arrBuffer], {
                            type: "application/pdf",
                          });
                          const fileURL = URL.createObjectURL(file);
                          const pdfWindow = window.open();
                          pdfWindow.location.href = fileURL;
                        })
                        .catch((err) => {
                          console.log("Error: ", err);
                        });
                    }}
                  >
                    Voir CV
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full px-4 m-5 mt-10 mb-2">
              {alert ? (
                show && <Alert type={type} calendar={true} content={alert} />
              ) : (
                <></>
              )}
            </div>
            {!Loading ? (
              <div className="w-full md:p-5 pt-10">
                <Scheduler data={data}>
                  <ViewState defaultCurrentDate={new Date()} />
                  <WeekView startDayHour={8} endDayHour={19} />
                  <Toolbar />
                  <DateNavigator />
                  <TodayButton />
                  <Appointments appointmentComponent={Appointment} />
                  <AppointmentTooltip
                    showCloseButton
                    contentComponent={TooltipContent}
                  />
                </Scheduler>
              </div>
            ) : (
              <Spinner className="mb-52" calendar={"calendar"} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default PatientMedecineInfo;
