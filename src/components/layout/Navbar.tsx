import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Portfólio", path: "/portfolio" },
    { name: "Serviços", path: "/servicos" },
    { name: "Sobre", path: "/sobre" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5C158]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo com Degradê Dourado */}
        <Link
          to="/"
          className="text-xl font-light tracking-widest text-zinc-800 uppercase"
        >
          Studio{" "}
          <span className="font-semibold bg-linear-to-r from-[#D4AF37] to-[#997A15] bg-clip-text text-transparent">
            Nail
          </span>
        </Link>

        {/* Links Desktop Centralizados */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-zinc-600 hover:text-[#D4AF37] transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button Dourado Luxo */}
        <div className="hidden md:block">
          <Link
            to="/contato"
            className="flex items-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] hover:opacity-90 text-zinc-950 font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-[#D4AF37]/20"
          >
            <Calendar size={16} />
            Agendar Horário
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-700 hover:text-[#D4AF37] focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#E5C158]/30 px-4 pt-2 pb-6 space-y-3 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-zinc-700 hover:text-[#D4AF37] py-2 border-b border-zinc-50"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/contato"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 font-medium text-sm py-3 rounded-xl shadow-sm"
            >
              <Calendar size={16} />
              Agendar Horário
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
