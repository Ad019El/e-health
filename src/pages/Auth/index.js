const axios = require("axios");
const API = `http://${process.env.REACT_APP_SERVER_IP}`;

//get patients
// exports.getEmployees = () => {
//     return axios
//         .get(`${API}/employee`, {
//             headers: {
//                 Authorization: `Bearer ${
//           JSON.parse(localStorage.getItem("jwt")).token
//         }`,
//             },
//         })
//         .then((result) => result.data)
//         .catch((err) => {
//             console.log("Error: ", err);
//         });
// };

//login
exports.login = (email, password) => {
  const json = {
    email: email,
    password: password,
  };
  axios
    .post(`${API}/api/signin`, json)
    .then((result) => {
      this.authenticate(result.data);
      return true;
    })
    .catch((error) => {
      return false;
    });
};

//save authentication infos in local storage
exports.authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
  }
};

//signout
exports.signout = () => {
  if (typeof window != "undefined") {
    localStorage.removeItem("jwt");
    return axios
      .post(`${API}/api/signout`)
      .then((result) => {
        console.log("Signout: ", result);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }
};

//is Authenticate
exports.isAuthenticate = () => {
  if (typeof window == "undefined") return false;
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  return false;
};

//get user type
exports.getUserType = () => {
  if (!localStorage.getItem("jwt")) return false;
  return JSON.parse(localStorage.getItem("jwt")).user.type;
};
//add new patient
// exports.addEmployee = (nom, prenom, email, telephone, poste, image) => {
//     let data = new FormData();
//     data.append("image", image, nom + " " + prenom);
//     data.append("nom", nom);
//     data.append("prenom", prenom);
//     data.append("email", email);
//     data.append("telephone", telephone);
//     data.append("poste", poste);

//     axios
//         .post(`${API}/employee/add`, data, {
//             headers: { "Content-Type": "multipart/form-data" },
//         })
//         .then((response) => {
//             console.log("response: ", response);
//             refreshUsers();
//         })
//         .catch((err) => console.log("err: ", err));
// };

//get patient
// exports.getEmployee = (id) => {
//     return axios
//         .get(`${API}/employee/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${
//           JSON.parse(localStorage.getItem("jwt")).token
//         }`,
//             },
//         })
//         .then((result) => result)
//         .catch((err) => console.log(err));
// };

//make reservation
// exports.markAttendance = (id) => {
//     return axios
//         .post(`${API}/scan/add`, { employee_id: id })
//         .then((result) => result.data)
//         .catch((err) => err);
// };

//base64 String to ArrayBuffer
function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

//refresh users in localstorage
// function refreshUsers() {
//     axios
//         .get(`${API}/employee`, {
//             headers: {
//                 Authorization: `Bearer ${
//           JSON.parse(localStorage.getItem("jwt")).token
//         }`,
//             },
//         })
//         .then((result, err) => {
//             if (err) {
//                 console.log("error: ", err);
//                 return;
//             }
//             var usersData = [];
//             console.log("data: ", result);
//             result.data.employees.map((employee) => {
//                 usersData.push({
//                     id: employee._id,
//                     name: `${employee.nom} ${employee.prenom}`,
//                     registered: employee.created_at.substring(0, 10),
//                     role: employee.poste,
//                     status: "Pending",
//                     img: `data:image/png;base64,${employee.image}`,
//                 });
//             });
//             localStorage.setItem("users", JSON.stringify(usersData));
//         });
// }
