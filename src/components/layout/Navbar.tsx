import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Portfólio", path: "/portfolio" },
    { name: "Serviços", path: "/servicos" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-light tracking-widest text-zinc-900 uppercase"
        >
          Studio <span className="font-semibold text-[#D4AF37]">Nail</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-light">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors duration-200 relative py-1 ${
                isActive(link.path)
                  ? "text-[#997A15] font-medium"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden md:block">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contato"
              className="flex items-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 text-xs font-medium px-5 py-2.5 rounded-full shadow-md hover:opacity-90 transition-opacity"
            >
              <Calendar size={14} />
              Agendar Horário
            </Link>
          </motion.div>
        </div>

        {/* Botão Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-800 focus:outline-none p-2"
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile Fluído com Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-b border-zinc-200 px-6 pt-4 pb-6 space-y-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-base font-light transition-colors ${
                  isActive(link.path)
                    ? "text-[#997A15] font-medium"
                    : "text-zinc-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="/contato"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 text-sm font-medium py-3 rounded-xl shadow-md"
              >
                <Calendar size={16} />
                Agendar Horário
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
