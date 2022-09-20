import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import profile from "../assets/profile.png";
import { base64_encode, signout } from "../pages/Auth/index";

const axios = require("axios");
const API = `https://${process.env.REACT_APP_SERVER_IP}`;

let userType = "";
let userID = "";
if (JSON.parse(localStorage.getItem("jwt"))) {
  userType = JSON.parse(localStorage.getItem("jwt")).user.type;
  userID = JSON.parse(localStorage.getItem("jwt")).user._id;
}

export default function Dropdown() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `${API}/api/${userType}/photo/${userID}`,
      responseType: "stream",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("jwt")).token
        }`,
      },
    })
      .then((result) => {
        // setIsloading(true);

        setProfile(result.data.image);

        // setIsloading(false);
      })
      .catch((err) => console.log("error -------", err));
  }, []);
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md hover:opacity-70  mx-2 py-2 text-sm font-medium text-black  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <img
              className="w-10 rounded-full"
              alt="profile"
              src={`data:image/jpeg;base64, ${profile}`}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-primary text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => {
                      navigate("/account");
                    }}
                  >
                    Account
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={signout}
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
