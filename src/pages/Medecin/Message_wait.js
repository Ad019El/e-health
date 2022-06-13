import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function MessageWait() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar edit="invisible" landing_phone_hide="invisible" homepath="/" />

      <div className="h-screen  py-20 px-3">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className="bg-white border-2 border-primary h-auto py-3 rounded text-center">
                <h1 className="text-2xl text-primary_800 mt-4  font-bold px-10 text-center">
                  votre compte doit être vérifié par l'administrateur avant de
                  pouvoir y accéder, un e-mail sera envoyé une fois la
                  vérification soit effectuée
                </h1>
                <div className="flex flex-col underline cursor-pointer text-primary_800 mt-4 mb-4">
                  <p
                    onClick={() => {
                      localStorage.removeItem("jwt");
                      return navigate("/login");
                    }}
                  >
                    Retour à la page d'accueil
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageWait;
