import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_esante.png";

export default function Navbar(props) {
  let navigate = useNavigate();
  return (
    <>
      {/* navigation bar */}
      <div className="mx-auto p-4 lg:px-16 px-5 flex flex-row justify-between bg-white sticky top-0 z-50">
        <img className="h-14" src={logo} alt="logo" />
        <button className={` ${props.hide} px-6 h-12 transition ease-in duration-200  text-primary rounded-2xl hover:bg-primary hover:text-white border-2 border-primary focus:outline-none`} 
        onClick={()=>{navigate('/login',{replace: true})}}>
          Connexion
        </button>
      </div>
    </>
  );
}
