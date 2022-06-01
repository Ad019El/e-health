import { Navigate } from "react-router-dom";
import { getUserType } from "../Auth";
import MesPatieints from "./Mes_patients";

function Medecin() {
  if (getUserType() !== "medecin") return <Navigate to="/login" />;
  return (
    <>
      <MesPatieints />
    </>
  );
}

export default Medecin;
