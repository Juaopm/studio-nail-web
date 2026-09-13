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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Minimalista */}
        <Link
          to="/"
          className="text-xl font-light tracking-widest text-zinc-800 uppercase"
        >
          Studio <span className="font-semibold text-rose-500">Nail</span>
        </Link>

        {/* Links Desktop Centralizados */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-zinc-600 hover:text-rose-500 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/contato"
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-rose-200 hover:shadow-lg"
          >
            <Calendar size={16} />
            Agendar Horário
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-700 hover:text-rose-500 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-4 pt-2 pb-6 space-y-3 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-zinc-700 hover:text-rose-500 py-2 border-b border-zinc-50"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/contato"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-rose-500 text-white text-sm font-medium py-3 rounded-xl shadow-sm"
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
