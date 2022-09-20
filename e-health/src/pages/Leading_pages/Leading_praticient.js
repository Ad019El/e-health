import { Navigate, useNavigate } from "react-router-dom";
import hero from "../../assets/hero2.png";
import Footer from "../../components/Footer";
import InfoCard from "../../components/InfoCard";
import { isAuthenticate } from "../Auth";

function Leading_praticient() {
  const navigate = useNavigate();
  if (isAuthenticate()) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="lg:p-10 lg:px-40 p-5 pt-18">
      <div className="container px-3 mb-5 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full md:w-3/5 justify-center items-start md:text-left">
          <h1 className="my-4 text-4xl font-Montserrat mb-5 leading-tight">
            Une solution de téléconsultation
          </h1>
          <p className="leading-normal list-disc mb-8 list-outside pl-2">
            E-santé est une solution de téléconsultation 100% en ligne, sans
            engagement de durée. E-santé vous permet de faciliter le suivi de
            votre patientèle et d’améliorer l’accès aux soins des patients de
            votre territoire. Une formation souple, initiale et continue à notre
            outil .
          </p>
          <button
            onClick={() => {
              navigate("/signupmed");
            }}
            className="px-6 h-12 transition ease-in duration-200  text-white rounded-2xl bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none"
          >
            S'inscrire en tant que praticien
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
          image="https://cdn-icons-png.flaticon.com/512/1584/1584793.png"
          title="Prenez rendez-vous en ligne"
          content="Recherchez une spécialité puis choisissez le praticien et l'horaire qui vous conviennent. Connectez-vous à la salle d’attente 15 min avant le démarrage de la téléconsultation."
        />
        <InfoCard
          image="https://us.123rf.com/450wm/blankstock/blankstock1904/blankstock190401756/123946635-ic%C3%B4ne-de-ligne-de-calendrier-m%C3%A9dical-signe-de-rendez-vous-chez-le-m%C3%A9decin-%C3%A9l%C3%A9ments-de-conception-de-.jpg?ver=6"
          title="Effectuez votre téléconsultation"
          content="Décrivez vos symptômes à un praticien formé à la téléconsultation, en toute confidentialité depuis votre ordinateur ou votre smartphone."
        />
        <InfoCard
          image="https://cdn-icons-png.flaticon.com/512/2701/2701190.png"
          title="Obtenez un avis médical"
          content="Bénéficiez d'un avis, d’un diagnostic et si nécessaire d'une ordonnance valable en pharmacie, accessible en ligne depuis votre espace personnel."
        />
        <InfoCard
          image="https://www.paypalobjects.com/marketing/web/ppcp/enterprises/make-paymet-hero-euro.png"
          title="Soyez pris en charge"
          content="La téléconsultation est remboursable par l’Assurance Maladie. Sur E-santé, vous pouvez également consulter des médecins qui pratiquent le tiers payant - vous n’aurez alors aucun frais à avancer à condition d’avoir une carte vitale à jour."
        />
      </div>
      <Footer />
    </div>
  );
}

export default Leading_praticient;
