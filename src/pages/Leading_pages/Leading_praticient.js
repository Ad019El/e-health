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
          title="Meilleure gestion de votre temps médical"
          content="Avec Qare, planifiez simplement vos créneaux de téléconsultation depuis l’agenda en ligne."
        />
        <InfoCard
          title="Visualisez vos rendez-vous"
          content="Accédez à votre agenda en ligne pour retrouver tous vos rendez-vous, les motifs de consultation et les dossiers médicaux des patients."
        />
        <InfoCard
          title="Effectuez votre téléconsultation"
          content="Connectez-vous à votre espace praticien à l’heure prévue, lancez la téléconsultation : votre patient vous attend en salle d’attente virtuelle."
        />
        <InfoCard
          title="Partagez des documents médicaux"
          content="La solution Qare est compatible avec votre logiciel métier pour vous permettre de partager vos documents."
        />
      </div>
      <Footer />
    </div>
  );
}

export default Leading_praticient;
