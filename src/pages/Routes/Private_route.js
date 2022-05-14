import React from "react";
import { isAuthenticate } from "../Auth";
import { Route, Navigate, useNavigate, Routes } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const navigate = useNavigate();
  return !isAuthenticate() ? <Navigate to="/login" /> : <Component />;
};
export default PrivateRoute;

// const PrivateRoute = ({

//     return(
//         <Route render={(props) =>
//         loading ? (
//           <div className='my-5 text-center'>
//             <Spinner />
//           </div>
//         ) : !isAuthenticated ? (
//           <Redirect to='/login' />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//     );

//     // return(
//     //     <Route
//     //     render={(props)=>{

//     //     !isAuthenticate() ? (
//     //         <Navigate to='/login' />
//     //       ) : (
//     //         <Component {...props} />
//     //       )
//     // }});/>

// });
