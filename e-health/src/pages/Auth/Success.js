import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Success() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar edit="invisible" landing_phone_hide="invisible" homepath="/" />

      <div className="h-screen  py-20 px-3">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <div className="bg-white border-2 border-primary h-auto py-3 rounded text-center">
                <h1 className="text-2xl text-primary_800 mt-4  font-bold">
                  Succès
                </h1>
                <div className="flex flex-col underline cursor-pointer text-primary_800 mt-4">
                  <p
                    onClick={() => {
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

export default Success;
