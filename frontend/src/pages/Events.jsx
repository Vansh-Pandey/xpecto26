"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@tabler/icons-react";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [direction, setDirection] = useState(0);

  // Generate stars once and memoize them
  const stars = useMemo(() => {
    return [...Array(250)].map((_, i) => ({
      id: `star-${i}`,
      size: Math.random() * 2.5 + 0.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.8 + 0.2,
      animationDuration: Math.random() * 4 + 2,
      animationDelay: Math.random() * 3,
      twinkle: Math.random() > 0.7, // 30% of stars twinkle more
    }));
  }, []);

  // Distant galaxies
  const galaxies = useMemo(() => {
    return [...Array(5)].map((_, i) => ({
      id: `galaxy-${i}`,
      size: Math.random() * 80 + 40,
      top: Math.random() * 80 + 10,
      left: Math.random() * 80 + 10,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.15 + 0.05,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return [...Array(6)].map((_, i) => ({
      id: `shooting-star-${i}`,
      top: Math.random() * 40,
      left: Math.random() * 80 + 20,
      animationDuration: Math.random() * 2 + 2,
      animationDelay: i * 3 + Math.random() * 2,
      length: Math.random() * 100 + 50,
    }));
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEvents(events);
      setCurrentIndex(0);
    } else {
      const filtered = events.filter(
        (event) =>
          event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          event.club_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.company?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredEvents(filtered);
      setCurrentIndex(0);
    }
  }, [searchQuery, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/events`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const result = await response.json();
      const eventsData = result.data || [];
      setEvents(eventsData);
      setFilteredEvents(eventsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredEvents.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredEvents.length) % filteredEvents.length,
    );
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">
      {/* Deep space background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-[#000000]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#050510] to-[#000005]" />

        {/* Nebula clouds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(88,28,135,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_30%,rgba(30,64,175,0.2),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(6,78,59,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(157,23,77,0.1),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(56,189,248,0.08),transparent_35%)]" />

        {/* Cosmic dust overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, white, transparent),
                            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
                            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
                            radial-gradient(1px 1px at 90px 40px, white, transparent),
                            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent)`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Distant Galaxies */}
        {galaxies.map((galaxy) => (
          <div
            key={galaxy.id}
            className="absolute rounded-full blur-xl"
            style={{
              width: galaxy.size + "px",
              height: galaxy.size * 0.4 + "px",
              top: galaxy.top + "%",
              left: galaxy.left + "%",
              opacity: galaxy.opacity,
              transform: `rotate(${galaxy.rotation}deg)`,
              background:
                "radial-gradient(ellipse, rgba(139,92,246,0.5), rgba(59,130,246,0.3), transparent 70%)",
            }}
          />
        ))}

        {/* Stars field */}
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.twinkle ? "animate-pulse" : ""}`}
            style={{
              width: star.size + "px",
              height: star.size + "px",
              top: star.top + "%",
              left: star.left + "%",
              opacity: star.opacity,
              background:
                star.size > 2
                  ? "radial-gradient(circle, white 0%, rgba(147,197,253,0.8) 40%, transparent 70%)"
                  : "white",
              boxShadow:
                star.size > 1.5
                  ? `0 0 ${star.size * 2}px rgba(255,255,255,0.5), 0 0 ${star.size * 4}px rgba(147,197,253,0.3)`
                  : "none",
              animationDuration: star.animationDuration + "s",
              animationDelay: star.animationDelay + "s",
            }}
          />
        ))}

        {/* Constellation lines - subtle connections */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <line
            x1="10%"
            y1="15%"
            x2="25%"
            y2="25%"
            stroke="rgba(147,197,253,0.5)"
            strokeWidth="0.5"
          />
          <line
            x1="25%"
            y1="25%"
            x2="35%"
            y2="20%"
            stroke="rgba(147,197,253,0.5)"
            strokeWidth="0.5"
          />
          <line
            x1="70%"
            y1="40%"
            x2="85%"
            y2="35%"
            stroke="rgba(147,197,253,0.5)"
            strokeWidth="0.5"
          />
          <line
            x1="85%"
            y1="35%"
            x2="90%"
            y2="50%"
            stroke="rgba(147,197,253,0.5)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Glowing Planets/Orbs */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(167,139,250,0.6), rgba(139,92,246,0.3) 40%, rgba(88,28,135,0.1) 70%, transparent)",
            boxShadow:
              "0 0 60px rgba(139,92,246,0.4), inset -20px -20px 40px rgba(0,0,0,0.5)",
            top: "12%",
            right: "8%",
          }}
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            x: [0, -5, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-28 h-28 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, rgba(56,189,248,0.5), rgba(14,165,233,0.3) 50%, transparent)",
            boxShadow:
              "0 0 40px rgba(56,189,248,0.3), inset -15px -15px 30px rgba(0,0,0,0.4)",
            bottom: "18%",
            left: "6%",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-16 h-16 rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(251,146,60,0.6), rgba(234,88,12,0.3) 50%, transparent)",
            boxShadow: "0 0 30px rgba(251,146,60,0.3)",
            top: "55%",
            right: "12%",
          }}
        />

        {/* Saturn-like planet with ring */}
        <div className="absolute" style={{ top: "70%", left: "75%" }}>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div
              className="w-20 h-20 rounded-full opacity-25"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, rgba(192,132,252,0.6), rgba(126,34,206,0.3) 60%, transparent)",
                boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.5)",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-8 rounded-[50%] border border-purple-400/20 opacity-30"
              style={{ transform: "translate(-50%, -50%) rotateX(70deg)" }}
            />
          </motion.div>
        </div>

        {/* Shooting Stars with trails */}
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              top: star.top + "%",
              left: star.left + "%",
              animation: `shootingStar ${star.animationDuration}s linear infinite`,
              animationDelay: `${star.animationDelay}s`,
            }}
          >
            <div
              className="h-0.5 rounded-full"
              style={{
                width: star.length + "px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.8) 50%, white)",
                boxShadow:
                  "0 0 6px rgba(255,255,255,0.8), 0 0 12px rgba(147,197,253,0.5)",
              }}
            />
          </div>
        ))}

        {/* Floating cosmic particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(-35deg);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(-600px) translateY(400px) rotate(-35deg);
            opacity: 0;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 10px rgba(139,92,246,0.4));
          }
          50% {
            opacity: 0.9;
            filter: drop-shadow(0 0 20px rgba(139,92,246,0.6));
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>

      <div className="relative z-10 w-full h-screen grid grid-rows-[auto_1fr_auto] px-3 sm:px-4 md:px-8 pt-20 sm:pt-24 md:pt-6 pb-8 sm:pb-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 sm:gap-4 pb-3 sm:pb-4"
        >
          <div className="relative">
            <h1
              className="font-['Michroma'] text-xl sm:text-2xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 tracking-[0.25em] sm:tracking-[0.35em] text-center"
              style={{
                textShadow: "0 0 40px rgba(139,92,246,0.3)",
                animation: "shimmer 3s ease-in-out infinite",
                backgroundSize: "200% auto",
              }}
            >
              EVENTS
            </h1>
            {/* Decorative stars around title */}
            <div className="absolute -top-2 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" />
            <div
              className="absolute -top-1 right-1/3 w-0.5 h-0.5 bg-purple-300 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute top-0 right-1/4 w-1.5 h-1.5 bg-cyan-300/70 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Header connection divider - cosmic line */}
          <div className="w-full max-w-3xl mx-auto h-px relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
          </div>

          <div className="max-w-xl mx-auto relative mt-1 sm:mt-2 w-full">
            <IconSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-purple-300/70" />
            <input
              type="text"
              placeholder="Search across the cosmos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 backdrop-blur-xl border border-purple-500/30 rounded-2xl px-10 sm:px-12 py-2.5 sm:py-3 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-400/60 focus:shadow-[0_0_30px_rgba(139,92,246,0.2)] transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-14 h-14 border-4 border-purple-500/30 border-t-purple-300 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-8 py-6 backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.1)]">
              <p className="text-red-400 text-center">{error}</p>
              <button
                onClick={fetchEvents}
                className="mt-4 w-full px-6 py-2 border border-red-400/40 rounded-lg text-red-300 hover:bg-red-400/10 transition"
              >
                RETRY
              </button>
            </div>
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 max-w-md"
            >
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-violet-500/10 rounded-full blur-2xl" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-purple-300/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-['Michroma'] text-2xl text-slate-100 tracking-wider mb-2">
                  NO EVENTS FOUND
                </h3>
                <p className="text-purple-200/50 text-sm">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "No events available at the moment"}
                </p>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 border border-purple-400/40 rounded-xl text-purple-200 font-bold tracking-widest hover:border-purple-300 hover:bg-purple-400/10 transition shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]"
                >
                  CLEAR SEARCH
                </button>
              )}
            </motion.div>
          </div>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="relative flex items-center justify-center">
            {/* Prev */}
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 sm:left-2 md:left-4 z-20 p-2 sm:p-3 md:p-4 bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-full hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-500 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] top-1/2 -translate-y-1/2"
              style={{ animation: "pulseGlow 4s ease-in-out infinite" }}
            >
              <IconChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-purple-200" />
            </motion.button>

            {/* Card */}
            <div className="w-full max-w-5xl mx-auto px-8 sm:px-10 md:px-12">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="relative bg-gradient-to-br from-purple-900/20 via-violet-900/10 to-black/40 backdrop-blur-2xl border border-purple-500/20 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(139,92,246,0.15),0_0_40px_rgba(88,28,135,0.1)] flex flex-col md:flex-row gap-0 overflow-hidden max-h-[calc(100vh-16rem)] md:max-h-full group"
                >
                  {/* Cosmic glow effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-cyan-500/5" />
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-purple-500/20 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-500/20 rounded-br-3xl pointer-events-none" />
                  {/* Event Content - Mobile First (order-1), Desktop Right (order-2 md:order-2) */}
                  <div className="flex-1 p-4 sm:p-5 md:p-8 flex flex-col justify-between order-1 md:order-2 overflow-y-auto relative z-10">
                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap mb-4 sm:mb-5">
                      {filteredEvents[currentIndex].club_name && (
                        <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-purple-500/15 border border-purple-400/40 rounded-full text-purple-200 text-[10px] sm:text-xs font-bold tracking-wider backdrop-blur-sm">
                          {filteredEvents[currentIndex].club_name}
                        </span>
                      )}
                      {filteredEvents[currentIndex].company && (
                        <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-cyan-500/15 border border-cyan-400/40 rounded-full text-cyan-200 text-[10px] sm:text-xs font-bold tracking-wider backdrop-blur-sm">
                          {filteredEvents[currentIndex].company}
                        </span>
                      )}
                    </div>

                    {/* Title - Highest Priority */}
                    <h2 className="font-['Michroma'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white tracking-wide sm:tracking-wider leading-[1.3] mb-4 sm:mb-5">
                      {filteredEvents[currentIndex].title}
                    </h2>

                    {/* Description - Scrollable if needed */}
                    <div className="flex-1 mb-4 sm:mb-5 overflow-y-auto">
                      <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed">
                        {filteredEvents[currentIndex].description}
                      </p>
                    </div>

                    {/* CTA Button - Strong Visual Anchor */}
                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 50px rgba(139,92,246,0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 sm:py-2.5 md:py-3 bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-400/50 rounded-xl text-white font-bold text-xs sm:text-sm tracking-widest hover:border-purple-300/70 hover:from-purple-600/30 hover:to-violet-600/30 transition-all duration-500 shadow-[0_0_30px_rgba(139,92,246,0.25)] mb-4 sm:mb-5 relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10">REGISTER NOW</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/10 to-purple-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                    </motion.button>

                    {/* Metadata - Lowest Priority */}
                    <div className="pt-4 border-t border-purple-400/10 flex gap-3 sm:gap-4 flex-wrap">
                      {filteredEvents[currentIndex].date && (
                        <span className="text-purple-200/50 text-xs sm:text-sm flex items-center gap-2">
                          <span className="w-1 h-1 bg-purple-400/50 rounded-full" />
                          {new Date(
                            filteredEvents[currentIndex].date,
                          ).toLocaleDateString()}
                        </span>
                      )}
                      {filteredEvents[currentIndex].venue && (
                        <span className="text-purple-200/50 text-xs sm:text-sm flex items-center gap-2">
                          <span className="w-1 h-1 bg-cyan-400/50 rounded-full" />
                          {filteredEvents[currentIndex].venue}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Event Image - Mobile After Content (order-2), Desktop Left (order-1 md:order-1) */}
                  {filteredEvents[currentIndex].image?.length > 0 && (
                    <div className="w-full md:w-1/2 lg:w-2/5 aspect-[4/5] max-h-[220px] md:max-h-none md:aspect-[3/4] flex-shrink-0 border-t md:border-t-0 md:border-r border-purple-500/20 overflow-hidden relative group order-2 md:order-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/5 z-10 pointer-events-none" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-purple-400/20 z-10 pointer-events-none" />
                      <motion.img
                        src={filteredEvents[currentIndex].image[0]}
                        alt=""
                        className="w-full h-full object-contain md:object-cover"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next */}
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 sm:right-2 md:right-4 z-20 p-2 sm:p-3 md:p-4 bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-full hover:border-purple-400/60 hover:bg-purple-500/10 transition-all duration-500 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] top-1/2 -translate-y-1/2"
              style={{ animation: "pulseGlow 4s ease-in-out infinite" }}
            >
              <IconChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-purple-200" />
            </motion.button>
          </div>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="text-center mt-2 mb-safe">
            <p className="text-purple-200/40 text-xs sm:text-sm font-light tracking-widest">
              {currentIndex + 1} <span className="text-purple-400/30">/</span>{" "}
              {filteredEvents.length}
            </p>
            <div className="flex justify-center gap-2 sm:gap-2.5 mt-2 sm:mt-3">
              {filteredEvents.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  animate={{
                    scale: idx === currentIndex ? 1.1 : 1,
                  }}
                  whileHover={{ scale: idx === currentIndex ? 1.15 : 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                    idx === currentIndex
                      ? "w-8 sm:w-10 bg-gradient-to-r from-purple-400 to-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.9),0_0_25px_rgba(139,92,246,0.5)]"
                      : "w-1.5 sm:w-2 bg-purple-400/20 hover:bg-purple-300/40"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
