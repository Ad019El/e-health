import { Navigate, useNavigate } from "react-router-dom";
import hero from "../../assets/hero1.png";
import Footer from "../../components/Footer";
import InfoCard from "../../components/InfoCard";
import { isAuthenticate } from "../Auth";

function Leading_patient() {
  const navigate = useNavigate();

  if (isAuthenticate()) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="lg:p-10 lg:px-40 p-5 pt-18">
      <div className="container px-3 mb-5 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-3/5 justify-center items-start md:text-left">
          <h1 className="my-4 text-4xl font-Montserrat mb-5 leading-tight">
            Consultez un médecin en ligne aujourd'hui
          </h1>
          <ul className="leading-normal list-disc mb-8 list-outside pl-10">
            <li className="text-primary">
              <span className="text-black">Sans vous déplacer</span>
            </li>
            <li className="text-primary">
              <span className="text-black">Sans avance de frais</span>
            </li>
            <li className="text-primary">
              <span className="text-black">Ordonnance</span>
            </li>
          </ul>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="px-6 h-12 transition ease-in duration-200  text-white rounded-2xl bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none"
          >
            S'inscrire
          </button>
        </div>

        <div className="w-full md:w-2/5 py-6">
          <img
            className="w-full lg:w-full md:w-4/5 z-50 overflow-hidden"
            src={hero}
            alt="hero"
          />
        </div>
      </div>
      <h1 className="text-2xl text-center mb-4">Nos services</h1>
      <div className="container flex place-content-center mb-10">
        <hr className="w-10 border-1 border-black " />
      </div>
      <div className="mb-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
        <InfoCard
          title="Prenez rendez-vous en ligne"
          content="Recherchez une spécialité puis choisissez le praticien et l'horaire qui vous conviennent. Connectez-vous à la salle d’attente 15 min avant le démarrage de la téléconsultation."
        />
        <InfoCard
          title="Effectuez votre téléconsultation"
          content="Décrivez vos symptômes à un praticien formé à la téléconsultation, en toute confidentialité depuis votre ordinateur ou votre smartphone."
        />
        <InfoCard
          title="Obtenez un avis médical"
          content="Bénéficiez d'un avis, d’un diagnostic et si nécessaire d'une ordonnance valable en pharmacie, accessible en ligne depuis votre espace personnel."
        />
        <InfoCard
          title="Soyez pris en charge"
          content="La téléconsultation est remboursable par l’Assurance Maladie. Sur Qare, vous pouvez également consulter des médecins qui pratiquent le tiers payant - vous n’aurez alors aucun frais à avancer à condition d’avoir une carte vitale à jour."
        />
      </div>
      <Footer />
    </div>
  );
}

export default Leading_patient;
