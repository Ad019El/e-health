import { useNavigate } from "react-router-dom";
import hero from "../assets/hero2.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

let userType = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userType = JSON.parse(localStorage.getItem("jwt")).user.type;

function About() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar edit="hidden" type={userType} homepath={`/${userType}`} />

      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-5 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-3/5 justify-center items-start md:text-left">
            <h1 className="my-4 text-4xl font-Montserrat mb-5 leading-tight">
              Pourquoi nous choisir
            </h1>
            <p className="leading-normal list-disc mb-8 list-outside pl-2">
              E-santé est une solution de téléconsultation 100% en ligne, sans
              engagement de durée. E-santé vous permet de faciliter le suivi de
              votre patientèle et d’améliorer l’accès aux soins des patients de
              votre territoire. Une formation souple, initiale et continue à
              notre outil .
            </p>
          </div>

          <div className="w-full md:w-2/5 py-6">
            <img
              className="w-full lg:w-full md:w-4/5 z-50 overflow-hidden"
              src={hero}
              alt="hero"
            />
          </div>
        </div>

        <div className="container flex place-content-center mb-10">
          <hr className="w-40 border-1 border-black " />
        </div>

        <div className="flex flex-col w-full md:w-3/5 justify-center items-start md:text-left">
          <h5 className="my-4 text-3xl font-Montserrat mb-5 leading-tight">
            Pour quels motifs puis-je consulter un médecin en vidéo ?
          </h5>
          <p className="leading-normal list-disc mb-8 list-outside pl-2">
            Aujourd’hui, il est tout à fait possible pour un médecin de réaliser
            un diagnostic à distance grâce à la vidéo. La plupart des motifs de
            consultation qui concernent les maux du quotidien ou un suivi
            médical peuvent être pris en charge à distance par vidéo.
            <h1 className="text-primary">
              Quelles différences avec une consultation en cabinet ?{" "}
            </h1>
            <p1>
              1. Prise de rendez-vous en ligne <br></br>
              2. Pas de temps de trajet <br></br>
              3. Pas de temps de salle d’attente <br></br>
              4. Diminuer les recours aux urgences et prévenir les
              hospitalisations
            </p1>
          </p>
        </div>
        <div className="flex flex-col w-full md:w-3/5 justify-center items-start md:text-left">
          <h5 className="my-4 text-4xl font-Montserrat mb-5 leading-tight">
            La téléconsultation, comment ça marche ?
          </h5>
          <p className="leading-normal list-disc mb-8 list-outside pl-2">
            Consulter un médecin en vidéo,c’est comme une consultation en
            cabinet sauf que vous n’avez pas à vous déplacer ! Restez au chaud
            chez vous, épargnez vous le temps de transport et celui de la salle
            d’attente, un médecin va répondre à vos questions en vidéo et il
            vous enverra une ordonnance si nécessaire à la fin de la
            consultation.
          </p>
          <p1>
            <h1 className="text-primary">
              {" "}
              5 étapes pour consulter un médecin en vidéo{" "}
            </h1>{" "}
            <br></br>
            1. Prenez rendez-vous avec un professionnel de santé sur E-santé :
            en fonction des disponibilités indiquées sur l’agenda E-santé et{" "}
            <br></br> <br></br>
            2. Créez votre profil patient s’il n’existe pas encore et renseignez
            votre dossier médical : pour que le médecin dispose des principaux
            éléments nécessaires à la téléconsultation, notamment les
            antécédents médicaux, allergies,… <br></br> <br></br>
            3. Connectez-vous 15 minutes avant la téléconsultation le temps de
            se placer dans les meilleures conditions et de réaliser les tests de
            connexion de manière automatique ; et transmettre des documents
            complémentaires au médecin si besoin (des radios, des résultats
            d’analyses, des photos si vous en avez). <br></br> <br></br>
            4. Le praticien démarre la téléconsultation. <br></br> <br></br>
            5. A l’issue de la téléconsultation, retrouvez votre compte-rendu de
            téléconsultation et votre ordonnance si nécessaire dans votre espace
            personnel sécurisé. Votre ordonnance est valable dans toutes les
            pharmacies <br></br> <br></br>
          </p1>
        </div>

        <div className="flex flex-col w-full md:w-3/5 justify-center items-start md:text-left">
          <h5 className="my-4 text-4xl font-Montserrat mb-5 leading-tight">
            Une consultation en vidéo est-elle sécurisée et confidentielle ?
          </h5>
          <p className="leading-normal list-disc mb-8 list-outside pl-2">
            Tout à fait. La téléconsultation sur E-santé est réalisée depuis un
            espace sécurisé qui respecte la confidentialité de vos données
            personnelles. Le patient reste l’unique propriétaire de ses données.{" "}
            <br></br>
            Il est possible de demander à E-santé la suppression totale de son
            compte et ce à tout moment.
          </p>
        </div>

        <div class="sm:flex sm:items-center sm:justify-between">
          <ul class="flex flex-wrap   items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <p className=" font-Montserrat"> Nous Github : </p>

              <a
                href="https://github.com/Ad019El/e-health"
                class="mr-4 hover:underline md:mr-6 text-primary "
              >
                https://github.com/Ad019El/e-health
              </a>
            </li>
            <li>
              <p className=" font-Montserrat"> Nous email : </p>
              <a href="ehealth.company@yahoo.com" class="hover:underline">
                <h1 className="text-primary"> ehealth.company@yahoo.com</h1>
              </a>
            </li>
          </ul>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default About;
