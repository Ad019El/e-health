import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function SignUp() {
  const navigate = useNavigate();
  const axios = require("axios");
  const [alert, setAlert] = useState("");
  const [type, setType] = useState("Success");

  let sexe = "M";

  const handleSexe = (e) => {
    sexe = e.target.value;
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`https://${process.env.REACT_APP_SERVER_IP}/api/patient/signup`, {
        first_name: e.target.prenom.value,
        family_name: e.target.nom.value,
        weight: e.target.poids.value,
        height: e.target.taille.value,
        phone: e.target.phone.value,
        address: e.target.address.value,
        profession: e.target.profession.value,
        birth_date: e.target.birthday.value,
        email: e.target.email.value,
        password: e.target.password.value,
        gender: sexe,
      })
      .then((result) => {
        console.log(result);
        // localStorage.setItem("jwt", result.data.token);
        // authenticate(result.data);
        // window.location.reload(false);
        setType("Success");
        setAlert(`Successfully registred`);
      })
      .catch((error) => {
        console.log(error);
        setType("Failed!");
        setAlert(error.response.data.err);
      });
  };

  return (
    <>
      <Navbar edit="invisible" landing_phone_hide="invisible" homepath="/" />

      <div className="shadow w-50 h-50 pt-10 pb-24   bg-teal-40 justify-center ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-Montserrat text-gray-900">
            Créez votre compte
          </h2>
          <p className="mt-2 text-center font-Montserrat text-sm text-gray-600">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Or &nbsp;
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-primary  font-normal font-Montserrat"
            >
              Vous avez déjà un compte!
            </button>
          </p>
        </div>

        <div className="min-h-full flex items-center justify-center py-6 px-2 sm:px-2 lg:px-1">
          <div className="max-w-xs w-full space-y-8">
            <form className="mt-8 space-y-6" onSubmit={handleClick}>
              <input type="hidden" name="remember" defaultValue="true" />

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs rounded-md font-bold mb-2"
                    for="name"
                  >
                    Nom
                  </label>
                  <input
                    className="appearance-none block w-full rounded-md text-gray-700 border border-gray-100 border-width: 2px py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="name"
                    name="nom"
                    type="text"
                    placeholder="Nom"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-prenom"
                  >
                    Prénom
                  </label>
                  <input
                    className="appearance-none block w-full rounded-md text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-prenom"
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-poids"
                  >
                    Poids
                  </label>
                  <input
                    className="appearance-none block w-full rounded-md text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-poids"
                    type="number"
                    name="poids"
                    placeholder="Poids"
                  />
                </div>
                <div className="w-full mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-taille"
                  >
                    Taille
                  </label>
                  <input
                    className="appearance-none block w-full rounded-md text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-taille"
                    type="number"
                    name="taille"
                    placeholder="Taille"
                  />
                </div>
                <div className="w-full mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 rounded-md text-xs font-bold mb-2"
                    for="grid-sexe"
                  >
                    Sexe
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-sexe"
                      onChange={handleSexe}
                    >
                      <option value="M"> Homme</option>
                      <option value="F"> Femme</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="https://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label for="telNo block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Phone :
                    </label>
                    <input
                      className="appearance-none block w-full  text-gray-700 rounded-md border border-gray-200 rounded py-3 px-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-phone"
                      name="phone"
                      placeholder="0656666666"
                      type="tel"
                    ></input>
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-city"
                    >
                      Address
                    </label>
                    <input
                      className="appearance-none block w-full mb-4  text-gray-700 rounded-md border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      name="address"
                      placeholder="City"
                    />
                  </div>
                  <div className="w-full  px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 rounded-md text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      Profession
                    </label>
                    <input
                      className="appearance-none block w-full mb-4  text-gray-700 rounded-md border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      type="text"
                      name="profession"
                      placeholder="Profession"
                    />
                  </div>
                </div>
              </div>

              <label for="birthday">Date de naissance:</label>
              <input type="date" id="birthday" name="birthday" />

              {/* <div className="flex justify-center">
                <div className="mb-3 w-96">
                  <label
                    for="formFile"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    Télécharger votre photo
                  </label>

                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg, image/jpg"
                    class="block cursor-pointer w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </div> */}

              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <br></br>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div>
                {alert ? (
                  <Alert type={type} color="red" content={alert} />
                ) : (
                  <></>
                )}
                <br />

                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border  text-sm font-medium rounded-md text-whitepx-6 h-12 transition ease-in duration-200  text-white rounded-2xl bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none"
                >
                  Registrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignUp;
