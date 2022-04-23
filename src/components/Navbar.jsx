import logo from "../assets/logo_esante.png";

export default function Navbar() {
  return (
    <>
      <div className="bg-[#343443] text-right p-1">
        <a
          className="pr-2 text-white active:bg-slate-400 group- hover:bg-slate-400 hover:p-1.5 hover:pr-2"
          href="#"
        >
          Vous êtes patient
        </a>
        <a
          className="pl-2 pr-5 text-white active:bg-slate-400 hover:bg-slate-400 hover:p-1.5 hover:pr-5 hover:pl-2"
          href="#"
        >
          Vous êtes patient
        </a>
      </div>

      {/* navigation bar */}
      <div className="mx-auto p-4 lg:px-16 px-5 flex flex-row justify-between bg-white sticky top-0 z-50">
        <img className="h-14" src={logo} alt="logo" />
        <button className=" px-6 h-12 transition ease-in duration-200  text-primary rounded-2xl hover:bg-primary hover:text-white border-2 border-primary focus:outline-none">
          Connexion
        </button>
      </div>
    </>
  );
}
