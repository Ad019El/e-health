import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const axios = require("axios");
const API = `https://${process.env.REACT_APP_SERVER_IP}`;
export default function ImageriePatient() {
  return (
    <>
      <Navbar
        edit="hidden"
        type="patient"
        homepath="/imagerie"
        imagerie="text-darker_grey"
      />
      <div class="shadow w-50 h-50 bg-teal-40 justify-center ">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-1">
          <div className="max-w-xs w-full space-y-8">
            <p className="font-medium text-3xl mb-10 text-darker_grey p-2 md:pl-10">
              Imagerie
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("file", e.target.dcom.value);
                try {
                  axios({
                    method: "post",
                    url: `https://192.168.43.150:8001/api/push`,
                    data: formData,
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  }).then((result) => {
                    console.log("success", result);
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <></>
              <div className="mb-3 w-96 ">
                <label for="formFile" className="form-label ">
                  Télécharger votre photo
                </label>

                <input
                  type="file"
                  name="dcom"
                  accept="*/dicom,.dcm, image/dcm, */dcm, .dicom"
                  class="block cursor-pointer w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4  text-sm font-medium text-whitepx-6 h-12 transition ease-in duration-200  text-white rounded-2xl bg-primary hover:bg-transparent hover:text-primary border-2 border-primary focus:outline-none"
              >
                Envoier
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
