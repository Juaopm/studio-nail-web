import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ZoomIn, Plus, Loader2, Calendar, Tag } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  category?: string;
  technique?: string;
  customDate?: string;
  imageUrl: string;
}

export const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  // Estado alterado para guardar o objeto inteiro do item selecionado (ou null)
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/portfolio")
      .then((response) => response.json())
      .then((data) => {
        setPortfolioItems(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar portfólio:", error);
        setIsLoading(false);
      });
  }, []);

  const visibleItems = portfolioItems.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 12, portfolioItems.length));
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Cabeçalho da Seção */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/15 text-[#997A15] text-xs font-medium tracking-wide uppercase">
          <Sparkles size={14} />
          <span>Galeria de Trabalhos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight">
          Portfólio{" "}
          <span className="font-semibold bg-linear-to-r from-[#D4AF37] to-[#B89728] bg-clip-text text-transparent">
            Completo
          </span>
        </h1>
        <p className="text-zinc-600 max-w-xl mx-auto font-light text-sm sm:text-base">
          Conheça a nossa galeria com registros de todos os procedimentos
          realizados. Precisão, técnica e durabilidade em cada detalhe.
        </p>
      </motion.div>

      {/* Estado de Carregamento Inicial */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 size={32} className="animate-spin text-[#D4AF37]" />
          <p className="text-sm text-zinc-500 font-light">
            Carregando trabalhos do estúdio...
          </p>
        </div>
      ) : (
        <>
          {/* Grid Organizado de Fotos com Hover Limpo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem(item)}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-md bg-zinc-100 cursor-pointer border border-zinc-200/60"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay Limpo com Círculo de Zoom */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#D4AF37] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn size={22} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botão Carregar Mais */}
          {visibleCount < portfolioItems.length && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <motion.div
                whileHover={!isLoadingMore ? { scale: 1.03 } : {}}
                whileTap={!isLoadingMore ? { scale: 0.97 } : {}}
              >
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2
                        size={16}
                        className="animate-spin text-[#D4AF37]"
                      />
                      Carregando trabalhos...
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="text-[#D4AF37]" />
                      Carregar mais trabalhos
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}
        </>
      )}

      {/* Modal Lightbox com Mini Card Condicional */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-fit max-w-4xl max-h-[90vh] flex items-center justify-center"
            >
              {/* Container interno que abraça a imagem */}
              <div className="relative inline-block max-h-[85vh] overflow-hidden rounded-xl shadow-2xl border border-zinc-800">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="max-h-[85vh] max-w-full block object-contain"
                />

                {/* O card só aparece se houver técnica, categoria ou data preenchidas no banco */}
                {(() => {
                  const hasDetails =
                    selectedItem.technique ||
                    selectedItem.category ||
                    selectedItem.customDate;

                  if (!hasDetails) return null;

                  return (
                    <div className="absolute bottom-4 left-4 bg-zinc-900/75 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl shadow-2xl text-white max-w-xs space-y-1 pointer-events-none">
                      {(selectedItem.technique || selectedItem.category) && (
                        <p className="text-xs text-zinc-300 flex items-center gap-1.5 font-light">
                          <Tag size={12} className="text-[#D4AF37]" />
                          {[selectedItem.technique, selectedItem.category]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      )}

                      {selectedItem.customDate && (
                        <p className="text-xs text-zinc-400 flex items-center gap-1.5 font-light">
                          <Calendar size={12} className="text-zinc-500" />
                          {selectedItem.customDate}
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Botão de Fechar Discreto */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-2 right-2 text-xs text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 px-3.5 py-2 rounded-full border border-white/10 transition-colors z-10"
              >
                ✕ Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
