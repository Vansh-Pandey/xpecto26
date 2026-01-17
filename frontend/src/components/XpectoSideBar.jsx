"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/SideBar";
import {
  IconHome,
  IconPresentation,
  IconCalendarEvent,
  IconUsers,
  IconUserPlus,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../libs/utils";

export default function XpectoSideBar({ children }) {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <IconHome className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Exhibition",
      href: "/exhibition",
      icon: <IconPresentation className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Events",
      href: "/events",
      icon: <IconCalendarEvent className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Sessions",
      href: "/sessions",
      icon: <IconUsers className="h-5 w-5 shrink-0" />,
    },
  ];

  return (
    <div
      className={cn(
        "flex min-h-screen w-screen overflow-x-hidden",
        "bg-[#0b0b0f]",
      )}
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent" />

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-black/40 backdrop-blur-2xl border-r border-white/10">
          {/* Desktop Content */}
          <div className="hidden md:flex flex-1 flex-col overflow-hidden relative z-10">
            {/* LOGO */}
            <a href="/" className="flex items-center gap-3 px-2 py-2">
              <img
                src="/logo.png"
                alt="Xpecto Logo"
                className="h-12 w-12 object-contain"
              />
            </a>

            {/* LINKS */}
            <div className="mt-8 flex flex-col gap-3">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    icon: React.cloneElement(link.icon, {
                      className: "h-5 w-5 shrink-0 text-cyan-300",
                    }),
                  }}
                  className="text-white text-sm"
                />
              ))}
            </div>
          </div>

          {/* Desktop Sign Up */}
          <div className="hidden md:block pt-4 mt-4 border-t border-cyan-400/20">
            <SidebarLink
              link={{
                label: "Sign Up",
                href: "/signup",
                icon: (
                  <IconUserPlus className="h-5 w-5 shrink-0 text-cyan-300" />
                ),
              }}
              className="text-white text-sm bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30"
            />
          </div>

          {/* Mobile Content */}
          <div className="flex md:hidden flex-col h-full relative z-10">
            {/* Mobile Logo */}
            <a href="/" className="flex items-center gap-3 px-2 mb-8">
              <img
                src="/logo.png"
                alt="Xpecto"
                className="h-14 w-14 object-contain"
              />
              <span className="font-['Michroma'] text-xl text-white tracking-wider">
                XPECTO
              </span>
            </a>

            {/* Mobile Links */}
            <div className="flex-1 flex flex-col gap-3">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    ...link,
                    icon: React.cloneElement(link.icon, {
                      className: "h-6 w-6 shrink-0 text-cyan-300",
                    }),
                  }}
                  className="text-white text-base"
                />
              ))}
            </div>

            {/* Mobile Sign Up */}
            <div className="pt-6 mt-6 border-t border-cyan-400/20">
              <SidebarLink
                link={{
                  label: "Sign Up",
                  href: "/signup",
                  icon: (
                    <IconUserPlus className="h-6 w-6 shrink-0 text-cyan-300" />
                  ),
                }}
                className="text-white text-base bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30"
              />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <main className="relative flex flex-1 overflow-hidden bg-transparent">
        <div className="w-full h-full overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
