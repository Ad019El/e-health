import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { authenticate, getUserType, isAuthenticate } from "./index";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const axios = require("axios");

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`http://${process.env.REACT_APP_SERVER_IP}/api/signin`, {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((result) => {
        // const user = result.data.user;
        // localStorage.setItem("jwt", result.data.token);
        authenticate(result.data);
        window.location.reload(false);
        if (getUserType() === "patient") return <Navigate to="/patient" />;
        else if (getUserType() === "medecin") return console.log("medecin");
        else if (getUserType() === "admin") return console.log("admin");
        else return <Navigate to="/login" />;
      })
      .catch((error) => {
        return console.log(error);
      });
  };
  if (isAuthenticate()) {
    if (getUserType() === "patient") return <Navigate to="/patient" />;
    else if (getUserType() === "medecin") return console.log("medecin");
    else if (getUserType() === "admin") return console.log("admin");
    else return <Navigate to="/login" />;
    // navigate("/patient");
  } else
    return (
      <>
        <Navbar edit="invisible" landing_phone_hide="invisible" homepath="/" />

        <div class="shadow w-50 h-50   bg-teal-40 justify-center ">
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-1">
            <div className="max-w-xs w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-Montserrat text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="   text-primary  font-normal font-Montserrat  "
                  >
                    Creat account !
                  </button>
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleClick}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md rounded-full shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none 
                  rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <br></br>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center"></div>

                  <div className="text-sm">
                    <a href="#" className=" text-blue-700 leading-normal">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border  text-sm font-medium rounded-md text-whitepx-6 h-12 transition ease-in duration-200  text-white rounded-2xl bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none "
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}
export default Login;
