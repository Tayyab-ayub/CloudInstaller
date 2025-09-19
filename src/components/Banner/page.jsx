"use client"
import React, { useEffect, useRef } from 'react'
import Section from '../Section/page'
import Testimonials from '../Testimonials/page'
import { AppConstants } from '../../app/helpers/AppConstants'
import { fadeLeft, fadeUp, waveText } from '../../app/utilis/animation'
import { useSelector } from 'react-redux'

const Page = ()=>{
    const {fileProgress } = useSelector((state) => state.userSlice);

  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const textWaveRef = useRef(null);
  useEffect(() => {
    fadeUp(headingRef.current);
    fadeLeft(imageRef.current);

    if (textWaveRef.current) {
      const letters = textWaveRef.current.querySelectorAll("span");
      waveText(letters);
    }
  }, []);

  
  return (
    <>

      <section className="relative font-sans bg-gradient-to-r from-violet-200 to-violet-200 my-[40px] pt-[80px] pb-[80px] md:px-10 lg:pl-[150px] max-w-[18850px]">
        <div className="container mx-auto px-4 ">
          <div className="flex flex-col md:flex-row">

            {/* Left Column */}
            <div className="md:w-1/2 text-black p-2  space-y-4">
              <div ref={textWaveRef} className="mb-3 uppercase text-black text-4xl font-extrabold leading-tight">
                {AppConstants.Banner.split("").map((char, i) => (
                  <span key={i} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
              <div className="pt-3 text-black text-lg font-medium">
                {AppConstants.Bannerparagraph}
              </div>
              <div className="pt-3 text-black text-lg font-medium">
                {AppConstants.Bannerdescription}
              </div>
              <a
                href="/SignUp"
                className="inline-block font-bold mx-auto mt-10 px-6 py-2 text-purple-400 bg-white rounded-full hover:underline"
              >
                {AppConstants.Bannerbutton}
              </a>
            </div>

            {/* Right Column */}
            <div className="flex md:w-1/2 justify-center font-bold text-center">
              <img
                ref={imageRef}
                className="max-w-[400px]  mt-[-10px] mb-0"
                src="/images/MOCKER-removebg-preview.png"
                alt="mobileImage"
              />
            </div>
          </div>
        </div>

      </section>

      <Section />
      <Testimonials />
    </>


  )
}

export default Page
