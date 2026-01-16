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
   DESKTOP SIDEBAR (BLACK)
========================= */
export const DesktopSidebar = ({ className, children, ...props }) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.div
      className={cn(
        "relative min-h-screen px-4 py-4 hidden md:flex md:flex-col w-75 shrink-0",
        "bg-black/45 backdrop-blur-2xl border-r border-white/10",
        className
      )}
      animate={{
        width: animate ? (open ? "340px" : "72px") : "340px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {/* subtle inner glow */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

/* =========================
   MOBILE SIDEBAR (BLACK)
========================= */
export const MobileSidebar = ({ className, children, ...props }) => {
  const { open, setOpen } = useSidebar();

  return (
    <>
      {/* Top bar */}
      <div
        className={cn(
          "h-10 px-4 py-4 flex md:hidden items-center justify-between w-full",
          "bg-black/50 backdrop-blur-xl border-b border-white/10"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-white"
            onClick={() => setOpen(!open)}
          />
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "fixed inset-0 z-100 p-10 flex flex-col justify-between",
                "bg-black/70 backdrop-blur-2xl",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-white"
                onClick={() => setOpen(false)}
              >
                <IconX />
              </div>

              {children}
            </motion.div>
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
        "flex items-center gap-2 py-2 rounded-md",
        "text-white/90 hover:bg-white/10 transition-all duration-200",
        className
      )}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm whitespace-pre group-hover/sidebar:translate-x-1 transition"
      >
        {link.label}
      </motion.span>
    </a>
  );
};
