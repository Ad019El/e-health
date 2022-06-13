import Footer from "../../components/Footer";
import AccountAdmin from "./Account_admin";
import AccountMedecin from "./Account_medecin";
import AccountPatient from "./Account_patient";

let userID = "";
if (JSON.parse(localStorage.getItem("jwt")))
  userID = JSON.parse(localStorage.getItem("jwt")).user.type;

export default function Account() {
  return (
    <>
      {userID === "patient" && <AccountPatient />}
      {userID === "medecin" && <AccountMedecin />}
      {userID === "admin" && <AccountAdmin />}
      <Footer />
    </>
  );
}
