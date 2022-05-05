import ListSelect from "../components/List_select";
import Navbar from "../components/Navbar";

function Patinet() {
  return (
    <div>
      <Navbar edit="hidden" patient="patient" />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-5 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-3/5 justify-center items-start md:text-left">
            <p className="text-2xl font-medium mb-8 text-darker_grey">
              Prochaines disponibilités :
            </p>

            <div className="md:flex md:flex-row">
              <p className="font-medium text-xl text-darker_grey p-2">
                Spécialité
              </p>
              <ListSelect />
              <p className="font-medium text-xl text-darker_grey p-2 md:pl-10">
                Prix
              </p>
              <ListSelect />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Patinet;
