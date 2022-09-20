import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import { formatDate, getUserType } from "../Auth";

const axios = require("axios");
const API = `https://${process.env.REACT_APP_SERVER_IP}`;

let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;

function Patients() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [popup, setPopup] = useState("");

  useEffect(() => {
    axios
      .get(
        `${API}/api/patient/all/`,

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

        let patients = [];
        result.data.map((a) => {
          patients.push(a);
        });
        console.log(patients);
        setPatients(patients);
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const modal = (d) => {
    console.log(d.dossier_medical);
    setPopup(
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto md:overflow top-14 fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
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
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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

  if (getUserType() !== "admin") return <Navigate to="/login" />;
  return (
    <>
      <Navbar
        edit="hidden"
        type="admin"
        homepath="/admin/patients"
        patients="text-darker_grey"
      />

      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-start md:text-left">
            <p className="font-medium text-3xl mb-10 text-darker_grey p-2 md:pl-10">
              Patients
            </p>

            {/* <button
              className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Open regular modal
            </button> */}

            {showModal ? popup : null}

            <>
              {!isLoading ? (
                <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Nom complet
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Age
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Sexe
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                          Dossier
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Désactiver
                        </th>
                      </tr>
                    </thead>

                    {patients.map((r) => {
                      return (
                        <tbody>
                          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            >
                              {r.family_name + " " + r.first_name}
                            </th>
                            <td className="px-6 py-4">
                              {calculateAge(new Date(r.birth_date)) + " ans"}
                            </td>
                            <td className="px-6 py-4">
                              {(r.gender === "M" && "Homme") || "Femme"}
                            </td>

                            <td className="flex px-6 py-4 place-content-center">
                              <button
                                onClick={() => {
                                  modal(r);
                                  setShowModal(true);
                                }}
                                className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-xl truncate md:rounded-full"
                              >
                                Afficher le dossier
                              </button>
                            </td>

                            <td className="px-6 py-4">
                              <button
                                className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full"
                                onClick={() => {
                                  setIsloading(true);
                                  window.confirm("Désactiver cette compte?")
                                    ? axios
                                        .delete(`${API}/api/patient/${r._id}`, {
                                          headers: {
                                            Authorization: `Bearer ${
                                              JSON.parse(
                                                localStorage.getItem("jwt")
                                              ).token
                                            }`,
                                          },
                                        })
                                        .then((result) => {
                                          setPatients(
                                            patients.filter(
                                              (a) => a._id !== r._id
                                            )
                                          );
                                          setIsloading(false);
                                        })
                                        .catch((err) => console.log(err))
                                    : setIsloading(false);
                                }}
                              >
                                Désactiver
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

export default Patients;
