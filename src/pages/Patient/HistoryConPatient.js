import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import { base64ToArrayBuffer, formatDate, getUserType } from "../Auth";
import TableItem from "../../components/TableItem";
import { useEffect, useState } from "react";

const axios = require("axios");
const API = `http://${process.env.REACT_APP_SERVER_IP}`;

let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;

export default function HistoriqueConsultationPatient() {
  const navigate = useNavigate();
  const [reservations, setreservations] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `${API}/api/patient/history/${userID}`,

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
        result.data.history.map((a) => {
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

    return () => {
      <>h</>;
    };
  }, []);

  if (getUserType() !== "patient") return <Navigate to="/login" />;
  return (
    <div>
      <Navbar
        edit="hidden"
        type="patient"
        homepath="/patient"
        histoconsultpatient={"text-darker_grey"}
      />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full mb-40 justify-center items-start md:text-left">
            <p className="font-medium text-3xl mb-10 text-darker_grey p-2 md:pl-10">
              Mes consultation
            </p>

            <>
              {!isLoading ? (
                <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-3 py-3">
                          Nom et Prénom
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Date de rendez-vous
                        </th>
                        <th scope="col" className="px-3 py-3">
                          La durée
                        </th>
                        <th
                          scope="col"
                          className="flex px-3 py-3 place-content-center"
                        >
                          Ordonnance
                        </th>
                      </tr>
                    </thead>

                    {reservations.map((r) => {
                      console.log(r);
                      return (
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <TableItem
                              fullname={
                                r.medecin.family_name +
                                " " +
                                r.medecin.first_name
                              }
                              date={r.startDate}
                              duree={r.duration}
                            />
                            <td className="flex px-6 py-4 place-content-center">
                              <button
                                className="px-4 py-1 text-sm text-green-400 bg-green-200 rounded-full"
                                onClick={() => {
                                  // console.log(r);
                                  axios
                                    .get(
                                      `${API}/api/medecin/ordonnance/${r.id}`
                                    )
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
                                Telecharger Ordonance
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
