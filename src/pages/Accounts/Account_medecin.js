import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
import Navbar from "../../components/Navbar";

let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;

let userGender = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userGender = JSON.parse(localStorage.getItem("jwt")).user.gender;

const axios = require("axios");
const API = `http://${process.env.REACT_APP_SERVER_IP}`;

function AccountMedecin() {
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
      email: e.target.email.value,
      gender: sexe,
      n_ordre: e.target.order.value,
      price: e.target.tarif.value,
    };

    axios
      .post(
        `${API}/api/medecin/update/${userID}`,
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
        }, 3000);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${API}/api/medecin/${userID}`,

        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("jwt")).token
            }`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setIsloading(true);
        let dossier = result.data.medecin;
        setDossier(dossier);
        console.log(dossier);
        setIsloading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar
        edit="hidden"
        type="medecin"
        homepath="/medecin"
        // mespatient={"text-darker_grey"}
      />

      <div className="lg:p-10 lg:px-40 p-5 pt-20">
        <form className="mt-8 space-y-6" onSubmit={handleClick}>
          {/* <div className="md:min-h-full md:flex md:justify-center py-4 px-4 sm:px-6 lg:px-1"> */}
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
                            for="grid-city"
                            className="block text-left text-sm font-medium text-gray-700"
                          >
                            Tarif
                          </label>
                          <input
                            id="grid-city"
                            name="tarif"
                            type="number"
                            defaultValue={dossier.price || ""}
                            className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-9 sm:col-span-7">
                          <label
                            for="grid-city"
                            className="block text-left text-sm font-medium text-gray-700"
                          >
                            N order
                          </label>
                          <input
                            id="grid-city"
                            name="order"
                            type="number"
                            defaultValue={dossier.n_ordre || ""}
                            className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
            {/* </div> */}
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative w-70 mt-6 rounded-md py-2 px-4 text-white text-sm font-medium bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none "
            >
              sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountMedecin;
