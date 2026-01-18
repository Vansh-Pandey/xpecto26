"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  IconMail,
  IconMapPin,
  IconBrandInstagram,
  IconCode,
  IconArrowUpRight,
  IconUsers,
} from "@tabler/icons-react";

export default function About() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const developers = [
    { name: "Divyansh Jindal", role: "Full Stack Developer" },
    { name: "Vansh Pandey", role: "Full Stack Developer" },
  ];

  const conveners = [
    { name: "Convener Name", role: "Convener" },
    { name: "Co-Convener 1", role: "Co-Convener" },
    { name: "Co-Convener 2", role: "Co-Convener" },
    { name: "Co-Convener 3", role: "Co-Convener" },
  ];

  const contacts = [
    { label: "tech@xpecto.org", href: "mailto:tech@xpecto.org" },
    { label: "contact@xpecto.org", href: "mailto:contact@xpecto.org" },
  ];

  // Fetch team members from backend
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/team`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch team members");
        }

        const result = await response.json();
        if (result.success) {
          setTeamMembers(result.data);
        }
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-x-hidden pt-14 md:pt-0">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Planet Background - positioned element, not fixed */}
        <div className="absolute inset-0">
          <img
            src="/home_planet.png"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[120%] max-w-none opacity-30 blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-6"
          >
            <span className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-thin tracking-tight text-white/90">
              About
            </span>
            <img
              src="/logo.png"
              alt="Xpecto"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 object-contain"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-white/50 font-light tracking-wide"
          >
            IIT Mandi's Annual Tech Fest
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Content Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Location Card - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-8">
              <IconMapPin className="w-8 h-8 text-white/40" />
              <span className="text-xs text-white/30 uppercase tracking-widest">
                Location
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-light mb-4">IIT Mandi</h3>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              Kamand, Himachal Pradesh
              <br />
              India — 175005
            </p>
            <a
              href="https://maps.google.com/?q=IIT+Mandi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
            >
              Open in Maps
              <IconArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-8">
              <IconMail className="w-8 h-8 text-white/40" />
              <span className="text-xs text-white/30 uppercase tracking-widest">
                Contact
              </span>
            </div>
            <div className="space-y-4">
              {contacts.map((contact, idx) => (
                <a
                  key={idx}
                  href={contact.href}
                  className="block text-xl text-white/70 hover:text-white transition-colors"
                >
                  {contact.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Instagram Card */}
          <motion.a
            href="https://instagram.com/xpecto_iitmandi"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-8 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-500 group"
          >
            <IconBrandInstagram className="w-10 h-10 text-white/60 mb-6 group-hover:scale-110 transition-transform" />
            <p className="text-2xl font-light">@xpecto_iitmandi</p>
            <p className="text-white/40 text-sm mt-2">Follow us on Instagram</p>
          </motion.a>

          {/* Leadership Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-8 bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors duration-500"
          >
            <span className="text-xs text-white/30 uppercase tracking-widest">
              Leadership
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {conveners.map((person, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10" />
                  <p className="text-sm font-medium">{person.name}</p>
                  <p className="text-xs text-white/40 mt-1">{person.role}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map Card - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-12 rounded-3xl overflow-hidden border border-white/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3398.289193080827!2d77.01885731512302!3d31.778448081269743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39048708163fd03f%3A0x8129a80ee5d5950b!2sIndian%20Institute%20of%20Technology%20Mandi!5e0!3m2!1sen!2sin!4v1621234567890!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale invert-[0.9] opacity-80 hover:opacity-100 transition-opacity duration-500 md:h-[400px]"
            />
          </motion.div>

          {/* Developers Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-12 bg-white/[0.02] border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <IconCode className="w-6 h-6 text-white/40" />
              <span className="text-xs text-white/30 uppercase tracking-widest">
                Built by
              </span>
            </div>
            <div className="flex flex-wrap gap-8">
              {developers.map((dev, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-white/10" />
                  <div>
                    <p className="font-medium">{dev.name}</p>
                    <p className="text-sm text-white/40">{dev.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-20 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <IconUsers className="w-6 h-6 sm:w-8 sm:h-8 text-white/40" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">Our Team</h2>
          </div>
          <p className="text-white/50 text-base sm:text-lg">
            Meet the people who make Xpecto happen
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-white/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-cyan-500/50 rounded-full animate-spin" />
            </div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center"
          >
            <p className="text-red-400">
              Unable to load team members. Please try again later.
            </p>
          </motion.div>
        ) : teamMembers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center"
          >
            <p className="text-white/40">No team members to display yet.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={member._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 group"
              >
                {/* Member Image */}
                <div className="relative mb-6">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl font-light text-white/20">
                        {member.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-medium group-hover:text-cyan-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-white/60 text-sm uppercase tracking-wide">
                    {member.team}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-sm text-white/30">© 2026 Xpecto, IIT Mandi</p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:tech@xpecto.org"
                className="text-sm text-white/30 hover:text-white/60 transition-colors"
              >
                Tech Support
              </a>
              <a
                href="https://instagram.com/xpecto_iitmandi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/30 hover:text-white/60 transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
            <a
              href="/terms-of-service"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-white/20">•</span>
            <a
              href="/privacy-policy"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
