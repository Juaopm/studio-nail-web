import React, { useState } from "react";
import { Sparkles, ZoomIn, Plus } from "lucide-react";

export const Portfolio: React.FC = () => {
  // Estado para controlar quantas fotos são exibidas por vez
  const [visibleCount, setVisibleCount] = useState(12);

  // Estado para o Modal Lightbox da foto selecionada
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Simulação da lista completa com as 70 fotos (aqui você pode mapear os arquivos reais depois)
  const allPortfolioItems = Array.from({ length: 70 }, (_, index) => ({
    id: index + 1,
    title: `Trabalho Exclusivo #${index + 1}`,
    // Usando imagens de exemplo em alta qualidade; depois é só trocar pelos imports locais ou caminhos públicos
    url: `https://images.unsplash.com/photo-${1600000000000 + index * 154321}?auto=format&fit=crop&w=800&q=80`,
  }));

  // Itens atualmente visíveis com base no contador
  const visibleItems = allPortfolioItems.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, allPortfolioItems.length));
  };

  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Cabeçalho da Seção */}
      <div className="text-center space-y-4 mb-16">
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
      </div>

      {/* Grid Organizado de Fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item.url)}
            className="group relative h-80 rounded-2xl overflow-hidden shadow-md bg-zinc-100 cursor-pointer border border-zinc-200/60"
          >
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay ao passar o mouse */}
            <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white text-sm font-light flex items-center justify-between">
                <span>{item.title}</span>
                <ZoomIn size={18} className="text-[#E5C158]" />
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Carregar Mais */}
      {visibleCount < allPortfolioItems.length && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 font-medium text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm"
          >
            <Plus size={16} className="text-[#D4AF37]" />
            Carregar Mais Fotos ({allPortfolioItems.length - visibleCount}{" "}
            restantes)
          </button>
        </div>
      )}

      {/* Modal Lightbox para Ampliar a Imagem */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Visualização Ampliada"
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl border border-zinc-800"
            />
            <span className="absolute top-4 right-4 text-white text-xs bg-zinc-800/80 px-3 py-1.5 rounded-full">
              Clique em qualquer lugar para fechar
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
