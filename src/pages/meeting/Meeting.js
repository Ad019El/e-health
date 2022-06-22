import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
const axios = require("axios");
const API = `http://${process.env.REACT_APP_SERVER_IP}`;

let userType = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userType = JSON.parse(localStorage.getItem("jwt")).user.type;

export const useEffectOnce = (effect) => {
  const destroyFunc = useRef();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal((val) => val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
};

export default function Video({ match }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);

  const params = useParams();
  const id = params.id;

  useEffectOnce(() => {
    const domain = "https://e-health.daily.co/";

    axios
      .get(`${API}/api/meeting/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const script = document.createElement("script");

          script.innerHTML = `window.DailyIframe.createFrame({
            iframeStyle: {
              
              width: "100%",
              height: "100%",
              border: "0",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${id}",
          });`;

          document.body.appendChild(script);
        }
        console.log(`${domain}${id}`);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="fixed top-0 z-50 w-full">
      <Navbar edit="hidden" type={userType} homepath={`/${userType}`} />
    </div>
  );
}
