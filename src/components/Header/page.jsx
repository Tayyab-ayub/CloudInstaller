"use client"
import React from 'react'
import { AppConstants } from '../../app/helpers/AppConstants'
// import Login from '../../app/Login/page'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import { logout } from '../../app/redux/slices/userSlice'
import Link from 'next/link';

function page() {
  // The UI should be driven by the Redux state, not by directly reading cookies.
  const { authToken } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
      // 1. Clear the Redux state
      dispatch(logout());
      // 2. Remove the auth token cookie
      Cookies.remove('authToken');
      // 3. Redirect to the home page
      router.push('/Dashboard');
  };

  return (

    <nav className="relative bg-[#f6f8f5] after:pointer-events-none font-serif shadow-[0_0_10px_0_#00000026] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button type="button" command="--toggle" commandfor="mobile-menu" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5"></span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 in-aria-expanded:hidden">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 not-in-aria-expanded:hidden">
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img src="/icons/cloud-installer-img.png" alt="Your Company" className="h-auto w-auto" />
            </div>
            <div className="hidden sm:block ml-auto">
              <div className="flex space-x-4">
                {/* Use Link for client-side navigation to prevent full page reloads */}
                <Link href="/" aria-current="page" className="px-3 py-2 font-medium  text-black hover:text-violet-300">{AppConstants.features}</Link>
                <Link href="/FAQ" className="px-3 py-2 font-medium text-black  hover:text-violet-300">{AppConstants.FAQ}</Link>
                {
                  !authToken ?  <>
                    <Link href="/Login" className="px-3 py-2 font-medium text-black hover:text-violet-300">{AppConstants.login}</Link>
                    <Link href="/SignUp" className="inline-block rounded-full border border-[#815390] px-6 py-2 font-medium text-black shadow-[ -3.032px_10.574px_16px_0px_rgba(0,0,0,0.15) ]">{AppConstants.Register}</Link>
                  </> : 
                  <>
                    <Link href="/Dashboard" className="px-3 py-2 font-medium text-black hover:text-violet-300">{'Dashboard'}</Link>
                    <button 
                      onClick={handleLogout} 
                      className="px-3 py-2 font-medium text-black hover:text-violet-300">Logout</button>
                  </>
                }
              </div>
            </div>
          </div>

        </div>
      </div>


    </nav>

  )
}

export default page
