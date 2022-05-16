import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function SignUp() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar edit="invisible" landing_phone_hide="invisible" homepath="/" />

      <div class="shadow w-50 h-50 pt-10 pb-24   bg-teal-40 justify-center ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-Montserrat text-gray-900">
            Creat your account
          </h2>
          <p className="mt-2 text-center font-Montserrat text-sm text-gray-600">
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Or &nbsp;
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-primary  font-normal font-Montserrat"
            >
              Already have account !
            </button>
          </p>
        </div>

        <div className="min-h-full flex items-center justify-center py-6 px-2 sm:px-2 lg:px-1">
          <div className="max-w-xs w-full space-y-8">
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs rounded-md font-bold mb-2"
                    for="grid-last-name"
                  >
                    Nom
                  </label>
                  <input
                    class="appearance-none block w-full rounded-md text-gray-700 border border-gray-100 border-width: 2px py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Nom"
                  />
                </div>

                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Prénom
                  </label>
                  <input
                    class="appearance-none block w-full rounded-md text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Prénom"
                  />
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-poids"
                  >
                    Poids
                  </label>
                  <input
                    class="appearance-none block w-full rounded-md text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-poids"
                    type="number"
                    placeholder="Poids"
                  />
                </div>
                <div class="w-full mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-taille"
                  >
                    Taille
                  </label>
                  <input
                    class="appearance-none block w-full rounded-md text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-taille"
                    type="number"
                    placeholder="Taille"
                  />
                </div>
                <div class="w-full mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 rounded-md text-xs font-bold mb-2"
                    for="grid-sexe"
                  >
                    Sexe
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-sexe"
                    >
                      <option> Femme</option>
                      <option> Homme</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-2">
                  <div class="w-full px-3 mb-6 md:mb-0">
                    <label for="telNo block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Phone :
                    </label>
                    <input
                      class="appearance-none block w-full  text-gray-700 rounded-md border border-gray-200 rounded py-3 px-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-phone"
                      name="telNo"
                      type="tel"
                    ></input>
                  </div>
                  <div class="w-full px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-city"
                    >
                      Address
                    </label>
                    <input
                      class="appearance-none block w-full mb-4  text-gray-700 rounded-md border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="City"
                    />
                  </div>
                  <div class="w-full  px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 rounded-md text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      Profession
                    </label>
                    <div class="relative">
                      <select
                        class="block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                      >
                        <option> Fonctioner</option>
                        <option></option>
                        <option></option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
                        <svg
                          class="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <label for="birthday">Date de naissance:</label>
              <input type="date" id="birthday" name="birthday" />

              <div class="flex justify-center">
                <div class="mb-3 w-96">
                  <label
                    for="formFile"
                    class="form-label inline-block mb-2 text-gray-700"
                  >
                    Télécharger votre photo
                  </label>
                  <input
                    class="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="file"
                    id="formFile"
                  />
                </div>
              </div>

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
