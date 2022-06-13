import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const axios = require("axios");
const API = `http://${process.env.REACT_APP_SERVER_IP}`;
let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;

function Confirmation() {
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    var code = "";
    for (let i = 0; i < 6; i++) {
      code += e.target[i].value;
    }
    axios
      .post(`${API}/api/patient/confirm/${userID}`, { code })
      .then((response) => {
        let item = JSON.parse(localStorage.getItem("jwt"));
        item.user.verified = true;
        localStorage.setItem("jwt", JSON.stringify(item));
        navigate("/confirmation/success");
      })
      .catch((err) => {
        console.log("index err", err);
      });
  };

  return (
    <>
      <Navbar edit="invisible" landing_phone_hide="invisible" homepath="/" />

      <div className="h-screen  py-20 px-3">
        <div className="container mx-auto">
          <div className="max-w-sm mx-auto md:max-w-lg mb-32">
            <div className="w-full">
              <div className="bg-white border-2 border-primary h-auto py-3 rounded text-center">
                <h1 className="text-2xl text-primary_800 mt-4  font-bold">
                  Vérification d'email
                </h1>
                <div className="flex flex-col text-primary_800 mt-4">
                  <span>Entrez le code que vous avez reçu</span>
                </div>

                <div
                  id="otp"
                  className="flex flex-row justify-center text-center px-2 mt-5"
                >
                  <form onSubmit={handleSubmit}>
                    <input
                      className="m-2 border h-10 w-10 text-center  form-control rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      type="text"
                      id="1"
                      maxLength="1"
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      type="text"
                      id="2"
                      maxLength="1"
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      type="text"
                      id="3"
                      maxLength="1"
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      type="text"
                      id="4"
                      maxLength="1"
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      type="text"
                      id="5"
                      maxLength="1"
                    />
                    <input
                      className="m-2 border h-10 w-10 text-center form-control rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      type="text"
                      id="6"
                      maxLength="1"
                    />
                    <div className="flex justify-center text-center mt-5 mb-5">
                      <button
                        className="px-6 h-12 transition ease-in duration-200 text-primary rounded-2xl hover:bg-primary hover:text-white border-2 border-primary focus:outline-none"
                        type="submit"
                      >
                        Vérifier
                      </button>
                    </div>

                    <div className="flex flex-col underline cursor-pointer text-primary_800 mt-4 mb-4">
                      <p
                        onClick={() => {
                          localStorage.removeItem("jwt");
                          return navigate("/login");
                        }}
                      >
                        Retour à la page login
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Confirmation;
