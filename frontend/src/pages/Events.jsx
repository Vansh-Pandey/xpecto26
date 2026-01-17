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
    return [...Array(150)].map((_, i) => ({
      id: `star-${i}`,
      width: Math.random() * 2 + 0.5,
      height: Math.random() * 2 + 0.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.3,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 2,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return [...Array(3)].map((_, i) => ({
      id: `shooting-star-${i}`,
      top: Math.random() * 50,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 3,
      animationDelay: i * 4,
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
      {/* Space background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#030712]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#030712] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.18),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_65%,rgba(14,165,233,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(148,163,184,0.05),transparent_60%)]" />

        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: star.width + "px",
              height: star.height + "px",
              top: star.top + "%",
              left: star.left + "%",
              opacity: star.opacity,
              animationDuration: star.animationDuration + "s",
              animationDelay: star.animationDelay + "s",
            }}
          />
        ))}

        {/* Planets */}
        <div
          className="absolute w-32 h-32 rounded-full opacity-30 blur-sm"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.4), rgba(79, 70, 229, 0.2))",
            top: "15%",
            right: "10%",
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full opacity-20 blur-sm"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.3), rgba(56, 189, 248, 0.15))",
            bottom: "20%",
            left: "8%",
          }}
        />
        <div
          className="absolute w-16 h-16 rounded-full opacity-25 blur-sm"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.35), rgba(139, 92, 246, 0.18))",
            top: "60%",
            right: "15%",
          }}
        />

        {/* Shooting Stars */}
        {shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: star.top + "%",
              left: star.left + "%",
              boxShadow: "0 0 4px 2px rgba(255, 255, 255, 0.5)",
              animation: `shootingStar ${star.animationDuration}s linear infinite`,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(-500px) translateY(300px);
            opacity: 0;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.5;
            filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.3));
          }
          50% {
            opacity: 0.8;
            filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.5));
          }
        }
        @keyframes gentleScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
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
          <h1
            className="font-['Michroma'] text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white tracking-[0.25em] sm:tracking-[0.35em] text-center"
            style={{ textShadow: "0 0 20px rgba(56,189,248,0.15)" }}
          >
            EVENTS
          </h1>

          {/* Header connection divider */}
          <div className="w-full max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />

          <div className="max-w-xl mx-auto relative mt-1 sm:mt-2 w-full">
            <IconSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-cyan-300/70" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#020617]/70 backdrop-blur-xl border border-cyan-400/30 rounded-xl px-10 sm:px-12 py-2 sm:py-2.5 text-sm sm:text-base text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/60 transition-all"
            />
          </div>
        </motion.div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-14 h-14 border-4 border-cyan-400/30 border-t-cyan-300 rounded-full"
            />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-8 py-6 backdrop-blur-xl">
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
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-sky-500/10 rounded-full blur-2xl" />
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-cyan-300/40"
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
                <p className="text-slate-400 text-sm">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "No events available at the moment"}
                </p>
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 border border-cyan-400/40 rounded-xl text-cyan-200 font-bold tracking-widest hover:border-cyan-300 hover:bg-cyan-400/10 transition shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_0_35px_rgba(56,189,248,0.35)]"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 sm:left-2 md:left-4 z-20 p-2 sm:p-3 md:p-4 bg-[#020617]/60 backdrop-blur-xl border border-cyan-400/20 rounded-full hover:border-cyan-300/60 hover:bg-cyan-400/5 transition-all duration-500 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] top-1/2 -translate-y-1/2 opacity-60 sm:opacity-100"
              style={{ animation: "pulseGlow 4s ease-in-out infinite" }}
            >
              <IconChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-200" />
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
                  whileHover={{
                    boxShadow:
                      "0 0 100px rgba(56, 189, 248, 0.18), 0 0 40px rgba(56, 189, 248, 0.1)",
                  }}
                  className="bg-gradient-to-br from-cyan-500/8 via-sky-500/4 to-black/20 backdrop-blur-2xl border border-cyan-400/15 rounded-xl sm:rounded-2xl shadow-[0_0_60px_rgba(56,189,248,0.08),0_0_30px_rgba(14,165,233,0.06)] flex flex-col md:flex-row gap-0 overflow-hidden max-h-[calc(100vh-16rem)] md:max-h-full transition-shadow duration-700"
                >
                  {/* Event Content - Mobile First (order-1), Desktop Right (order-2 md:order-2) */}
                  <div className="flex-1 p-4 sm:p-5 md:p-8 flex flex-col justify-between order-1 md:order-2 overflow-y-auto">
                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap mb-4 sm:mb-5">
                      {filteredEvents[currentIndex].club_name && (
                        <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-cyan-500/12 border border-cyan-400/30 rounded-full text-cyan-300/90 text-[10px] sm:text-xs font-bold tracking-wider">
                          {filteredEvents[currentIndex].club_name}
                        </span>
                      )}
                      {filteredEvents[currentIndex].company && (
                        <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-sky-500/12 border border-sky-400/30 rounded-full text-sky-300/90 text-[10px] sm:text-xs font-bold tracking-wider">
                          {filteredEvents[currentIndex].company}
                        </span>
                      )}
                    </div>

                    {/* Title - Highest Priority */}
                    <h2 className="font-['Michroma'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white tracking-wide sm:tracking-wider leading-[1.3] mb-4 sm:mb-5">
                      {filteredEvents[currentIndex].title}
                    </h2>

                    {/* Description - Scrollable if needed */}
                    <div className="flex-1 mb-4 sm:mb-5 overflow-y-auto">
                      <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">
                        {filteredEvents[currentIndex].description}
                      </p>
                    </div>

                    {/* CTA Button - Strong Visual Anchor */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 sm:py-2.5 md:py-2.5 border border-cyan-400/40 md:border-cyan-400/30 rounded-xl text-cyan-200 font-bold text-xs sm:text-sm tracking-widest hover:border-cyan-300/60 hover:bg-cyan-400/8 transition-all duration-500 shadow-[0_0_20px_rgba(56,189,248,0.2)] md:shadow-[0_0_15px_rgba(56,189,248,0.12)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] mb-4 sm:mb-5"
                    >
                      REGISTER NOW
                    </motion.button>

                    {/* Metadata - Lowest Priority */}
                    <div className="pt-4 border-t border-cyan-400/10 flex gap-3 sm:gap-4 flex-wrap">
                      {filteredEvents[currentIndex].date && (
                        <span className="text-white/50 text-xs sm:text-sm">
                          {new Date(
                            filteredEvents[currentIndex].date,
                          ).toLocaleDateString()}
                        </span>
                      )}
                      {filteredEvents[currentIndex].venue && (
                        <span className="text-white/50 text-xs sm:text-sm">
                          {filteredEvents[currentIndex].venue}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Event Image - Mobile After Content (order-2), Desktop Left (order-1 md:order-1) */}
                  {filteredEvents[currentIndex].image?.length > 0 && (
                    <div className="w-full md:w-1/2 lg:w-2/5 aspect-[4/5] max-h-[220px] md:max-h-none md:aspect-[3/4] flex-shrink-0 border-t md:border-t-0 md:border-r border-cyan-400/10 overflow-hidden relative group order-2 md:order-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-sky-500/5 z-10 pointer-events-none" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-cyan-400/10 z-10 pointer-events-none" />
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 sm:right-2 md:right-4 z-20 p-2 sm:p-3 md:p-4 bg-[#020617]/60 backdrop-blur-xl border border-cyan-400/20 rounded-full hover:border-cyan-300/60 hover:bg-cyan-400/5 transition-all duration-500 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] top-1/2 -translate-y-1/2 opacity-60 sm:opacity-100"
              style={{ animation: "pulseGlow 4s ease-in-out infinite" }}
            >
              <IconChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-200" />
            </motion.button>
          </div>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="text-center mt-2 mb-safe">
            <p className="text-white/40 text-xs sm:text-sm">
              {currentIndex + 1} / {filteredEvents.length}
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
                      ? "w-8 sm:w-10 bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.9),0_0_20px_rgba(56,189,248,0.5)]"
                      : "w-1.5 sm:w-2 bg-cyan-400/25 hover:bg-cyan-300/50"
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
