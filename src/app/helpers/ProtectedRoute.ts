import React from 'react'
// import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {



  const { authToken } = useSelector((state) => state.userSlice);
  console.log("User Token ==== ", token);
  let Token = token ? true : false;
  console.log("Token Status===", authToken);
  return Token == false ? <Navigate to=  " /">
};



  


export default ProtectedRoute
