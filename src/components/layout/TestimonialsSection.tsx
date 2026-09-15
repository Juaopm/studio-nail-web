import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircleHeart,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Testimonial {
  id: number;
  title: string;
  imageUrl: string;
  whatsappUrl: string;
  altText: string;
}

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar depoimentos:", err);
        setLoading(false);
      });
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Classes de rotação controlada para o mural desktop
  const rotations = [
    "-rotate-2",
    "rotate-1",
    "-rotate-1.5",
    "rotate-2",
    "rotate-1",
    "-rotate-1",
  ];
  const offsets = [
    "translate-y-0",
    "translate-y-4",
    "-translate-y-2",
    "translate-y-3",
    "translate-y-1",
    "-translate-y-3",
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Cabeçalho da Seção */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/15 text-[#997A15] text-xs font-medium tracking-wide uppercase">
          <MessageCircleHeart size={14} />
          <span>Prova Social</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight">
          O carinho de quem já viveu{" "}
          <span className="font-semibold bg-linear-to-r from-[#D4AF37] to-[#B89728] bg-clip-text text-transparent">
            essa experiência.
          </span>
        </h2>
        <p className="text-zinc-600 max-w-xl mx-auto font-light text-sm sm:text-base">
          Confira alguns dos feedbacks que recebemos pelo WhatsApp.
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-12 text-zinc-400 font-light text-sm">
          Carregando depoimentos...
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 text-zinc-400 font-light text-sm">
          Nenhum depoimento cadastrado no momento.
        </div>
      ) : (
        <>
          {/* DESKTOP & TABLET: Mural Estilizado (Quadro) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center py-6">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                onClick={() =>
                  setSelectedImage(item.whatsappUrl || item.imageUrl)
                }
                className={`relative group cursor-pointer bg-white p-3.5 pb-5 rounded-xl shadow-xl border border-zinc-200/85 transition-transform duration-300 w-full max-w-xs ${rotations[index % rotations.length]} ${offsets[index % offsets.length]}`}
              >
                <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-zinc-100">
                  <img
                    src={item.imageUrl}
                    alt={item.altText || item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#D4AF37]">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-[11px] font-medium text-zinc-700 truncate max-w-37.5">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                    Feedback
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MOBILE: Carrossel Centralizado (Um card por vez) */}
          <div className="md:hidden w-full max-w-xs mx-auto relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    setSelectedImage(item.whatsappUrl || item.imageUrl)
                  }
                  className="w-full shrink-0 snap-center bg-white p-3.5 pb-5 rounded-xl shadow-lg border border-zinc-200/85 cursor-pointer"
                >
                  <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-zinc-100">
                    <img
                      src={item.imageUrl}
                      alt={item.altText || item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between px-1">
                    <span className="text-[11px] font-medium text-zinc-700 truncate max-w-50">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      Feedback
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles de Navegação Mobile */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-600 hover:bg-[#D4AF37] hover:text-white transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-white border border-zinc-200 shadow-sm flex items-center justify-center text-zinc-600 hover:bg-[#D4AF37] hover:text-white transition-colors"
                aria-label="Próximo"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal Lightbox Limpo (Fecha ao clicar fora da imagem) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center cursor-default"
            >
              <div className="relative inline-block max-h-[85vh] overflow-hidden rounded-xl shadow-2xl border border-zinc-800 bg-white p-2">
                <img
                  src={selectedImage}
                  alt="Print Ampliado"
                  className="max-h-[80vh] max-w-full block object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
