import React from 'react';
import './Section1.css';
import probaImage from './images/proba.jpg';
import { Link } from 'react-router-dom';

const Section = () => {
  return (
    <div className="flex-auto">
      <br />
      <br />
      <div className="relative mt-8">
        <br />
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="relative shadow-xl rounded-2xl overflow-hidden bg-indigo-50 dark:bg-gray-900">
            <div className="dark:hidden dark:sm:block absolute inset-0">
              {/* Itt használjuk a probaImage változót a helyes képforráshoz */}
              <img className="h-full w-full object-cover" src={probaImage} alt="Szavazó kép" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 dark:from-gray-700 dark:to-gray-600 mix-blend-multiply"></div>
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:pt-28 lg:pb-32 lg:px-8">
              <h1 className="text-center sm:text-left text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl sm:ml-12">
                <span className="block text-white">Szavazzon most</span>
                <span className="block text-indigo-300">otthonról</span>
              </h1>
              <p className="mt-6 max-w-sm mx-auto sm:ml-12 text-center sm:text-left text-lg sm:text-xl text-indigo-200 sm:max-w-2xl">
                Az online szavazás megkönnyíti a részvételt, lehetővé téve, hogy mindenki otthonról, kényelmesen szavazzon, így növelve a demokratikus folyamatokhoz való hozzáférést és a választási részvételt.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-begin">
                <div className="sm:ml-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="vote.html" className="flex items-center justify-center rounded-md border border-transparent bg-white px-3 py-2 text-base font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 sm:px-6">
                    Szavazok
                  </a>
                  <Link to="/login" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-500 bg-opacity-60 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-6">Bejelentkezés </Link>
                </div>
              </div>
              <div className="hidden sm:block ml-12 text-sm mt-4 text-indigo-200">Regisztráljon vagy jelentkezzen be ha már van fiókja.</div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Section;
