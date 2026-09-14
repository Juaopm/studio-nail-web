import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import perfilImg from "../assets/perfil.jpg";

export const Home: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const printFeedbackItems = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Depoimento de Cliente #${index + 1}`,
    url: `https://images.unsplash.com/photo-${1500000000000 + index * 98765}?auto=format&fit=crop&w=600&q=80`,
  }));

  return (
    <div className="flex flex-col min-h-full">
      {/* 1. Hero Section (Tela Cheia) */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-linear-to-br from-[#FBF9F1] via-white to-zinc-50 py-12">
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#E5C158]/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-72 h-96 sm:w-80 sm:h-105 rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src={perfilImg}
                  alt="Marcele Machado - Nail Designer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-widest text-[#E5C158] font-medium">
                      Marcele Machado
                    </p>
                    <p className="text-lg font-light">
                      Seu estilo, em cada detalhe.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/15 text-[#997A15] text-xs font-medium tracking-wide uppercase">
                <Sparkles size={14} />
                <span>Atendimento Exclusivo em Porto Alegre</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-zinc-900">
                Suas unhas. <br />
                <span className="font-semibold bg-linear-to-r from-[#D4AF37] via-[#B89728] to-zinc-900 bg-clip-text text-transparent">
                  Sua assinatura.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Alongamento, blindagem e nail art com técnicas precisas e design
                pensado para o seu estilo.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/contato"
                    className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] hover:opacity-90 text-zinc-950 font-medium text-sm px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#D4AF37]/20"
                  >
                    <Calendar size={18} />
                    Agendar meu horário
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    to="/portfolio"
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 text-sm font-medium px-8 py-3.5 rounded-full transition-all"
                  >
                    <span>Ver portfólio</span>
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Seção de Serviços Principais (Tela Cheia com Fade-in ao scrollar) */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-white border-t border-zinc-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-3"
          >
            <h2 className="text-2xl sm:text-3xl font-light text-zinc-900">
              Procedimentos em{" "}
              <span className="font-semibold bg-linear-to-r from-[#D4AF37] to-[#B89728] bg-clip-text text-transparent">
                Destaque
              </span>
            </h2>
            <p className="text-zinc-600 font-light text-sm max-w-md mx-auto">
              Conheça as técnicas mais procuradas no studio para garantir
              durabilidade e sofisticação.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.15 } }}
              className="bg-[#FBF9F1]/50 p-8 rounded-2xl border border-[#E5C158]/30 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#997A15] font-semibold">
                  Mais Procurado
                </span>
                <h3 className="text-xl font-medium text-zinc-900">
                  Fibra de Vidro
                </h3>
                <p className="text-sm text-zinc-600 font-light leading-relaxed">
                  Alongamento premium com máxima resistência, acabamento natural
                  e esmaltação em gel inclusa.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-zinc-200/60">
                <span className="text-lg font-light text-zinc-900">
                  R$ 189,90
                </span>
                <Link
                  to="/servicos"
                  className="text-xs font-medium text-[#997A15] hover:underline uppercase tracking-wider"
                >
                  Ver Detalhes →
                </Link>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.15 } }}
              className="bg-[#FBF9F1]/50 p-8 rounded-2xl border border-[#E5C158]/30 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#997A15] font-semibold">
                  Precisão & Praticidade
                </span>
                <h3 className="text-xl font-medium text-zinc-900">Molde F1</h3>
                <p className="text-sm text-zinc-600 font-light leading-relaxed">
                  Alongamento com molde F1 de alta precisão, curvatura perfeita
                  e esmaltação em gel.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-zinc-200/60">
                <span className="text-lg font-light text-zinc-900">
                  R$ 149,90
                </span>
                <Link
                  to="/servicos"
                  className="text-xs font-medium text-[#997A15] hover:underline uppercase tracking-wider"
                >
                  Ver Detalhes →
                </Link>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.15 } }}
              className="bg-[#FBF9F1]/50 p-8 rounded-2xl border border-[#E5C158]/30 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#997A15] font-semibold">
                  Cuidado Essencial
                </span>
                <h3 className="text-xl font-medium text-zinc-900">
                  Banho de Gel
                </h3>
                <p className="text-sm text-zinc-600 font-light leading-relaxed">
                  Nivelamento e fortalecimento profundo diretamente sobre as
                  suas unhas naturais.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-zinc-200/60">
                <span className="text-lg font-light text-zinc-900">
                  R$ 119,90
                </span>
                <Link
                  to="/servicos"
                  className="text-xs font-medium text-[#997A15] hover:underline uppercase tracking-wider"
                >
                  Ver Detalhes →
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center pt-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-zinc-800 transition-all shadow-md"
              >
                <span>Ver tabela completa de serviços</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Carrossel de Prints (Tela Cheia com Fade-in ao scrollar) */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-linear-to-br from-zinc-900 via-zinc-950 to-zinc-900 text-white border-t border-[#D4AF37]/20 overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                O carinho de quem já viveu{" "}
                <span className="font-semibold text-[#E5C158]">
                  essa experiência.
                </span>
              </h2>
              <p className="text-zinc-400 font-light text-sm max-w-md">
                Confira alguns dos feedbacks que recebemos pelo WhatsApp.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-[#D4AF37] hover:text-zinc-950 transition-all cursor-pointer"
                aria-label="Rolar para esquerda"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:bg-[#D4AF37] hover:text-zinc-950 transition-all cursor-pointer"
                aria-label="Rolar para direita"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {printFeedbackItems.map((item) => (
              <div
                key={item.id}
                className="snap-start shrink-0 w-72 sm:w-80 h-105 rounded-2xl bg-zinc-950 border-2 border-[#D4AF37]/30 shadow-2xl overflow-hidden relative group hover:border-[#D4AF37] pointer-events-none transition-colors duration-300"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent p-4 flex items-center justify-between">
                  <span className="text-xs text-[#E5C158] font-medium uppercase tracking-wider">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 bg-zinc-900/80 px-2.5 py-1 rounded-full border border-zinc-700">
                    WhatsApp
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
