import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircleHeart, ZoomIn } from "lucide-react";

interface Testimonial {
  id: number;
  imageUrl: string;
  altText: string;
}

// Mock inicial estruturado exatamente no padrão que virá da API
const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
    altText: "Feedback de cliente via WhatsApp - Alongamento",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    altText: "Feedback de cliente - Durabilidade",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    altText: "Feedback de cliente - Molde F1",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    altText: "Feedback de cliente - Elogio ao atendimento",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Classes de rotação controlada e intencional para dar o aspecto de mural artesanal
  const rotations = ["-rotate-2", "rotate-1", "-rotate-1.5", "rotate-2"];
  const offsets = [
    "translate-y-0",
    "translate-y-4",
    "-translate-y-2",
    "translate-y-3",
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
          O que elas{" "}
          <span className="font-semibold bg-linear-to-r from-[#D4AF37] to-[#B89728] bg-clip-text text-transparent">
            dizem por aí
          </span>
        </h2>
        <p className="text-zinc-600 max-w-xl mx-auto font-light text-sm sm:text-base">
          O carinho e a confiança de quem já viveu a experiência do nosso
          estúdio, direto das conversas reais.
        </p>
      </motion.div>

      {/* DESKTOP & TABLET: Mural Estilizado (Quadro) */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 items-center justify-items-center py-6">
        {MOCK_TESTIMONIALS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            onClick={() => setSelectedImage(item.imageUrl)}
            className={`relative group cursor-pointer bg-white p-3.5 pb-5 rounded-xl shadow-xl border border-zinc-200/80 transition-transform duration-300 w-full max-w-xs ${rotations[index % rotations.length]} ${offsets[index % offsets.length]}`}
          >
            {/* Imagem do Print */}
            <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-zinc-100">
              <img
                src={item.imageUrl}
                alt={item.altText}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay de Zoom Discreto */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center text-[#D4AF37]">
                  <ZoomIn size={18} />
                </div>
              </div>
            </div>

            {/* Detalhe estético simulando borda inferior de foto/print */}
            <div className="mt-3 text-center">
              <span className="text-[11px] font-light text-zinc-400 tracking-wider uppercase">
                Depoimento Real
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MOBILE: Carrossel Horizontal Fluido */}
      <div className="md:hidden flex overflow-x-auto gap-5 pb-6 pt-2 px-2 snap-x snap-mandatory scrollbar-none">
        {MOCK_TESTIMONIALS.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => setSelectedImage(item.imageUrl)}
            className="shrink-0 w-72 bg-white p-3.5 pb-5 rounded-xl shadow-lg border border-zinc-200/80 snap-center rotate-1 cursor-pointer"
          >
            <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-zinc-100">
              <img
                src={item.imageUrl}
                alt={item.altText}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-3 text-center">
              <span className="text-[11px] font-light text-zinc-400 tracking-wider uppercase">
                Depoimento Real
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Lightbox para Ampliar o Print */}
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
              className="relative max-w-3xl w-full max-h-[90vh] flex items-center justify-center"
            >
              <div className="relative inline-block max-h-[85vh] overflow-hidden rounded-xl shadow-2xl border border-zinc-800 bg-white p-2">
                <img
                  src={selectedImage}
                  alt="Print Ampliado"
                  className="max-h-[80vh] max-w-full block object-contain rounded-lg"
                />
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 text-xs text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 px-3.5 py-2 rounded-full border border-white/10 transition-colors z-10"
              >
                ✕ Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
