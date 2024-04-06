import { useCeramicContext } from '@/context';
import { AuthContext } from '@/context/auth';
import { fillDatabaste } from '@/utils/db';
import React, { useContext, useEffect } from 'react'
import { Movies } from '../movies';
import { useRouter } from 'next/navigation';

const Home = () => {
  const { composeClient } = useCeramicContext();
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if(isLoggedIn){
      setTimeout(() => {
        // fillDatabaste(composeClient).then((res) => {
        //   console.log("Filled database");
        // }).catch(e => console.log("Error: ", e))
      }, 1000) // Wait for auth
    }
  }, [composeClient, isLoggedIn]);

  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-300 dark:hover:ring-gray-200 dark:text-gray-100">
          Part of the Descentralized Inteligence S2 Hackathon.{" "}
          <a
            href="https://learnweb3.io/hackathons/decentralized-intelligence-season-2"
            className="font-semibold text-indigo-600"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            Read <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-200">
          Get your recommendations safely!
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-100">
          Tell us what you like and get recommended items based on your taste in movies, books or any item,
           all without sending your data to centralized backends and hoping it does not get sold.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/process/`);
            }}
            className="rounded-full bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started
          </button>
        </div>
      </div>
      <Movies></Movies>
    </div>
  )
}

export default Home;