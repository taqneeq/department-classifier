"use client"
import { useState } from 'react';
import Image from 'next/image'
import GradientProgress from './components/GradientProgress';

export default function Home() {
  return (
    <div className="w-full flex justify-center flex-col gap-y-12 items-center mt-20 md:mt-12 shadow-lg">
      <h1 className="w-2/3 bg-none lg:w-2/3 text-3xl md:text-5xl lg:text-6xl mx-auto text-white opacity-80 font-gameplay text-wrap text-center">Let's find your department</h1>
      <div className="w-[90%] md:w-1/2 text-4xl h-1/3 mx-auto bg-white bg-opacity-5 backdrop-blur-md rounded-2xl font-joganSoft bg-noise">
        <form className="text-white opacity-80 p-6 flex flex-col gap-y-8">
          <div className='text-2xl md:text-4xl font-medium'>1. Do you have any skills?</div>
          <GradientProgress/>
        </form>
        <div className='flex gap-x-16 justify-center pb-8 pt-3'>
          <div className='flex w-12 h-12 md:w-14 md:h-14 p-2 bg-white shadow-lg opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise'>
            <Image
              src="/Arrow.svg"
              width={50}
              height={50}
              alt='Previous Question'
              className='justify-center align-middle mx-auto my-auto size-6 md:size-10'
            />
          </div>
          <div className='flex w-12 h-12 md:w-14 md:h-14 p-2 bg-white shadow-lg opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise rotate-180'>
            <Image
              src="/Arrow.svg"
              width={50}
              height={50}
              alt='Previous Question'
              className='justify-center align-middle mx-auto my-auto size-6 md:size-10'
            /> 
          </div>
        </div>
      </div>
    </div>
  );
}
