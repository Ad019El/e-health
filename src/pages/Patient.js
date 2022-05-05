import DoctorCardInfo from "../components/DoctorCardInfo";
import ListSelect from "../components/List_select";
import Navbar from "../components/Navbar";
import profile from "../assets/profile.png";
import Footer from "../components/Footer";

const specialite = [
  { name: "Orthopédie" },
  { name: "Radiologie" },
  { name: "Pneumologie" },
  { name: "Hématologie" },
  { name: "Gériatrie" },
  { name: "endocrinologie" },
];

const prix = [{ name: "1500 DA " }, { name: "2000 DA" }, { name: "2500 DA" }];
function Patinet() {
  return (
    <div>
      <Navbar edit="hidden" patient="patient" />
      <div className="lg:p-10 lg:px-40 p-5 pt-18">
        <div className="container px-3 mb-5 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full justify-center items-start md:text-left">
            <p className="text-2xl font-medium mb-8 text-darker_grey">
              Prochaines disponibilités :
            </p>

            <div className="md:flex md:flex-row mb-20">
              <p className="font-medium text-xl text-darker_grey p-2">
                Spécialité
              </p>
              <ListSelect items={specialite} />
              <p className="font-medium text-xl text-darker_grey p-2 md:pl-10">
                Prix
              </p>
              <ListSelect items={prix} />
            </div>
          </div>
        </div>
        <div className="mb-10 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-8 place-items-center">
          <DoctorCardInfo
            profile={profile}
            name="Dr Michel FROMENT"
            specialite="Médecin Généraliste"
            prix="2300 DA"
          />
          <DoctorCardInfo
            profile={profile}
            name="Dr Michel FROMENT"
            specialite="Médecin Généraliste"
            prix="2300 DA"
          />
          <DoctorCardInfo
            profile={profile}
            name="Dr Michel FROMENT"
            specialite="Médecin Généraliste"
            prix="2300 DA"
          />
          <DoctorCardInfo
            profile={profile}
            name="Dr Michel FROMENT"
            specialite="Médecin Généraliste"
            prix="2300 DA"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default Patinet;
