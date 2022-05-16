import DoctorCardInfo from "../../components/DoctorCardInfo";
import ListSelect from "../../components/List_select";
import Navbar from "../../components/Navbar";
import profile from "../../assets/profile.png";
import Footer from "../../components/Footer";
import { SearchIcon } from "@heroicons/react/solid";

const specialite = [
  { name: "Orthopédie" },
  { name: "Radiologie" },
  { name: "Pneumologie" },
  { name: "Hématologie" },
  { name: "Gériatrie" },
  { name: "endocrinologie" },
];
// const prix = [{ name: "1500 DA " }, { name: "2000 DA" }, { name: "2500 DA" }];

function Patinet() {
  return (
    <div>
      <Navbar edit="hidden" type="patient" homepath="/patient" />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-start md:text-left">
            <p className="text-2xl mt-5 font-medium mb-14 text-darker_grey">
              Prochaines disponibilités :
            </p>

            <div className="md:flex md:flex-row mb-10">
              <p className="font-medium text-xl text-darker_grey p-2">
                Spécialité
              </p>
              <ListSelect items={specialite} />
              <p className="font-medium text-xl text-darker_grey p-2 md:pl-10">
                Prix
              </p>
              <input
                className=" rounded-lg mr-3 flex-1 appearance-none border border-gray-300 w-20 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                placeholder="Min"
              />
              <input
                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-20 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"
                placeholder="Max"
              />

              {/* <ListSelect items={prix} /> */}
            </div>

            <div className="flex flex-row place-items-center mb-10">
              <p className="font-medium text-xl text-darker_grey p-2 pr-4 ">
                Recherche
              </p>
              <div class="flex relative ">
                <input
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Search"
                />
              </div>

              <button
                type="button"
                className="flex justify-center items-center ml-4 bg-primary hover:bg-primary_800 focus:ring-primary focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-sm  w-11 h-11 rounded-lg "
              >
                <SearchIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
          <DoctorCardInfo
            profile={profile}
            name="Dr Michel FROMENT"
            specialite="Médecin Généraliste"
            prix="2300 DA"
          />
          <DoctorCardInfo
            profile={profile}
            name="Dr Michel FROMENT"
            specialite="Médecin Généraliste"
            prix="2300 DA"
          />
          <DoctorCardInfo
            profile={profile}
            name="Dr Michel FROMENT"
            specialite="Médecin Généraliste"
            prix="2300 DA"
          />
          <DoctorCardInfo
            profile={profile}
            name="Dr Michel FROMENT"
            specialite="Médecin Généraliste"
            prix="2300 DA"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Patinet;
