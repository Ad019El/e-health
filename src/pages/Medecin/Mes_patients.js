import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TableItem from "../../components/TableItem";
import { getUserType } from "../Auth";

function Mes_patieints() {
  if (getUserType() !== "medecin") return <Navigate to="/login" />;

  return (
    <>
      <Navbar
        edit="hidden"
        type="medecin"
        homepath="/medecin"
        mespatient={"text-darker_grey"}
      />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-start md:text-left">
            <p className="font-medium text-3xl mb-10 text-darker_grey p-2 md:pl-10">
              Mes Patients
            </p>
            <>
              <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nom et Prénom
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date de rendez-vous
                      </th>
                      <th scope="col" className="px-6 py-3">
                        La durée
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Dossier Médical
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Prendre un Rendez-vous
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <TableItem
                        fullname={"DAFI Adel"}
                        date={"1212/12/12"}
                        duree={"15 min"}
                      />
                      <td className="px-6 py-4 ">
                        <button className="px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">
                          Afficher le dossier
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-1 text-sm text-green-400 bg-green-200 rounded-full">
                          Meet
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mes_patieints;
