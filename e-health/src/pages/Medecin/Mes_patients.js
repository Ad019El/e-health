import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TableItem from "../../components/TableItem";
import { formatDate, getUserType } from "../Auth";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

const axios = require("axios");
const API = `https://${process.env.REACT_APP_SERVER_IP}`;

let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;

function Mes_patieints() {
  const [reservations, setreservations] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [popup, setPopup] = useState("");
  const navigate = useNavigate();

  const handelMeet = (id) => {
    // console.log(e);
    window.location.assign(`/meeting/${id}`);
  };

  useEffect(() => {
    axios
      .get(`${API}/api/appointment/reserved/${userID}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwt")).token
          }`,
        },
      })
      .then((result) => {
        setIsloading(true);

        let reservations = [];
        result.data.appointments.map((a) => {
          reservations.push({
            id: a._id,
            startDate: formatDate(new Date(a.start_date)),
            duration: a.duration,
            title: a.title,
            patient: a.patient,
          });
        });
        // console.log(reservations);
        setreservations(reservations);
        setIsloading(false);
      })
      .catch((err) => console.log(err));

    return () => {
      <>h</>;
    };
  }, []);

  const modal = (d) => {
    setPopup(
      <>
        <div className="justify-center items-center fixed flex overflow-x-hidden overflow-y-auto md:overflow top-14 inset-0 z-50 outline-none focus:outline-none ">
          <div className="relative w-auto my-6 mx-auto max-w-3xl ">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Dossier médical</h3>
                <button
                  className="p-1 ml-auto  border-0 text-black opacity-4 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-black  h-6 w-6 text-2xl block focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative md:min-h-full md:flex md:justify-center p-6 flex-auto md:max-h-96">
                <div className="my-4 text-slate-500 text-lg mr-4 leading-relaxed border-r-2 border-gray-300">
                  <div className="grid grid-cols-2 gap-1 w-56">
                    <p className=" col-span-2 text-primary underline mb-2">
                      Information personnelle:
                    </p>
                    <div>
                      <p className="text-sm text-darker_grey">Nom:</p>
                      <p className="text-sm">
                        {d.family_name + " " + d.first_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Téléphone:</p>
                      <p>{d.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Adresse:</p>
                      <p>{d.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Sexe:</p>
                      <p>{d.gender === "M" ? "Homme" : "Femme"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Profession:</p>
                      <p>{d.profession}</p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Poids:</p>
                      <p>{d.weight + " kg"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Taille:</p>
                      <p>{d.height + " cm"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Date de naissance:
                      </p>
                      <p>{formatDate(new Date(d.birth_date)).split(" ")[0]}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-darker_grey">Email:</p>
                      <p className="text-sm">{d.email}</p>
                    </div>
                  </div>
                </div>
                <div className="my-4 text-slate-500 text-lg leading-relaxed flex flex-col md:flex-row overflow-x-hidden overflow-y-scroll max-h-96">
                  <div className="grid grid-cols-1 gap-2 mr-3">
                    <p className="col-span-1 text-primary underline mb-2">
                      Antecedents chirugicaux:
                    </p>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Utilisez vous actuellement une méthode contraceptive:
                      </p>
                      <p>{d.dossier_medical.antecedents_chirugicaux}</p>
                    </div>
                    <hr />
                    <p className="col-span-1 text-primary underline ">
                      Allergies:
                    </p>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Présentez-vous des allergies:
                      </p>
                      <p>{d.dossier_medical.allergies ? "Oui" : "Non"}</p>
                    </div>
                    <hr />

                    <p className="col-span-1 text-primary underline mb-2">
                      Antécédent médicaux:
                    </p>

                    <div>
                      <p className="text-sm text-darker_grey">
                        Avez-vous une ou plusieurs maladies cardiovasculaires
                        (infarctus, AVC) :
                      </p>
                      <p>
                        {d.dossier_medical.Antecedent_medicaux
                          .maladies_cardiovasculaires
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Avez-vous des antécédents cardiovasculaires familiaux
                        (infarctus, AVC) :
                      </p>
                      <p>
                        {d.dossier_medical.Antecedent_medicaux
                          .cardiovasculaires_familiaux
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Êtes-vous asthmatique:
                      </p>
                      <p>
                        {d.dossier_medical.Antecedent_medicaux.asthmatique
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Avez-vous déjà pris des anti-dépresseurs ou des
                        neuroleptiques:
                      </p>
                      <p>
                        {d.dossier_medical.Antecedent_medicaux.anti_depresseurs
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Avez-vous un suivi dentaire régulier:
                      </p>
                      <p>
                        {d.dossier_medical.Antecedent_medicaux.suivi_dentaire
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-primary_800 underline">
                        Risque personnel(s) cardio-vasculaire(s):
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        diabète (glycémie 1.26 g/L)
                      </p>
                      <p>
                        {d.dossier_medical.Antecedent_medicaux.diabete
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        HTA ( 140 mmHg pour la systolique ou 90 mmHg pour la
                        diastolique)
                      </p>
                      <p>
                        {d.dossier_medical.Antecedent_medicaux.HTA
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        dyslipidémie (LDL-cholestérol 1,60 g/L ou triglycérides
                        2,0 g/L)
                      </p>
                      <p>
                        {d.dossier_medical.Antecedent_medicaux.dyslipidemie
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 min-w-fit mr-2">
                    <p className="col-span-1 text-primary underline mb-2">
                      Status vaccinal:
                    </p>
                    <div>
                      <p className="text-sm text-darker_grey">BCG</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.BCG ? "Oui" : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Diphtérie - Poliomyélite:
                      </p>
                      <p>
                        {d.dossier_medical.status_vaccinal
                          .Diphterie_Poliomyelite
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Tetanos:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Tetanos
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Coqueluche :</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Coqueluche
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Haemophilius:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Haemophilius
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Hepatite B:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Hepatite_B
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Pneumocoque:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Pneumocoque
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Méningite C:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Meningite_C
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">
                        Rougeole, Oreillons, Rubéole:
                      </p>
                      <p>
                        {d.dossier_medical.status_vaccinal
                          .Rougeole_Oreillons_Rubeole
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">HPV:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.HPV ? "Oui" : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Grippe:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Grippe
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Zona:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Zona ? "Oui" : "Non"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-darker_grey">Corona:</p>
                      <p>
                        {d.dossier_medical.status_vaccinal.Corona_virus
                          ? "Oui"
                          : "Non"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" backdrop-brightness-50 backdrop-blur-sm fixed inset-0 z-40"></div>
      </>
    );
  };

  if (getUserType() !== "medecin") return <Navigate to="/login" />;
  return (
    <>
      <Navbar
        edit="hidden"
        type="medecin"
        homepath="/medecin"
        mespatient={"text-darker_grey"}
      />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full mb-40 justify-center items-start md:text-left">
            <p className="font-medium text-3xl mb-10 text-darker_grey p-2 md:pl-10">
              Mes Patients
            </p>
            {showModal ? popup : null}
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
                        {/* <th scope="col" className="px-3 py-3">
                          Ordonnance
                        </th> */}
                        <th scope="col" className="px-3 py-3">
                          Dossier Médical
                        </th>
                        <th scope="col" className="px-3 py-3 text-center">
                          Prendre un Rendez-vous
                        </th>
                        <th scope="col" className="px-3 py-3">
                          Annuler
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
                                r.patient.family_name +
                                " " +
                                r.patient.first_name
                              }
                              date={r.startDate}
                              duree={r.duration}
                            />
                            {/* <td className="px-3 py-4 ">
                              <button
                                className="px-3 py-1 text-sm text-blue-600 bg-blue-200 rounded-xl truncate md:rounded-full"
                                onClick={() => {
                                  return navigate("/ordonnace", {
                                    state: { r },
                                  });
                                  //  <Ordonnance r={r.patient} />;
                                }}
                              >
                                Ordonnance
                              </button>
                            </td> */}
                            <td className="px-3 py-4 ">
                              <button
                                className="px-3 py-1 text-sm text-blue-600 bg-blue-200 rounded-xl truncate md:rounded-full"
                                onClick={() => {
                                  modal(r.patient);
                                  setShowModal(true);
                                }}
                              >
                                Afficher le dossier
                              </button>
                            </td>
                            <td className="flex px-3 py-4 place-content-center">
                              <button
                                className="px-3 py-1 text-sm text-green-400 bg-green-200 rounded-full"
                                onClick={() => {
                                  handelMeet(r.id);
                                }}
                              >
                                Meet
                              </button>
                            </td>
                            <td className="px-3 py-4">
                              <button
                                className="px-3 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                                onClick={() => {
                                  const userID = JSON.parse(
                                    localStorage.getItem("jwt")
                                  ).user._id;
                                  setIsloading(true);

                                  window.confirm("Annuler cette réservation ?")
                                    ? axios
                                        .delete(
                                          `${API}/api/appointment/${r.id}`,
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
                                        .then((response) => {
                                          setreservations(
                                            reservations.filter(
                                              (a) => a.id !== r.id
                                            )
                                          );
                                          setIsloading(false);
                                        })
                                        .catch((err) => {
                                          console.log("---------", err);
                                          this.setState({
                                            alert: err.response.data.err,
                                          });
                                        })
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
    </>
  );
}

export default Mes_patieints;
