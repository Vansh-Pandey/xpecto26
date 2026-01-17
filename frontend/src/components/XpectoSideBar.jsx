"use client";
import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/SideBar";
import {
  IconHome,
  IconPresentation,
  IconCalendarEvent,
  IconUsers,
  IconUserPlus,
  IconInfoCircle,
  IconLogout,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../libs/utils";

export default function XpectoSideBar({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: "Home", href: "/", icon: <IconHome className="h-5 w-5" /> },
    {
      label: "Exhibition",
      href: "/exhibition",
      icon: <IconPresentation className="h-5 w-5" />,
    },
    {
      label: "Events",
      href: "/events",
      icon: <IconCalendarEvent className="h-5 w-5" />,
    },
    {
      label: "Sessions",
      href: "/sessions",
      icon: <IconUsers className="h-5 w-5" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <IconInfoCircle className="h-5 w-5" />,
    },
  ];

  const isActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "flex min-h-screen w-screen overflow-x-hidden",
        "bg-[#050508]",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="bg-transparent">
          {/* Desktop Content */}
          <div className="hidden md:flex flex-1 flex-col overflow-hidden">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 px-3 py-2 mb-2">
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img
                  src="/logo.png"
                  alt="Xpecto"
                  className="h-10 w-10 object-contain"
                />
                {/* Subtle glow behind logo */}
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              <motion.span
                animate={{
                  opacity: open ? 1 : 0,
                  display: open ? "block" : "none",
                }}
                transition={{ duration: 0.15 }}
                className="font-['Michroma'] text-sm text-white/80 tracking-[0.2em]"
              >
                XPECTO
              </motion.span>
            </Link>

            {/* Divider */}
            <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" />

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 flex-1">
              {links.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <SidebarLink link={link} isActive={isActive(link.href)} />
                </motion.div>
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto pt-4">
              <div className="mx-3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" />

              <SidebarLink
                link={{
                  label: "Sign Up",
                  href: "/signup",
                  icon: <IconUserPlus className="h-5 w-5" />,
                }}
                className="bg-gradient-to-r from-purple-500/10 to-violet-500/5 border border-purple-500/20 hover:border-purple-400/30"
              />
            </div>
          </div>

          {/* Mobile Content */}
          <div className="flex md:hidden flex-col h-full">
            {/* Mobile Logo */}
            <Link to="/" className="flex items-center gap-3 mb-8">
              <img
                src="/logo.png"
                alt="Xpecto"
                className="h-11 w-11 object-contain"
              />
              <span className="font-['Michroma'] text-lg text-white/90 tracking-[0.15em]">
                XPECTO
              </span>
            </Link>

            {/* Mobile Links */}
            <nav className="flex-1 flex flex-col gap-1">
              {links.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <SidebarLink
                    link={link}
                    isActive={isActive(link.href)}
                    className="py-3.5"
                  />
                </motion.div>
              ))}
            </nav>

            {/* Mobile Sign Up */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-4 mt-4 border-t border-white/[0.04]"
            >
              <SidebarLink
                link={{
                  label: "Sign Up",
                  href: "/signup",
                  icon: <IconUserPlus className="h-5 w-5" />,
                }}
                className="bg-gradient-to-r from-purple-500/10 to-violet-500/5 border border-purple-500/20"
              />
            </motion.div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <main className="relative flex flex-1 overflow-hidden bg-transparent">
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
