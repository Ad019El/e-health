import DoctorCardInfo from "../../components/DoctorCardInfo";
import Navbar from "../../components/Navbar";
import profile from "../../assets/profile.png";
import Footer from "../../components/Footer";
import { SearchIcon } from "@heroicons/react/solid";
import { getMedecins, getUserType, searchMedecins, searchPrice } from "../Auth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";

// const specialities = [
//   "generalist",
//   "pédiatre",
//   "Tous",
//   "Audioprothésiste",
//   "Chirurgien",
//   "Chirurgien Plastique Réparatrice et Esthétique",
//   "Chirurgien Urologue",
//   "Chirurgien cardiovasculaire et thoracique",
//   "Chirurgien des mains",
//   "Chirurgien digestif et viscéral",
//   "Chirurgien maxillo-faciale",
//   "Chirurgien orthopédique",
//   "Chirurgien-Dentiste",
//   "Conseillère conjugale et familiale",
//   "Diététicien",
//   "Ergothérapeute",
//   "Infirmier",
//   "Masseur-kinésithérapeute",
//   "Médecin Addictologue",
//   "Allergologue",
//   "Anesthésiste-réanimateur",
//   "Angiologue/phlébologue",
//   "Biologiste médical",
//   "Cardiologue",
//   "Dermatologue",
//   "Endocrinologue",
//   "Esthétique",
//   "Gynécologue",
//   "Généraliste",
//   "Généticien",
//   "Gériatre",
//   "Hématologue",
//   "Hépato-gastro-entérologue",
//   "Infectiologue",
//   "Neurologue",
//   "Néphrologue",
//   "Obstétricien",
//   "Oncologue",
//   "Ophtalmologue",
//   "Oto-rhino-laryngologiste",
//   "Pneumologue",
//   "Psychiatre",
//   "Pédiatre",
//   "Pédiatre gastroentérologue",
//   "Pédiatre néonatologue",
//   "Pédiatre pneumologue",
//   "Pédopsychiatre",
//   "Radiologue",
//   "Radiothérapeute",
//   "Rhumatologue",
//   "Rééducateur",
//   "Sexologue",
//   "Tabacologue",
//   "des expatriés",
//   "du Sport",
//   "interniste",
//   "Neurochirurgien",
//   "Nutritionniste",
//   "Opticien-lunetier",
//   "Orthodontiste",
//   "Orthophoniste",
//   "Orthoptiste",
//   "Ostéopathe",
//   "Pharmacien",
//   "Physiothérapeute",
//   "Psychologue",
//   "Psychomotricien",
//   "Psychothérapeute",
//   "Pédicure - Podologue",
//   "Sage-femme - Consultations gynécologiques",
//   "Thérapeute",
// ];

function Patinet() {
  const [Medecins, setMedecins] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchLoading, setSearchLoading] = useState(true);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(999999999);

  const fetchMyAPI = () => {
    getMedecins()
      .then((result) => {
        setMedecins([]);
        setSearchLoading(true);
        let Medecins = [];

        for (const medecin of result) {
          Medecins.push({
            id: medecin._id,
            first_name: medecin.first_name,
            family_name: medecin.family_name,
            phone: medecin.phone,
            speciality: medecin.speciality,
            price: medecin.price,
          });
        }
        setMedecins(Medecins);
        setSearchLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = () => {
    setMedecins([]);
    setSearchLoading(true);
    searchMedecins(keyword)
      .then((result) => {
        setMedecins([]);
        let newMed = [];
        for (const medecin of result) {
          newMed.push({
            id: medecin._id,
            first_name: medecin.first_name,
            family_name: medecin.family_name,
            phone: medecin.phone,
            speciality: medecin.speciality,
            price: medecin.price,
          });
        }
        setMedecins(newMed);
        setSearchLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handlePrice = (e) => {
    setMedecins([]);
    setSearchLoading(true);
    searchPrice(min, max)
      .then((result) => {
        setMedecins([]);
        let newMed = [];
        for (const medecin of result) {
          newMed.push({
            id: medecin._id,
            first_name: medecin.first_name,
            family_name: medecin.family_name,
            phone: medecin.phone,
            speciality: medecin.speciality,
            price: medecin.price,
          });
        }
        setMedecins(newMed);
        setSearchLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMyAPI();
  }, []);

  if (getUserType() !== "patient") return <Navigate to="/login" />;

  return (
    <div>
      <Navbar
        edit="hidden"
        type="patient"
        homepath="/patient"
        consultation="text-darker_grey"
      />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-start md:text-left">
            <p className="text-2xl mt-5 font-medium mb-14 text-darker_grey">
              Prochaines disponibilités :
            </p>

            <div className="md:flex md:flex-row place-items-center mb-10">
              <div className="flex flex-row mb-4 md:mb-0">
                <p className="font-medium text-xl text-darker_grey p-2 pr-4 ">
                  Recherche
                </p>
                <div className="flex relative ">
                  <input
                    className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Search"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      // handleSearch();
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSearch}
                  className="flex justify-center items-center ml-4 bg-primary hover:bg-primary_800 focus:ring-primary focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-sm  w-11 h-11 rounded-lg "
                >
                  <SearchIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-row ">
                <p className="font-medium text-xl text-darker_grey p-2 md:pl-10">
                  Tarif
                </p>
                <input
                  className=" rounded-lg mr-3 flex-1 appearance-none border border-gray-300 w-20 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Min"
                  onChange={(e) => {
                    setMin(e.target.value);
                  }}
                  type="number"
                />
                <input
                  className=" rounded-lg flex-1 appearance-none border border-gray-300 w-20 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Max"
                  onChange={(e) => {
                    setMax(e.target.value);
                  }}
                  type="number"
                />
                <button
                  className="flex justify-center items-center ml-4 bg-primary hover:bg-primary_800 focus:ring-primary focus:ring-offset-blue-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-sm  w-24 h-11 rounded-lg "
                  onClick={handlePrice}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
        {Medecins.length === 0 && (
          <p className="text-center text-primary text-4xl">No result</p>
        )}
        <div className="mb-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
          {!searchLoading ? (
            Medecins.map((medecin) => {
              return (
                <DoctorCardInfo
                  id={medecin.id}
                  profile={profile}
                  name={medecin.family_name + " " + medecin.first_name}
                  specialite={medecin.speciality.join(", ")}
                  prix={`${medecin.price} DA`}
                />
              );
            })
          ) : (
            <>
              {<Spinner />}
              {<Spinner />}
              {<Spinner />}
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
} //
export default Patinet;
