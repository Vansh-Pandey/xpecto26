"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { BackgroundRippleEffect } from "../components/ui/BackgroundRippleEffect";
import FlowingMenu from "../components/ui/FlowingMenu";
import FloatingElement from "../components/ui/FloatingElement";

const ExhibitionCard = ({ exhibition, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto mb-12 overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={exhibition.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
        {/* Left Side - Main Image */}
        <motion.div
          className="relative w-full md:w-2/5 flex-shrink-0"
          animate={{ x: isHovered ? 10 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
            <motion.img
              src={exhibition.image}
              alt={exhibition.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 border-2 border-white/20 rounded-xl" />
          </div>
          
          {/* Decorative corner elements */}
          <motion.div
            className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400"
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400"
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Right Side - Content */}
        <div className="flex-1 space-y-4">
          <motion.div
            animate={{ x: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category Badge */}
            <motion.span
              className="inline-block px-4 py-1 mb-3 text-xs font-semibold tracking-wider text-cyan-400 border border-cyan-400/50 rounded-full bg-cyan-400/10"
              whileHover={{ scale: 1.05 }}
            >
              {exhibition.category}
            </motion.span>

            {/* Title */}
            <h3 className="font-['Michroma'] text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
              {exhibition.title}
            </h3>

            {/* Description */}
            <p className="font-['Roboto'] text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              {exhibition.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 mb-6">
              {exhibition.features.map((feature, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3 text-gray-400"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <span className="text-cyan-400 mt-1">▹</span>
                  <span className="font-['Roboto']">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Action Button */}
            <motion.button
              className="group relative px-8 py-3 font-['Roboto'] font-semibold text-white overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Explore More
                <motion.span
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Exhibitions() {
  const demoItems = [
    { link: "#", text: "XPECTO'26", image: "" },
  ];

  const exhibitions = [
    {
      title: "ROBOTICS SHOWCASE",
      category: "INNOVATION",
      image: "./exhibition1.png",
      backgroundImage: "./exhibition-bg1.png",
      description: "Witness the future of automation and artificial intelligence with cutting-edge robotic demonstrations. Experience interactive robots, autonomous systems, and the latest in mechanical engineering.",
      features: [
        "Live robot demonstrations and competitions",
        "Interactive AI-powered installations",
        "Hands-on workshops with industry experts"
      ]
    },
    {
      title: "SPACE TECH EXPO",
      category: "EXPLORATION",
      image: "./exhibition2.png",
      backgroundImage: "./exhibition-bg2.png",
      description: "Journey through the cosmos with our immersive space technology exhibition. Explore satellite systems, rocket propulsion, and the latest developments in space exploration.",
      features: [
        "Satellite model displays and demonstrations",
        "Virtual reality space missions",
        "Meet aerospace engineers and scientists"
      ]
    },
    {
      title: "GREEN ENERGY HUB",
      category: "SUSTAINABILITY",
      image: "./exhibition3.png",
      backgroundImage: "./exhibition-bg3.png",
      description: "Discover sustainable solutions for tomorrow's energy challenges. From solar innovations to wind power breakthroughs, explore the technologies shaping a greener future.",
      features: [
        "Renewable energy prototypes and models",
        "Sustainable tech startup presentations",
        "Environmental impact workshops"
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen relative bg-black">
      {/* Fixed Background Section */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <BackgroundRippleEffect
          backgroundImage="./bg.png"
          backgroundOpacity={0.5}
        />
        
        {/* Fixed Planet */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 scale-150">
          <FloatingElement
            floatIntensity={10}
            duration={12}
            enableParallax={false}
          >
            <img
              src="./home_planet.png"
              alt="Planet"
              className="w-full h-full object-contain"
            />
          </FloatingElement>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Menu */}
        <div className="relative h-15 z-50">
          <FlowingMenu items={demoItems} />
        </div>

        {/* Header Section */}
        <div className="relative pt-32 pb-20 px-6">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="font-['Michroma'] text-5xl md:text-7xl font-light text-white mb-6 tracking-[0.3em]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              EXHIBITIONS
            </motion.h1>
            <motion.p
              className="font-['Roboto'] text-xl md:text-2xl text-gray-400 tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              EXPLORE THE FUTURE OF TECHNOLOGY
            </motion.p>
          </motion.div>
        </div>

        {/* Exhibition Cards */}
        <div className="relative px-6 pb-20">
          {exhibitions.map((exhibition, index) => (
            <ExhibitionCard
              key={index}
              exhibition={exhibition}
              index={index}
            />
          ))}
        </div>

        {/* Footer Section */}
        <motion.div
          className="relative py-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-['Roboto'] text-gray-500 text-sm tracking-widest">
            XPECTO'26 • MARCH 14-16, 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}