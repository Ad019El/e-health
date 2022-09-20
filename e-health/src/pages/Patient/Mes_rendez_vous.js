import Navbar from "../../components/Navbar";
import { base64ToArrayBuffer, formatDate, getUserType } from "../Auth";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { Navigate } from "react-router-dom";
import Footer from "../../components/Footer";

const axios = require("axios");
const API = `https://${process.env.REACT_APP_SERVER_IP}`;

let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;

function MesRendezVous() {
  const [reservations, setreservations] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const handelMeet = (id) => {
    // console.log(e);
    window.location.assign(`/meeting/${id}`);
  };

  useEffect(() => {
    axios
      .get(
        `${API}/api/appointment/reserved/patient/${userID}`,

        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jwt")).token
            }`,
          },
        }
      )
      .then((result) => {
        setIsloading(true);

        let reservations = [];
        result.data.appointments.map((a) => {
          reservations.push({
            id: a._id,
            startDate: formatDate(new Date(a.start_date)),
            duration: a.duration,
            title: a.title,
            medecin: a.medecin,
          });
        });
        console.log(reservations);
        setreservations(reservations);
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (getUserType() !== "patient") return <Navigate to="/login" />;

  return (
    <div>
      <Navbar
        edit="hidden"
        type="patient"
        homepath="/patient"
        mesrndv="text-darker_grey"
      />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full mb-40 justify-center items-start md:text-left">
            <p className="font-medium text-3xl mb-10 text-darker_grey p-2 md:pl-10">
              Mes rendez-vous
            </p>
            <>
              {!isLoading ? (
                <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Medecin
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date de rendez-vous
                        </th>
                        <th scope="col" className="px-6 py-3">
                          La durée
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Annuler
                        </th>

                        <th scope="col" className="px-6 py-3 text-center">
                          Prendre un Rendez-vous
                        </th>
                      </tr>
                    </thead>

                    {reservations.map((r) => {
                      return (
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            >
                              {r.medecin.family_name +
                                " " +
                                r.medecin.first_name}
                            </th>
                            <td className="px-6 py-4">{r.startDate}</td>

                            <td className="px-6 py-4">{r.duration}</td>

                            {/* <button
                            className="text-black"
                            onClick={() => {
                              axios
                                .get(`${API}/api/medecin/ordonnance/${r.r.id}`)
                                .then((result) => {
                                  var arrBuffer = base64ToArrayBuffer(
                                    result.data.ordonnance
                                  );
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
                            download
                          </button> */}

                            <td className="flex px-6 py-4 place-content-center">
                              <button
                                className="px-4 py-1 text-sm text-green-400 bg-green-200 rounded-full"
                                onClick={() => {
                                  handelMeet(r.id);
                                }}
                              >
                                Meet
                              </button>
                            </td>

                            <td className="px-6 py-4 pl-24">
                              <button
                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                                onClick={() => {
                                  const userID = JSON.parse(
                                    localStorage.getItem("jwt")
                                  ).user._id;
                                  setIsloading(true);
                                  window.confirm("Annuler votre réservation ?")
                                    ? axios
                                        .post(
                                          `${API}/api/appointment/cancel/${userID}`,
                                          {
                                            appointment_id: r.id,
                                          },
                                          {
                                            headers: {
                                              Authorization: `Bearer ${
                                                JSON.parse(
                                                  localStorage.getItem("jwt")
                                                ).token
                                              }`,
                                            },
                                          }
                                        )
                                        .then((result) => {
                                          setreservations(
                                            reservations.filter(
                                              (a) => a.id !== r.id
                                            )
                                          );
                                          setIsloading(false);
                                        })
                                        .catch((err) => console.log(err))
                                    : setIsloading(false);
                                }}
                              >
                                Annuler
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              ) : (
                <div className="w-full mb-52 h-40">
                  <Spinner calendar={"calendar"} />
                </div>
              )}
            </>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MesRendezVous;
