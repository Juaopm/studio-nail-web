import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Calendar, Store } from "lucide-react";
import { motion } from "framer-motion";
import perfilImg from "../assets/perfil.jpg";
import studioImg from "../assets/studio.jpg";

export const About: React.FC = () => {
  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Cabeçalho da Seção */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/15 text-[#997A15] text-xs font-medium tracking-wide uppercase">
          <Sparkles size={14} />
          <span>Muito prazer, eu sou a Marcele</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight">
          Sobre a{" "}
          <span className="font-semibold bg-linear-to-r from-[#D4AF37] to-[#B89728] bg-clip-text text-transparent">
            Profissional
          </span>
        </h1>
        <p className="text-zinc-600 max-w-xl mx-auto font-light text-sm sm:text-base">
          Por trás de cada alongamento, de cada atendimento e de cada detalhe
          existe uma mulher que sonha, trabalha, ama e está sempre em movimento.
        </p>
      </motion.div>

      {/* Seção 1: História Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-72 h-96 sm:w-80 sm:h-105 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={perfilImg}
              alt="Marcele Machado"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          <h2 className="text-2xl sm:text-3xl font-light text-zinc-900">
            Acredito que o sucesso é construído{" "}
            <span className="font-medium text-[#997A15]">todos os dias</span>.
          </h2>

          <div className="space-y-4 text-zinc-600 font-light text-sm sm:text-base leading-relaxed">
            <p>
              Atuando há 2 anos como Nail Designer em Porto Alegre, transformei
              minha paixão por cuidar de pessoas em um studio especializado em
              valorizar a beleza e a autoestima através de cada detalhe.
            </p>
            <p>
              Minha mente não para, meu coração não para, e meus sonhos muito
              menos. Além do studio de unhas, sou empreendedora à frente da{" "}
              <strong>Maré Closet</strong>, minha loja de roupas e perfumes.
            </p>
          </div>

          {/* Grid de Características Pessoais baseadas no post */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3 rounded-xl bg-white border border-zinc-200/80 shadow-sm text-left">
              <span className="block text-xs font-bold text-[#997A15] uppercase">
                Família
              </span>
              <span className="text-xs text-zinc-600 font-light">
                Mãe da Manu e do Murilo
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-zinc-200/80 shadow-sm text-left">
              <span className="block text-xs font-bold text-[#997A15] uppercase">
                Essência
              </span>
              <span className="text-xs text-zinc-600 font-light">
                Apaixonada pelo mar e pela lua
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-zinc-200/80 shadow-sm text-left col-span-2 sm:col-span-1">
              <span className="block text-xs font-bold text-[#997A15] uppercase">
                Signo
              </span>
              <span className="text-xs text-zinc-600 font-light">
                Taurina determinada e leal
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Seção 2: O Studio Físico */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-linear-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      >
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/15 text-[#E5C158] text-xs font-medium tracking-wide uppercase">
            <Store size={14} />
            <span>Nosso Espaço em Porto Alegre</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-white">
            Um ambiente preparado para o seu{" "}
            <span className="font-semibold text-[#E5C158]">
              absoluto conforto
            </span>
            .
          </h2>
          <p className="text-zinc-400 font-light text-sm sm:text-base leading-relaxed">
            Localizado no Centro Comercial Lindóia, o Studio MA Nails foi
            pensado milimetricamente para proporcionar uma experiência
            intimista, higienizada e acolhedora. Venha tomar um café e cuidar de
            você em um espaço feito com amor e sofisticação.
          </p>
          <div className="pt-2">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 font-medium text-sm px-8 py-3.5 rounded-full hover:opacity-95 transition-all duration-300 shadow-md"
              >
                <Calendar size={16} />
                Agendar Meu Horário
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40">
            <img
              src={studioImg}
              alt="Studio Marcele Machado Nails"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
