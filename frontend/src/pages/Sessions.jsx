"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import FlowingMenu from "../components/ui/FlowingMenu";
import FloatingElement from "../components/ui/FloatingElement";

const SessionCard = ({ session, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 w-[380px] h-[520px]"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="relative h-full rounded-3xl overflow-hidden backdrop-blur-md bg-black/50 border border-white/20 shadow-2xl cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            boxShadow: isHovered
              ? "0 0 40px rgba(255, 255, 255, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)"
              : "0 0 0px rgba(255, 255, 255, 0)"
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Background image section */}
        <div className="relative h-[240px] overflow-hidden">
          <motion.img
            src={session.image}
            alt={session.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
          
          {/* Floating time badge */}
          <motion.div
            className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-['Roboto'] text-xs font-bold text-black tracking-wider">
              {session.time}
            </span>
          </motion.div>

          {/* Category badge */}
          <div className="absolute bottom-4 left-4">
            <motion.div
              className="px-4 py-1.5 rounded-full border border-white/30 bg-black/60 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-['Roboto'] text-xs font-semibold text-white tracking-widest">
                {session.category}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Content section */}
        <div className="relative p-6 space-y-4">
          <motion.div
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title */}
            <h3 className="font-['Michroma'] text-xl font-bold text-white mb-2 leading-tight">
              {session.title}
            </h3>

            {/* Subtitle line */}
            <motion.div
              className="h-0.5 bg-gradient-to-r from-white via-gray-400 to-transparent mb-3"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            {/* Description */}
            <p className="font-['Roboto'] text-gray-400 text-sm leading-relaxed line-clamp-3">
              {session.description}
            </p>
          </motion.div>

          {/* Speaker info */}
          <motion.div
            className="flex items-center gap-3 pt-2"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center">
              <span className="font-['Roboto'] text-black font-bold text-sm">
                {session.speaker.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-['Roboto'] text-white text-sm font-semibold">
                {session.speaker}
              </p>
              <p className="font-['Roboto'] text-gray-500 text-xs">
                {session.role}
              </p>
            </div>
          </motion.div>

          {/* Learn more link */}
          <motion.div
            className="pt-3"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 text-white group-hover:text-gray-200 transition-colors">
              <span className="font-['Roboto'] text-sm font-semibold tracking-wider">
                LEARN MORE
              </span>
              <motion.span
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg"
              >
                →
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Corner decorations */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/20 rounded-tr-3xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-white/20 rounded-bl-3xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default function Sessions() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const planetY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const planetRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const demoItems = [
    { link: "#", text: "XPECTO'26", image: "" },
  ];

  const sessions = [
    {
      title: "AI & MACHINE LEARNING",
      category: "KEYNOTE",
      time: "10:00 AM",
      image: "./ai_session.png",
      description: "Dive deep into the world of artificial intelligence and machine learning. Explore cutting-edge algorithms, neural networks, and real-world applications transforming industries.",
      speaker: "Dr. Sarah Chen",
      role: "AI Research Lead, TechCorp"
    },
    {
      title: "BLOCKCHAIN REVOLUTION",
      category: "WORKSHOP",
      time: "2:00 PM",
      image: "./blockchain_session.png",
      description: "Discover how blockchain technology is revolutionizing finance, supply chain, and digital identity. Learn about smart contracts and decentralized applications.",
      speaker: "Alex Kumar",
      role: "Blockchain Architect"
    },
    {
      title: "QUANTUM COMPUTING",
      category: "SEMINAR",
      time: "4:30 PM",
      image: "./quantum_session.png",
      description: "Explore the fascinating world of quantum computing and its potential to solve complex problems beyond classical computer capabilities.",
      speaker: "Prof. Michael Zhang",
      role: "Quantum Physicist"
    },
    {
      title: "CYBERSECURITY TRENDS",
      category: "PANEL",
      time: "11:30 AM",
      image: "./cyber_session.png",
      description: "Stay ahead of cyber threats with insights into modern security practices, ethical hacking, and protecting digital infrastructure in an interconnected world.",
      speaker: "Lisa Rodriguez",
      role: "Security Consultant"
    },
    {
      title: "FUTURE OF IoT",
      category: "TALK",
      time: "3:00 PM",
      image: "./iot_session.png",
      description: "Understand how Internet of Things is connecting our world. From smart homes to industrial automation, discover the endless possibilities of connected devices.",
      speaker: "James Park",
      role: "IoT Solutions Engineer"
    },
    {
      title: "SUSTAINABLE TECH",
      category: "WORKSHOP",
      time: "1:00 PM",
      image: "./sustainable_session.png",
      description: "Learn about green technologies and sustainable practices in tech. Explore renewable energy solutions and eco-friendly innovations for a better tomorrow.",
      speaker: "Emma Thompson",
      role: "Environmental Tech Lead"
    }
  ];

  return (
    <div ref={containerRef} className="w-full min-h-screen relative bg-black">
      {/* Fixed Background Section */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <div className="absolute inset-0">
          <img 
            src="./bg3.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* Fixed Planet with Parallax */}
        <motion.div 
          className="absolute top-1/2 right-[10%] -translate-y-1/2 scale-100 opacity-50"
          style={{ y: planetY, rotate: planetRotate }}
        >
          <FloatingElement
            floatIntensity={15}
            duration={10}
            enableParallax={true}
          >
            <img
              src="./blue_planet.png"
              alt="Planet"
              className="w-[600px] h-[600px] object-contain"
            />
          </FloatingElement>
        </motion.div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Menu */}
        <div className="relative h-15 z-50">
          <FlowingMenu items={demoItems} />
        </div>

        {/* Header Section */}
        <div className="relative pt-40 pb-16 px-6">
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
              className="font-['Michroma'] text-6xl md:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white mb-8 tracking-[0.2em] leading-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              SESSIONS
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
              Join industry experts and innovators in transformative discussions
            </motion.p>
          </motion.div>
        </div>

        {/* Scrollable Sessions Container */}
        <div className="relative px-6 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Day 1 */}
            <div className="mb-16">
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="font-['Roboto'] text-sm font-bold text-white tracking-widest">
                    DAY 1 • MARCH 14
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-white/50 to-transparent" />
              </motion.div>

              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 pb-4 px-2">
                  {sessions.slice(0, 3).map((session, index) => (
                    <SessionCard key={index} session={session} index={index} />
                  ))}
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="mb-16">
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="font-['Roboto'] text-sm font-bold text-white tracking-widest">
                    DAY 2 • MARCH 15
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-white/50 to-transparent" />
              </motion.div>

              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 pb-4 px-2">
                  {sessions.slice(3, 6).map((session, index) => (
                    <SessionCard key={index + 3} session={session} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}