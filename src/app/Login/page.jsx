"use client"
import React, {useState} from 'react'

import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";
import { unwrapResult } from '@reduxjs/toolkit';
import {toast} from 'react-hot-toast'
import { setAuthToken } from '../redux/slices/userSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function page() {
     const dispatch = useDispatch();
     const router = useRouter();
//   const { loading, data, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors , setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.name) tempErrors.name = 'Username is required.';
//     if (!formData.email) {
//       tempErrors.email = 'Email is required.';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       tempErrors.email = 'Email is invalid.';
//     }
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("eeeeeee", e)
    //  validate();
    let signUpPayload = {
        username : 'johny', 
        firstName : 'john doe',
        lastName : 'doe john',
        email : "john@cloudinstaller.com",
        password : "Test@123456",
        is_social: false

    }
     let loginPayload = {
        username : 'Tayyab_Ayub', 
        password : "Test@1234",
        is_social: false

    }
  dispatch(loginUser(loginPayload))
  .then(unwrapResult) 
  .then((res) => {
    console.log("Api Response ----", res.data.token);
    let apiToken = res.data.token ?? null;

    toast.success("Login Successfully");

    // save to cookies
    Cookies.set("authToken", apiToken, { expires: 7 });

    // update redux
    dispatch(setAuthToken({ authToken: apiToken }));

    // redirect
    router.push("/Dashboard");
  })
  .catch((error) => {
    console.log("Api Error -----", error);
    toast.error(error?.message ?? "Something went wrong!");
  });
    

  };
    return (

        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img src="/icons/cloud-installer-img.png"
                            className="w-32 mx-auto" />
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">
                            Login
                        </h1>
                        <div className="w-full flex-1 mt-8">
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    Or sign up with e-mail
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="text" placeholder="Username"
                                    onChange={handleChange}
                                      {...errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                                     />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password" placeholder="Password" 
                                    onChange={handleChange}
                                     
                                     
                                    />
                                 

                                <button
                                    className="mt-5 
                                    tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                   
                                    onClick={handleSubmit}
                                    >
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Login
                                    </span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    If you don't have account! 
                                    
                                    <Link href = "/SignUp">Click here</Link>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"
                        }}
                        >

                    </div>
                </div>
            </div>
        </div>

    )
}



export default page
