"use client";

import Link from "next/link";
import { Recycle, Search, Leaf } from "lucide-react";
import { useState } from "react";

export default function Error404Page() {

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6fbf7] flex items-center justify-center px-6">

      {/* SOFT BLOBS */}
      <div className="absolute top-[-120px] left-[-100px] w-[300px] h-[300px] bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-80px] w-[280px] h-[280px] bg-lime-200/40 rounded-full blur-3xl" />

      {/* FLOATING LEAVES */}
      <Leaf className="absolute top-20 left-10 text-emerald-300 w-8 h-8 animate-bounce" />
      <Leaf className="absolute bottom-24 left-24 text-green-300 w-6 h-6 animate-pulse" />
      <Leaf className="absolute top-32 right-16 text-lime-300 w-7 h-7 animate-bounce delay-300" />

      <div className="relative z-10 max-w-2xl text-center">

        {/* EARTH + RECYCLE */}
        <div className="relative flex justify-center items-center">

          {/* EARTH */}
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 shadow-2xl flex items-center justify-center relative overflow-hidden">
            
            {/* Continents */}
            <div className="absolute w-16 h-10 bg-green-800 rounded-full top-8 left-6 rotate-12 opacity-70" />
            <div className="absolute w-10 h-8 bg-green-800 rounded-full bottom-8 right-8 rotate-45 opacity-70" />

            {/* Recycle Icon */}
            <div className="absolute animate-spin-slow">
              <Recycle className="w-16 h-16 text-white drop-shadow-lg" />
            </div>
          </div>
        </div>

        {/* 404 */}
        <div className="mt-10 text-8xl font-black tracking-tight text-emerald-600">
          404
        </div>

        {/* TITLE */}
        <h1 className="mt-4 text-4xl font-bold text-slate-900 leading-tight">
          Oops! This page has been recycled
        </h1>

        {/* DESC */}
        <p className="mt-5 text-slate-500 text-lg leading-relaxed">
          Looks like the page you’re searching for was moved,
          removed, or sent back for recycling.
          Let’s help you find something useful instead.
        </p>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 shadow-sm"
          >
            Back Home
          </Link>
        </div>

        {/* FOOT NOTE */}
        <p className="mt-10 text-xs text-slate-400">
          Nothing goes to waste ♻️
        </p>
      </div>

      {/* CUSTOM ANIMATION */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}