"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BackgroundRippleEffect } from "../components/ui/BackgroundRippleEffect";
import FlowingMenu from "../components/ui/FlowingMenu";
export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const eventDate = new Date(2026, 2, 15, 0, 0, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const demoItems = [{ link: "#", text: "", image: "./logo.png" }];
  return (
    <div className="w-full min-h-screen relative bg-black">
      {/* Hero div */}
      <div className="w-full h-screen relative overflow-hidden bg-black">
        <BackgroundRippleEffect
          backgroundImage="./bg.png"
          backgroundOpacity={0.7}
        />
        <div className="relative  h-15 z-50">
          <FlowingMenu items={demoItems} />
        </div>
        <div className="w-213.25 h-197.75 absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <img
            src="./home_planet.png"
            alt="Planet"
            className="w-full h-full object-contain relative z-10"
          />
        </div>

        <motion.span
          className="flex w-280 h-63.75 justify-center items-center font-['Michroma'] text-[84px] font-normal leading-[119.438px] text-white tracking-[110.04px] absolute top-32 left-1/2 -translate-x-1/2 text-center z-13"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          XPECTO
        </motion.span>

        <motion.span
          className="flex w-232.5 h-8.5 justify-center items-center font-['Roboto'] text-[24px] font-bold leading-[32.813px] text-white absolute top-85 left-1/2 -translate-x-1/2 text-center whitespace-nowrap z-11"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          BIGGEST TECHFEST OF HIMALAYAS
        </motion.span>

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-32 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="flex gap-6 justify-center items-center mb-5">
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-5 py-3 min-w-22.5">
                <span className="font-['Michroma'] text-4xl font-bold text-white">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
              </div>
              <span className="font-['Roboto'] text-xs font-bold text-white/80 mt-2 tracking-wider">
                DAYS
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-5 py-3 min-w-22.5">
                <span className="font-['Michroma'] text-4xl font-bold text-white">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
              </div>
              <span className="font-['Roboto'] text-xs font-bold text-white/80 mt-2 tracking-wider">
                HOURS
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-5 py-3 min-w-22.5">
                <span className="font-['Michroma'] text-4xl font-bold text-white">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
              </div>
              <span className="font-['Roboto'] text-xs font-bold text-white/80 mt-2 tracking-wider">
                MINUTES
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-5 py-3 min-w-22.5">
                <span className="font-['Michroma'] text-4xl font-bold text-white">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
              <span className="font-['Roboto'] text-xs font-bold text-white/80 mt-2 tracking-wider">
                SECONDS
              </span>
            </div>
          </div>

          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <p className="font-['Roboto'] text-lg font-bold text-white/90 tracking-widest">
              MARCH 15-17, 2026
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <button className="group relative px-8 py-3 font-['Michroma'] text-sm font-bold text-white tracking-widest overflow-hidden border-2 border-white/30 rounded-lg hover:border-white/60 transition-all duration-300">
              <span className="relative z-10">LEARN MORE</span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
