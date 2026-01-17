"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { BackgroundRippleEffect } from "../components/ui/BackgroundRippleEffect";
import FlowingMenu from "../components/ui/FlowingMenu";
import ParticleBackground from "../components/ui/ParticleBackground";
import MagneticButton from "../components/ui/MagneticButton";
import FloatingElement from "../components/ui/FloatingElement";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import CircularText from "../components/ui/CircularText";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const eventDate = new Date(2026, 2, 15, 0, 0, 0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const demoItems = [
    { link: "#", text: "", image: "./logo.png" },
  ];

  return (
    <div className="w-full min-h-screen relative bg-black">
      {/* Hero Section */}
      <div className="w-full h-screen relative overflow-hidden bg-black">
        {/* Background layers */}
        <BackgroundRippleEffect
          backgroundImage="./bg.png"
          backgroundOpacity={0.7}
        />
        <ParticleBackground
          particleCount={80}
          color="white"
          minSize={1}
          maxSize={3}
        />

        {/* Navigation */}
        <div className="relative h-15 z-50">
          <FlowingMenu items={demoItems} />
        </div>

        {/* Floating Planet with Circular Text */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <FloatingElement
            floatIntensity={15}
            duration={8}
            enableParallax={false}
          >
            <CircularText
              text="XPECTO*2026*BIGGEST*TECHFEST*"
              onHover="speedUp"
              spinDuration={10}
              textOffset={60}
              fontSize="text-2xl"
              className="w-213.25 h-197.75"
            >
              <motion.img
                src="./home_planet.png"
                alt="Planet"
                className="w-full h-full object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </CircularText>
          </FloatingElement>
        </div>

        {/* Hero Title with Shimmer */}
        <div
          className="flex w-280 h-63.75 justify-center items-center font-['Michroma'] text-[84px] font-normal leading-[119.438px] text-white tracking-[110.04px] absolute top-32 left-1/2 -translate-x-1/2 text-center z-13"
          shimmerWidth="300px"
          shimmerColor="rgba(255, 255, 255, 0.9)"
          duration={4}
        >
          XPECTO
        </div>

        {/* Subtitle with enhanced animation */}
        <motion.span
          className="flex w-232.5 h-8.5 justify-center items-center font-['Roboto'] text-[24px] font-bold leading-[32.813px] text-white absolute top-85 left-1/2 -translate-x-1/2 text-center whitespace-nowrap z-11"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            type: "spring",
            stiffness: 100
          }}
        >
          BIGGEST TECHFEST OF HIMALAYAS
        </motion.span>

        {/* Countdown and CTA section */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-32 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {/* Animated Countdown */}
          <div className="flex gap-6 justify-center items-center mb-5">
            <AnimatedCounter value={timeLeft.days} label="DAYS" />
            <AnimatedCounter value={timeLeft.hours} label="HOURS" />
            <AnimatedCounter value={timeLeft.minutes} label="MINUTES" />
            <AnimatedCounter value={timeLeft.seconds} label="SECONDS" />
          </div>

          {/* Event Date */}
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <p className="font-['Roboto'] text-lg font-bold text-white/90 tracking-widest">
              MARCH 15-17, 2026
            </p>
          </motion.div>

          {/* Magnetic CTA Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <MagneticButton magnetStrength={0.3}>
              LEARN MORE
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}