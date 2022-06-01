import { useNavigate } from "react-router-dom";
function DoctorCardInfo(props){
    let navigate = useNavigate();
    return(
        <>
        <div class="shadow-md rounded-2xl w-64 p-4 py-6 bg-white">
        <div class="flex flex-col items-center justify-center">
            <div class="w-24 h-24  ">
                <img className="rounded-full" src={props.profile} alt="profile"/>
            </div>
            <p class="text-gray-800 text-xl text-center font-medium mb-2 mt-4">
                {props.name}
            </p>
            <p class="text-gray-400 text-center text-xs px-2">
                {props.specialite}
            </p>
            <p class="text-gray-800 text-xl text-center font-medium mb-2 mt-4">
                {props.prix}
            </p>

            <button
            className="px-6 mt-2 h-12 transition ease-in duration-200  text-primary rounded-2xl hover:bg-primary hover:text-white border-2 border-primary focus:outline-none"
            onClick={() => {
                navigate("/InfoMed", {state : {name: props.name, specialite: props.specialite, id: props.id}});
            }}
          >
            Voir l’agenda 
          </button>
        </div>
    </div>
        </>
    );
    }
    export default DoctorCardInfo;