import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Navbar from "../../components/Navbar";
import { getUserType } from "../Auth";

let userGender = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userGender = JSON.parse(localStorage.getItem("jwt")).user.gender;

let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;

const axios = require("axios");
const API = `http://${process.env.REACT_APP_SERVER_IP}`;

function AccountPatient() {
  const [isLoading, setIsloading] = useState(true);
  const [dossier, setDossier] = useState({});
  const [alert, setAlert] = useState("");
  const [type, setType] = useState("Success");
  const [show, setShow] = useState(true);

  let sexe = userGender;
  const handleSexe = (e) => {
    sexe = e.target.value;
  };

  const handleClick = (e) => {
    e.preventDefault();

    let body = {
      family_name: e.target.family_name.value,
      first_name: e.target.first_name.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      profession: e.target.profession.value,
      weight: e.target.poids.value,
      height: e.target.taille.value,
      gender: sexe,
      email: e.target.email.value,
    };
    let dossier = {};
    e.target.chirugicaux.value &&
      (dossier.antecedents_chirugicaux = e.target.chirugicaux.value);

    e.target.allergies.value &&
      (dossier.allergies = e.target.allergies.value === "Oui");

    /// Antecendt medicaux
    let med = {};
    e.target.cardiovasculaires.value &&
      (med.maladies_cardiovasculaires =
        e.target.cardiovasculaires.value === "Oui");

    e.target.cardiovasculaires_f.value &&
      (med.cardiovasculaires_familiaux =
        e.target.cardiovasculaires_f.value === "Oui");

    e.target.asthmatique.value &&
      (med.asthmatique = e.target.asthmatique.value === "Oui");

    e.target.depresseurs.value &&
      (med.anti_depresseurs = e.target.depresseurs.value === "Oui");

    e.target.dentaire.value &&
      (med.suivi_dentaire = e.target.dentaire.value === "Oui");

    e.target.diabete.value && (med.diabete = e.target.diabete.checked);

    e.target.hta.value && (med.HTA = e.target.hta.checked);

    e.target.dyslipidemie.value &&
      (med.dyslipidemie = e.target.dyslipidemie.checked);

    dossier.Antecedent_medicaux = med;

    /// status vaccin
    let vax = {};
    e.target.BCG.value && (vax.BCG = e.target.BCG.value === "Oui");

    e.target.diphterie.value &&
      (vax.Diphterie_Poliomyelite = e.target.diphterie.value === "Oui");

    e.target.tetanos.value && (vax.Tetanos = e.target.tetanos.value === "Oui");

    e.target.coqueluche.value &&
      (vax.Coqueluche = e.target.coqueluche.value === "Oui");

    e.target.haemophilius.value &&
      (vax.Haemophilius = e.target.haemophilius.value === "Oui");

    e.target.hepatite.value &&
      (vax.Hepatite_B = e.target.hepatite.value === "Oui");

    e.target.pneumocoque.value &&
      (vax.Pneumocoque = e.target.pneumocoque.value === "Oui");

    e.target.meningite.value &&
      (vax.Meningite_C = e.target.meningite.value === "Oui");

    e.target.rougeole.value &&
      (vax.Rougeole_Oreillons_Rubeole = e.target.rougeole.value === "Oui");

    e.target.HPV.value && (vax.HPV = e.target.HPV.value === "Oui");

    e.target.grippe.value && (vax.Grippe = e.target.grippe.value === "Oui");

    e.target.zona.value && (vax.Zona = e.target.zona.value === "Oui");

    e.target.corona.value &&
      (vax.Corona_virus = e.target.corona.value === "Oui");

    dossier.status_vaccinal = vax;

    body.dossier_medical = dossier;

    axios
      .post(
        `${API}/api/patient/update/${userID}`,
        body,

        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jwt")).token
            }`,
          },
        }
      )
      .then((result) => {
        console.log(11111111 + result.data);

        setType("Success");
        setAlert(`Successfully updated`);
        setShow(true);
        const timeId = setTimeout(() => {
          setShow(false);
        }, 4000);

        return () => {
          clearTimeout(timeId);
        };
      })
      .catch((err) => {
        setType("Failed!");
        setAlert(err.response.data.err);
        setShow(true);
        const timeId = setTimeout(() => {
          setShow(false);
        }, 4000);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${API}/api/patient/dossier/${userID}`,

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
        let dossier = result.data.user;
        setDossier(dossier);
        console.log(dossier);
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (getUserType() !== "patient") return <Navigate to="/login" />;

  return (
    <>
      <Navbar edit="hidden" type="patient" homepath="/patient" />
      {!isLoading ? (
        <div className="lg:p-10 lg:px-40 p-5 pt-20">
          <form className="mt-8 space-y-6" onSubmit={handleClick}>
            <div className="md:min-h-full md:flex md:justify-center py-4 px-4 sm:px-6 lg:px-1">
              <div className="md:mr-14">
                <p className="text-2xl pl-32 md:pl-0 font-medium mb-10 text-darker_grey">
                  Mes informations :
                </p>

                <div className="flex justify-center">
                  <div className="block w-96 rounded-lg shadow-lg bg-white text-center">
                    <div className="py-5 px-9 border-b border-gray-300 bg-primary text-white "></div>
                    <div className="p-10 w-auto">
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700"></label>
                            <div className="mt-1 flex items-center">
                              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                <svg
                                  className="h-full w-full text-gray-300"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </span>
                              <button
                                type="button"
                                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Change
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-3 px-6 border-t border-gray-300 font-Montserrat text-gray-600">
                      {dossier.family_name + " " + dossier.first_name || "name"}
                    </div>
                  </div>
                </div>
                <br />

                <div className="flex justify-center md:sticky md:top-24">
                  <div className="block rounded-lg w-96 shadow-lg bg-white max-w-sm text-center">
                    <div className="py-3 px-6 border-b border-gray-300 bg-primary  text-white ">
                      Mes informations
                    </div>
                    <div className="p-6">
                      <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                          <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm text-left font-medium text-gray-700"
                              >
                                Nom
                              </label>
                              <input
                                type="text"
                                name="family_name"
                                id="family-name"
                                autoComplete="given-name"
                                defaultValue={dossier.family_name || ""}
                                className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                htmlFor="last-name"
                                className="block text-sm text-left font-medium text-gray-700"
                              >
                                prénom
                              </label>
                              <input
                                type="text"
                                name="first_name"
                                id="first-name"
                                defaultValue={dossier.first_name || ""}
                                autoComplete="family-name"
                                className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <br></br>

                          <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="telNo block uppercase tracking-wide "
                                className="block text-left text-sm font-medium text-gray-700"
                              >
                                Téléphone
                              </label>
                              <input
                                id="grid-phone"
                                name="phone"
                                type="tel"
                                defaultValue={dossier.phone || ""}
                                className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="grid-city"
                                className="block text-left text-sm font-medium text-gray-700"
                              >
                                Adresse
                              </label>
                              <input
                                id="grid-city"
                                name="address"
                                type="text"
                                defaultValue={dossier.address || ""}
                                className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="grid-sexe"
                                className="block text-sm text-left font-medium text-gray-700"
                              >
                                Sexe
                              </label>
                              <div className="relative">
                                <select
                                  onChange={handleSexe}
                                  className="block appearance-none h-8 w-full  border border-gray-200 text-gray-700 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                  id="grid-sexe"
                                  defaultValue={userGender || ""}
                                >
                                  <option value="M"> Homme</option>
                                  <option value="F"> Femme</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                                  <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="grid-state"
                                className="block text-sm text-left font-medium text-gray-700"
                              >
                                Profession
                              </label>
                              <input
                                id="grid-state"
                                type="text"
                                name="profession"
                                defaultValue={dossier.profession || ""}
                                className="mt-1 border-2  text-left focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="grid-poids "
                                className="block  text-left text-sm font-medium text-gray-700"
                              >
                                Poids
                              </label>
                              <input
                                id="grid-poids"
                                type="number"
                                name="poids"
                                defaultValue={dossier.weight || ""}
                                className="mt-1 border-2 text-left focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                              <label
                                for="grid-taille"
                                className="block text-sm text-left font-medium text-gray-700"
                              >
                                Taille
                              </label>
                              <input
                                id="grid-taille"
                                type="number"
                                name="taille"
                                defaultValue={dossier.height || ""}
                                className="mt-1 border-2 text-left focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>

                            <div className="col-span-9 sm:col-span-7">
                              <label
                                htmlFor="email-address"
                                className="block text-left text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                type="text"
                                name="email"
                                id="email-address"
                                autoComplete="email"
                                defaultValue={dossier.email || ""}
                                className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <br></br>
              </div>
              <div>
                <p className="text-2xl pl-32 md:pl-0 font-medium mb-4 text-darker_grey">
                  Dossier médical:
                </p>
                <br />
                {userGender === "F" && (
                  <>
                    <div className="flex justify-center">
                      <div className="block rounded-lg w-96 shadow-lg bg-white max-w-sm text-center">
                        <div className="py-3 px-6 border-b border-gray-300 bg-primary  text-white ">
                          Gynécologie
                        </div>

                        <div className="p-6 ">
                          <h1>Combien de grossesses avez vous eu?</h1>
                          <div className="flex justify-center">
                            <div className="flex justify-center border-b border-teal-500 w-24  py-2">
                              <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="number"
                                name="grossesses_number"
                                max={99}
                                min={0}
                                defaultValue={
                                  dossier.dossier_medical.Gynécologie
                                    .grosseses_number || 0
                                }
                                placeholder="Combien de grossesses avez vous eu?"
                                aria-label="Full name"
                              />
                            </div>
                          </div>
                          <br></br>
                          <h1 className="text-left">
                            Utilisez vous actuellement une méthode contraceptive
                            ?
                          </h1>
                          <input
                            type="radio"
                            id="ge1"
                            name="contraception"
                            value="Oui"
                            defaultValue={
                              dossier.dossier_medical.Gynécologie
                                .Contraception || false
                            }
                            className="text-left"
                          />
                          <label for="ge1" className="text-left">
                            Oui
                          </label>
                          <br></br>
                          <input
                            type="radio"
                            id="ge1"
                            name="contraception"
                            defaultValue={
                              dossier.dossier_medical.Gynécologie
                                .Contraception === false || false
                            }
                            value="Non"
                          />
                          <label for="ge2"> Non</label> <br></br>
                          <br></br>
                        </div>
                      </div>
                    </div>
                    <br></br>
                  </>
                )}

                <div className="flex justify-center">
                  <div className="block rounded-lg w-96 shadow-lg bg-white max-w-sm text-center">
                    <div className="py-3 px-6 border-b border-gray-300 bg-primary  text-white ">
                      Antecedents chirugicaux
                    </div>
                    <div className="p-6">
                      <h1>
                        Utilisez vous actuellement une méthode contraceptive ?
                      </h1>
                      <div className="flex items-center border-b border-teal-500 py-2">
                        <textarea
                          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                          aria-label="Full name"
                          defaultValue={
                            dossier.dossier_medical.antecedents_chirugicaux ||
                            ""
                          }
                          name="chirugicaux"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="flex justify-center">
                  <div className="block rounded-lg w-96 shadow-lg bg-white max-w-sm text-center">
                    <div className="py-3 px-6 border-b border-gray-300 bg-primary  text-white ">
                      Allergies
                    </div>
                    <div className="p-6">
                      <h1> Présentez-vous des allergies ? </h1>
                      <input
                        type="radio"
                        id="al1"
                        name="allergies"
                        value="Oui"
                        defaultChecked={
                          dossier.dossier_medical.allergies || false
                        }
                        className="text-lesf"
                      />
                      <label for="al1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="al2"
                        name="allergies"
                        defaultChecked={
                          dossier.dossier_medical.allergies === false || false
                        }
                        value="Non"
                      />
                      <label for="al2"> Non</label> <br></br>
                      <br></br>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="flex justify-center">
                  <div className="block rounded-lg w-96 shadow-lg bg-white max-w-sm text-center">
                    <div className="py-3 px-6 border-b border-gray-300 bg-primary  text-white ">
                      Antécédent médicaux
                    </div>
                    <div className="p-6">
                      <br></br>
                      <h1>
                        Avez-vous une ou plusieurs maladies cardiovasculaires
                        (infarctus, AVC) ?
                      </h1>
                      <input
                        type="radio"
                        id="an1"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .maladies_cardiovasculaires || false
                        }
                        name="cardiovasculaires"
                        value="Oui"
                        className="text-left"
                      />
                      <label for="an1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="an2"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .maladies_cardiovasculaires === false || false
                        }
                        name="cardiovasculaires"
                        value="Non"
                      />
                      <label for="an2"> Non</label> <br></br>
                      <br></br>
                      <h1>
                        Avez-vous des antécédents cardiovasculaires familiaux
                        (infarctus, AVC) ?
                      </h1>
                      <input
                        type="radio"
                        id="anc1"
                        name="cardiovasculaires_f"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .cardiovasculaires_familiaux || false
                        }
                        value="Oui"
                        className="text-lesf"
                      />
                      <label for="anc1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="anc2"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .cardiovasculaires_familiaux === false || false
                        }
                        name="cardiovasculaires_f"
                        value="Non"
                      />
                      <label for="anc2"> Non</label> <br></br>
                      <br></br>
                      <h1> Êtes-vous asthmatique ?</h1>
                      <input
                        type="radio"
                        id="as1"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .asthmatique || false
                        }
                        name="asthmatique"
                        value="Oui"
                      />
                      <label for="as1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="as2"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .asthmatique === false || false
                        }
                        name="asthmatique"
                        value="Non"
                      />
                      <label for="as2"> Non</label>
                      <br></br>
                      <br></br>
                      <h1>
                        Avez-vous déjà pris des anti-dépresseurs ou des
                        neuroleptiques ?
                      </h1>
                      <input
                        type="radio"
                        id="dp1"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .anti_depresseurs || false
                        }
                        name="depresseurs"
                        value="Oui"
                      />
                      <label for="dp1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="dp2"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .anti_depresseurs === false || false
                        }
                        name="depresseurs"
                        value="Non"
                      />
                      <label for="dp2"> Non</label> <br></br>
                      <br></br>
                      <h1>Avez-vous un suivi dentaire régulier ? </h1>
                      <input
                        type="radio"
                        id="den1"
                        name="dentaire"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .suivi_dentaire || false
                        }
                        value="Oui"
                      />
                      <label for="den1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="den2"
                        name="dentaire"
                        defaultChecked={
                          dossier.dossier_medical.Antecedent_medicaux
                            .suivi_dentaire === false || false
                        }
                        value="Non"
                      />
                      <label for="den2"> Non</label> <br></br>
                      <br></br>
                      <h1>
                        Avez-vous un ou plusieurs facteur(s) de risque
                        personnel(s) cardio-vasculaire(s) parmi les suivants ?
                      </h1>
                      <div className="text-left">
                        <input
                          // className="flex justify-start"
                          type="checkbox"
                          id="ld3"
                          name="diabete"
                          defaultChecked={
                            dossier.dossier_medical.Antecedent_medicaux
                              .diabete || false
                          }
                        />
                        <label for="ld3"> diabète (glycémie 1.26 g/L)</label>
                      </div>
                      <br></br>
                      <div className="text-left">
                        <input
                          type="checkbox"
                          id="ld1"
                          name="hta"
                          defaultChecked={
                            dossier.dossier_medical.Antecedent_medicaux.HTA ||
                            false
                          }
                          className="text-lesf"
                        />
                        <label for="ld1" className="text-left">
                          HTA ( 140 mmHg pour la systolique ou 90 mmHg pour la
                          diastolique)
                        </label>
                      </div>
                      <br></br>
                      <div className="text-left">
                        <input
                          type="checkbox"
                          id="hta1"
                          defaultChecked={
                            dossier.dossier_medical.Antecedent_medicaux
                              .dyslipidemie || false
                          }
                          name="dyslipidemie"
                          value="N"
                        />
                        <label for="hta1">
                          dyslipidémie (LDL-cholestérol 1,60 g/L ou
                          triglycérides 2,0 g/L)
                        </label>
                      </div>
                      <br></br>
                    </div>
                  </div>
                </div>
                <br></br>
                <div className="flex justify-center">
                  <div className="block rounded-lg w-96 shadow-lg bg-white max-w-sm text-center">
                    <div className="py-3 px-6 border-b border-gray-300 bg-primary  text-white ">
                      Status vaccinal
                    </div>

                    <div className="p-6">
                      <br></br>
                      <h1>BCG</h1>
                      <input
                        type="radio"
                        id="bg1"
                        name="BCG"
                        value="Oui"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.BCG || false
                        }
                        className="text-lesf"
                      />
                      <label for="bg1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="bg2"
                        name="BCG"
                        value="Non"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.BCG ===
                            false || false
                        }
                      />
                      <label for="bg2"> Non</label> <br></br>
                      <br></br>
                      <h1>Diphtérie - Poliomyélite</h1>
                      <input
                        type="radio"
                        id="di1"
                        name="diphterie"
                        value="Oui"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Diphterie_Poliomyelite || false
                        }
                        className="text-lesf"
                      />
                      <label for="di1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="di2"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Diphterie_Poliomyelite === false || false
                        }
                        name="diphterie"
                        value="Non"
                      />
                      <label for="di2"> Non</label> <br></br>
                      <br></br>
                      <h1>Tetanos</h1>
                      <input
                        type="radio"
                        id="ta1"
                        name="tetanos"
                        value="Oui"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Tetanos ||
                          false
                        }
                      />
                      <label for="ta1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="ta2"
                        name="tetanos"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Tetanos ===
                            false || false
                        }
                        value="Non"
                      />
                      <label for="ta2"> Non</label> <br></br>
                      <br></br>
                      <h1> Coqueluche </h1>
                      <input
                        type="radio"
                        id="co1"
                        name="coqueluche"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Coqueluche ||
                          false
                        }
                        value="Oui"
                      />
                      <label for="co1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="co2"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Coqueluche ===
                            false || false
                        }
                        name="coqueluche"
                        value="Non"
                      />
                      <label for="co2"> Non</label> <br></br>
                      <br></br>
                      <h1>Haemophilius </h1>
                      <input
                        type="radio"
                        id="ha1"
                        name="haemophilius"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Haemophilius || false
                        }
                        value="Oui"
                      />
                      <label for="ha1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="ha2"
                        name="haemophilius"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Haemophilius === false || false
                        }
                        value="Non"
                      />
                      <label for="ha2"> Non</label> <br></br>
                      <br></br>
                      <h1>Hepatite B </h1>
                      <input
                        type="radio"
                        id="he1"
                        name="hepatite"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Hepatite_B ||
                          false
                        }
                        value="Oui"
                      />
                      <label for="he1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="he2"
                        name="hepatite"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Hepatite_B ===
                            false || false
                        }
                        value="Non"
                      />
                      <label for="he2"> Non</label> <br></br>
                      <br></br>
                      <h1>Pneumocoque </h1>
                      <input
                        type="radio"
                        id="pn1"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Pneumocoque ||
                          false
                        }
                        name="pneumocoque"
                        value="Oui"
                      />
                      <label for="pn1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="pn2"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Pneumocoque === false || false
                        }
                        name="pneumocoque"
                        value="Non"
                      />
                      <label for="pn2"> Non</label> <br></br>
                      <br></br>
                      <h1>Méningite C </h1>
                      <input
                        type="radio"
                        id="mn1"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Meningite_C ||
                          false
                        }
                        name="meningite"
                        value="Oui"
                      />
                      <label for="mn1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="mn2"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Meningite_C === false || false
                        }
                        name="meningite"
                        value="Non"
                      />
                      <label for="mn2"> Non</label> <br></br>
                      <br></br>
                      <h1>Rougeole, Oreillons, Rubéole </h1>
                      <input
                        type="radio"
                        id="ror1"
                        name="rougeole"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Rougeole_Oreillons_Rubeole || false
                        }
                        value="Oui"
                      />
                      <label for="ror1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="ror2"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Rougeole_Oreillons_Rubeole === false || false
                        }
                        name="rougeole"
                        value="Non"
                      />
                      <label for="ror2"> Non</label> <br></br>
                      <br></br>
                      <h1>HPV </h1>
                      <input
                        type="radio"
                        id="hp1"
                        name="HPV"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.HPV || false
                        }
                        value="Oui"
                      />
                      <label for="hp1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="hp2"
                        name="HPV"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.HPV ===
                            false || false
                        }
                        value="Non"
                      />
                      <label for="hp2"> Non</label> <br></br>
                      <br></br>
                      <br></br>
                      <h1>Grippe </h1>
                      <input
                        type="radio"
                        id="gir1"
                        name="grippe"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Grippe ||
                          false
                        }
                        value="Oui"
                      />
                      <label for="gir1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="gir2"
                        name="grippe"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Grippe ===
                            false || false
                        }
                        value="Non"
                      />
                      <label for="gir2"> Non</label> <br></br>
                      <br></br>
                      <h1 text-left>Zona </h1>
                      <input
                        type="radio"
                        id="zo1"
                        name="zona"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Zona || false
                        }
                        value="Oui"
                      />
                      <label for="zo1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="zo2"
                        name="zona"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal.Zona ===
                            false || false
                        }
                        value="Non"
                      />
                      <label for="zo2"> Non</label> <br></br>
                      <br></br>
                      <h1 text-left>Corona </h1>
                      <input
                        type="radio"
                        id="zo1"
                        name="corona"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Corona_virus || false
                        }
                        value="Oui"
                      />
                      <label for="zo1" className="text-left">
                        Oui
                      </label>
                      <br></br>
                      <input
                        type="radio"
                        id="zo2"
                        name="corona"
                        defaultChecked={
                          dossier.dossier_medical.status_vaccinal
                            .Corona_virus === false || false
                        }
                        value="Non"
                      />
                      <label for="zo2"> Non</label> <br></br>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="group relative w-70 rounded-md py-2 px-4 text-white text-sm font-medium bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none "
              >
                sauvegarder
              </button>
            </div>
            <div className="flex justify-center ">
              <div className="block">
                {alert ? (
                  show && (
                    <Alert
                      type={type}
                      calendar={true}
                      color="red"
                      content={alert}
                    />
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </form>
          <br></br>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AccountPatient;
