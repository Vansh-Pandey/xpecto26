"use client";
import { cn } from "../../libs/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children, open, setOpen, animate }) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

/* =========================
   DESKTOP SIDEBAR
========================= */
export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();
  const timeoutRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  return (
    <motion.div
      className={cn(
        "relative min-h-screen px-6 py-8 hidden md:flex md:flex-col shrink-0",
        "bg-linear-to-br from-black via-black to-gray-900",
        "border-r border-white/10",
        "shadow-2xl shadow-black/50",
        className,
      )}
      animate={{
        width: animate ? (open ? "280px" : "96px") : "280px",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Glassmorphic overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

/* =========================
   MOBILE SIDEBAR
========================= */
export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      {/* Top bar */}
      <div
        className={cn(
          "h-16 px-4 flex md:hidden items-center justify-between w-full fixed top-0 left-0 z-50",
          "bg-black/90 backdrop-blur-xl border-b border-cyan-400/20",
        )}
        {...props}
      >
        <a href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Xpecto"
            className="h-10 w-10 object-contain"
          />
        </a>
        <div className="flex justify-end z-20">
          <IconMenu2
            className="text-cyan-200 h-6 w-6 cursor-pointer hover:text-cyan-300 transition-colors"
            onClick={() => setOpen(!open)}
          />
        </div>

        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              />

              {/* Sidebar Panel */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                  "fixed inset-y-0 left-0 w-[85vw] max-w-sm z-[100] p-6 flex flex-col",
                  "bg-[#020617]",
                  "border-r border-cyan-400/20",
                  "shadow-[0_0_80px_rgba(6,182,212,0.2)]",
                  className,
                )}
              >
                <div
                  className="absolute right-5 top-5 z-50 p-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 cursor-pointer hover:bg-cyan-400/20 transition-all"
                  onClick={() => setOpen(false)}
                >
                  <IconX className="h-5 w-5 text-cyan-200" />
                </div>

                {/* Subtle glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full pt-16">
                  {children}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

/* =========================
   SIDEBAR LINK
========================= */
export const SidebarLink = ({ link, className, ...props }) => {
  const { open, animate } = useSidebar();

  return (
    <a
      href={link.href}
      className={cn(
        "group relative flex items-center gap-4 py-4 px-5 rounded-xl overflow-hidden",
        "text-white/90 font-['Roboto'] font-medium",
        "hover:text-white transition-all duration-300",
        "cursor-pointer",
        className,
      )}
      {...props}
    >
      {/* Glassmorphic hover background */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-cyan-400/[0.08] transition-all duration-300 rounded-xl" />
      <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400/30 transition-all duration-300 rounded-xl" />

      {/* Icon */}
      <div className="relative z-10 flex-shrink-0 text-white/80 group-hover:text-white transition-colors duration-300">
        {link.icon}
      </div>

      {/* Label */}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="relative z-10 text-sm font-medium tracking-wide whitespace-nowrap group-hover:translate-x-0.5 transition-transform duration-300"
      >
        {link.label}
      </motion.span>
    </a>
  );
};
