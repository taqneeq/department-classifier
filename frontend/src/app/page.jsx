"use client"
import { useState } from 'react';
import Image from 'next/image'
import GradientProgress from './components/GradientProgress';

export default function Home() {
  return (
    <div className="flex justify-center flex-col gap-y-12 items-center mt-20">
      <h1 className="w-2/3 text-6xl mx-auto text-white opacity-80 font-gameplay text-wrap text-center">Let's find your department</h1>
      <div className="w-1/2 text-4xl h-1/3 mx-auto bg-white bg-opacity-5 backdrop-blur-md rounded-2xl font-joganSoft bg-noise">
        <form className="text-white opacity-80 p-6 flex flex-col gap-y-8">
          <div className='text-4xl'>1. Do you have any skills?</div>
          <GradientProgress/>
        </form>
        <div className='flex gap-x-16 justify-center pb-8 pt-3'>
          <div className='flex w-14 h-14 p-2 bg-white opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise'>
            <Image
              src="/Arrow.svg"
              width={50}
              height={50}
              alt='Previous Question'
              className='justify-center align-middle'
            />
          </div>
          <div className='flex w-14 h-14 p-2 bg-white opacity-100 bg-opacity-5 backdrop-blur-md rounded-xl bg-noise rotate-180'>
            <Image
              src="/Arrow.svg"
              width={50}
              height={50}
              alt='Previous Question'
              className='justify-center align-middle'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
