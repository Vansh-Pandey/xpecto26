"use client";

import { motion } from "motion/react";
import { useState } from "react";
import FlowingMenu from "../components/ui/FlowingMenu";
import FloatingElement from "../components/ui/FloatingElement";

const ExhibitionCard = ({ exhibition, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-6xl mx-auto mb-16"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      <div 
        className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-black/40 border border-white/10 shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient border effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.3) 100%)"
              : "transparent"
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Content Container */}
        <div className="relative flex flex-col lg:flex-row items-stretch gap-0 overflow-hidden">
          {/* Left Side - Image Section */}
          <div className="relative lg:w-2/5 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
            <motion.div
              className="relative h-full min-h-[400px] lg:min-h-[500px]"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={exhibition.backgroundImage}
                  alt=""
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
              
              {/* Main Exhibition Image */}
              <div className="relative h-full flex items-center justify-center p-8">
                <motion.div
                  className="relative w-full max-w-sm"
                  animate={{ y: isHovered ? -8 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={exhibition.image}
                      alt={exhibition.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"
                      animate={{ opacity: isHovered ? 0.6 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  {/* Corner accents */}
                  <motion.div
                    className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-lg"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.5
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-lg"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.5
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </div>

              {/* Category badge overlay */}
              <div className="absolute top-6 left-6">
                <motion.div
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-white/90 to-gray-100/90 backdrop-blur-md border border-white/40"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-['Roboto'] text-xs font-bold text-black tracking-widest">
                    {exhibition.category}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Content Section */}
          <div className="relative lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-900/95 to-black/95">
            <motion.div
              animate={{ x: isHovered ? -5 : 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Title with gradient */}
              <div>
                <motion.h3
                  className="font-['Michroma'] text-3xl lg:text-4xl xl:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-300 mb-3 tracking-wide leading-tight"
                  animate={{ backgroundPosition: isHovered ? "200% center" : "0% center" }}
                  transition={{ duration: 2, ease: "linear" }}
                  style={{ backgroundSize: "200% auto" }}
                >
                  {exhibition.title}
                </motion.h3>
                
                {/* Underline accent */}
                <motion.div
                  className="h-1 bg-gradient-to-r from-white via-gray-300 to-transparent rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "60%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>

              {/* Description */}
              <p className="font-['Roboto'] text-gray-300 text-base lg:text-lg leading-relaxed">
                {exhibition.description}
              </p>

              {/* Features List with enhanced styling */}
              <div className="space-y-3 pt-4">
                {exhibition.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  >
                    <div className="relative mt-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-white"
                        whileHover={{ scale: 1.5 }}
                      />
                      <motion.div
                        className="absolute inset-0 w-2 h-2 rounded-full bg-white"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <span className="font-['Roboto'] text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button with enhanced design */}
              <div className="pt-6">
                <motion.button
                  className="group relative px-10 py-4 font-['Roboto'] font-bold text-white overflow-hidden rounded-xl shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-100" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-white to-gray-200"
                    initial={{ x: "100%" }}
                    whileHover={{ x: "-100%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/40 blur-xl"
                    animate={{ opacity: isHovered ? 0.5 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-3 text-base tracking-wider text-black font-bold">
                    EXPLORE EXHIBITION
                    <motion.span
                      animate={{ x: isHovered ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl"
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
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
      image: "./robotic_exh.png",
      backgroundImage: "./robotic_exh.png",
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
      image: "./space_tech_exh.png",
      backgroundImage: "./space_tech_exh.png",
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
      image: "./green_exh.png",
      backgroundImage: "./green_exh.png",
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
        <div className="absolute inset-0">
          <img 
            src="./bg2.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Fixed Planet */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-80">
          <FloatingElement
            floatIntensity={50}
            duration={12}
            enableParallax={false}
          >
            <img
              src="./red_planet.png"
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
        <div className="relative pt-40 pb-24 px-6">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                <span className="font-['Roboto'] text-sm text-white tracking-widest">
                  XPECTO'26 PRESENTS
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="font-['Michroma'] text-5xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white mb-8 tracking-[0.2em] leading-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              EXHIBITIONS
            </motion.h1>
            
            <motion.div
              className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-white to-transparent mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <motion.p
              className="font-['Roboto'] text-xl md:text-2xl text-gray-300 tracking-wider max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Explore cutting-edge innovations and breakthrough technologies shaping tomorrow's world
            </motion.p>
          </motion.div>
        </div>

        {/* Exhibition Cards */}
        <div className="relative px-6 pb-24">
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
          className="relative py-20 text-center border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white" />
            <p className="font-['Roboto'] text-gray-400 text-sm tracking-[0.3em]">
              XPECTO'26
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white" />
          </motion.div>
          <p className="font-['Roboto'] text-gray-500 text-xs tracking-widest">
            MARCH 14-16, 2026 • HIMALAYAS' BIGGEST TECHFEST
          </p>
        </motion.div>
      </div>
    </div>
  );
}