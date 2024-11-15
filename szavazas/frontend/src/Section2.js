import React from 'react';
import './Section2.css'; // Ha van saját CSS fájlod a Section2-hez
import { Link } from 'react-router-dom';

const Section2 = () => {
  return (
    <div className="bg-indigo-100 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Készen áll dönteni a jövőről?<br />
          Adja le szavazatát most.
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <a href="/create/#poll" className="button is-primary">
            Információk a szavazásról
          </a>
          <Link to ="/login" className="text-sm font-bold leading-6 text-gray-900 dark:text-white">
            Bejelentkezés<span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section2; // Ez szükséges
