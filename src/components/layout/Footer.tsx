import React from "react";
import { Link } from "react-router-dom";
import { Globe, MessageCircle, MapPin, Clock, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Coluna 1: Sobre a Marca */}
          <div className="space-y-4">
            <h3 className="text-lg font-light tracking-widest text-white uppercase">
              MA <span className="font-semibold text-[#D4AF37]">Nails</span>
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Transformando o cuidado com as suas unhas em uma experiência única
              de elegância, autoestima e sofisticação.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.instagram.com/mahmachado.nails/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 hover:bg-[#D4AF37] hover:text-zinc-950 transition-all duration-300"
                aria-label="Redes Sociais"
              >
                <Globe size={18} />
              </a>
              <a
                href="https://wa.me/555191103238"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 hover:bg-[#D4AF37] hover:text-zinc-950 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#D4AF37] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Portfólio
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Serviços e Valores
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Sobre a Profissional
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Agendamento
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento e Localização */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase">
              Atendimento
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  Av Assis Brasil 3532, sala 609 - centro comercial Lindóia,
                  Porto Alegre.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Segunda a Sábado: das 08:00 às 19:30</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Divisória Inferior e Autoria */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>
            © {new Date().getFullYear()} Marcele Machado Nails. Todos os
            direitos reservados.
          </p>
          <p className="flex items-center gap-1">
            Desenvolvido com{" "}
            <Heart size={14} className="text-[#D4AF37] fill-[#D4AF37]" /> por{" "}
            <span className="text-zinc-300 font-medium">João Mota</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
