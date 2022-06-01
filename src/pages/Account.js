// import DoctorCardInfo from "../components/DoctorCardInfo";
// import ListSelect from "../components/List_select";
import Navbar from "../components/Navbar";
// import profile from "../assets/profile.png";
import Footer from "../components/Footer";
// import { SearchIcon } from "@heroicons/react/solid";

export default function Account() {
  return (
    <>
      <div>
        <Navbar edit="hidden" type="patient" homepath="/patient" />
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg  font-medium leading-6 text-gray-900 rounded-mx bg-gray-300 flex-1 appearance-none border border-gray-300 w-25 py-2 px-4 bg-[#e5e7eb]  text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none">
                Profile
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
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
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center  justify-center items-center ml-4 bg-primary hover:bg-primary_800 focus:ring-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-sm  w-20 h-11 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0 rounded">
              <h3 className="rounded-mx bg-gray-300 flex-1 appearance-none border border-gray-300 w-25 py-2 px-4 bg-[#e5e7eb]  text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none">
                Personal Information
              </h3>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div class="col-span-6 sm:col-span-3">
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

                      <div class="col-span-6 sm:col-span-3">
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
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center  justify-center items-center ml-4 bg-primary hover:bg-primary_800 focus:ring-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-sm  w-20 h-11 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900  rounded-mx bg-gray-300 flex-1 appearance-none border border-gray-300 w-25 py-2 px-4 bg-[#e5e7eb]  text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none">
                Dossier médical
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Information générales
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
                  <div class="w-full mb-6 md:mb-0">
                    <label for="birthday">Date de naissance:</label>
                    <input
                      className="appearance-none block w-full rounded-md text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="date"
                      id="birthday"
                      name="birthday"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex justify-center  justify-center items-center ml-4 bg-primary hover:bg-primary_800 focus:ring-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-sm  w-20 h-11 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
