import React from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import perfilImg from "../assets/perfil.jpg";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-rose-50 via-white to-zinc-50 py-16 lg:py-24">
        {/* Elemento decorativo de fundo */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Lado Esquerdo/Centro: Foto Profissional com Moldura de Trabalho (Placeholder) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-96 sm:w-80 sm:h-105 rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                {/* Imagem temporária de perfil profissional */}
                <img
                  src={perfilImg}
                  alt="Profissional Nail Designer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradiente sobre a foto para dar elegância */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-widest text-rose-300 font-medium">
                      Studio Nail
                    </p>
                    <p className="text-lg font-light">Excelência e Detalhes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Direito: Nome, Saudação e CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 text-rose-700 text-xs font-medium tracking-wide uppercase">
                <Sparkles size={14} />
                <span>Atendimento Exclusivo em Porto Alegre</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900">
                A arte de transformar <br />
                <span className="font-semibold text-rose-500">
                  suas unhas em joias.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Cada atendimento é pensado para realçar sua beleza natural e
                elevar sua autoestima. Técnicas avançadas de alongamento,
                blindagem e *nail art* com produtos de altíssima qualidade.
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/contato"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-rose-200 hover:shadow-xl"
                >
                  <Calendar size={18} />
                  Agendar Meu Horário
                </Link>

                <Link
                  to="/portfolio"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-sm font-medium px-8 py-3.5 rounded-full transition-all duration-300"
                >
                  <span>Ver Portfólio</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Indicador rápido de confiança */}
              <div className="pt-6 border-t border-zinc-200 flex items-center justify-center lg:justify-start gap-8 text-xs text-zinc-500">
                <div>
                  <span className="block text-lg font-bold text-zinc-800">
                    +500
                  </span>
                  <span>Clientes Atendidas</span>
                </div>
                <div className="w-px h-8 bg-zinc-200" />
                <div>
                  <span className="block text-lg font-bold text-zinc-800">
                    100%
                  </span>
                  <span>Esterilizado & Seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
