import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Calendar } from "lucide-react";

export const Services: React.FC = () => {
  const servicesList = [
    {
      id: 1,
      title: "Molde F1",
      description:
        "Alongamento com molde F1 de alta precisão e acabamento impecável, incluindo esmaltação em gel.",
      price: "149,90",
      highlight: true,
    },
    {
      id: 2,
      title: "Fibra de Vidro",
      description:
        "Alongamento premium com fibra de vidro, garantindo máxima resistência, durabilidade e esmaltação em gel.",
      price: "189,90",
      highlight: true,
    },
    {
      id: 3,
      title: "Manutenção",
      description:
        "Manutenção periódica do alongamento estrutural com reestruturação e esmaltação em gel inclusa.",
      price: "120,00",
      highlight: false,
    },
    {
      id: 4,
      title: "Banho de Gel",
      description:
        "Nivelamento e fortalecimento profundo das unhas naturais para evitar quebras.",
      price: "119,90",
      highlight: false,
    },
    {
      id: 5,
      title: "Blindagem",
      description:
        "Proteção avançada e fortalecimento das unhas naturais mantendo o crescimento saudável.",
      price: "109,90",
      highlight: false,
    },
    {
      id: 6,
      title: "Esmaltação em Gel (Mãos)",
      description:
        "Esmaltação em gel de longa duração nas mãos, com brilho impecável por semanas.",
      price: "79,90",
      highlight: false,
    },
    {
      id: 7,
      title: "Pé com Gel",
      description:
        "Esmaltação em gel especializada nos pés, garantindo durabilidade e acabamento perfeito.",
      price: "79,90",
      highlight: false,
    },
  ];

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
          <span>Tabela de Procedimentos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight">
          Serviços &{" "}
          <span className="font-semibold bg-linear-to-r from-[#D4AF37] to-[#B89728] bg-clip-text text-transparent">
            Valores
          </span>
        </h1>
        <p className="text-zinc-600 max-w-xl mx-auto font-light text-sm sm:text-base">
          Escolha o procedimento ideal para cuidar da sua beleza e autoestima
          com produtos de altíssima qualidade e esterilização rigorosa.
        </p>
      </motion.div>

      {/* Grid de Serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {servicesList.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15 }}
            whileHover={{ y: -5, transition: { duration: 0.15 } }}
            className={`relative rounded-2xl p-8 flex flex-col justify-between transition-colors duration-300 border ${
              service.highlight
                ? "bg-linear-to-br from-zinc-900 to-zinc-950 text-white border-[#D4AF37]/50 shadow-xl shadow-zinc-900/10"
                : "bg-white text-zinc-800 border-zinc-200/80 shadow-md hover:border-[#D4AF37]/40"
            }`}
          >
            {service.highlight && (
              <span className="absolute -top-3 right-6 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Mais Procurado
              </span>
            )}

            <div className="space-y-4">
              <h3
                className={`text-xl font-medium tracking-wide ${service.highlight ? "text-white" : "text-zinc-900"}`}
              >
                {service.title}
              </h3>
              <p
                className={`text-sm font-light leading-relaxed ${service.highlight ? "text-zinc-300" : "text-zinc-600"}`}
              >
                {service.description}
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-zinc-200/20 flex items-end justify-between">
              <div>
                <span
                  className={`text-xs uppercase tracking-wider block ${service.highlight ? "text-zinc-400" : "text-zinc-500"}`}
                >
                  Valor
                </span>
                <span
                  className={`text-2xl font-light ${service.highlight ? "text-[#E5C158]" : "text-zinc-900 font-normal"}`}
                >
                  R$ {service.price}
                </span>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contato"
                  className={`flex items-center gap-1.5 text-xs font-medium px-4 py-2.5 rounded-full transition-all duration-300 ${
                    service.highlight
                      ? "bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 hover:opacity-90"
                      : "bg-zinc-100 hover:bg-[#D4AF37] hover:text-zinc-950 text-zinc-800"
                  }`}
                >
                  <Calendar size={14} />
                  Agendar
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Seção Informativa de Diferenciais */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-linear-to-r from-[#FBF9F1] via-amber-50/30 to-zinc-50 rounded-2xl p-8 sm:p-12 border border-[#E5C158]/30 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-2xl font-light text-zinc-900">
            Dúvidas sobre qual procedimento escolher?
          </h3>
          <p className="text-sm text-zinc-600 font-light max-w-xl">
            Entre em contato pelo WhatsApp para avaliarmos juntas qual técnica
            se adapta melhor ao formato e à saúde das suas unhas naturais.
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="shrink-0"
        >
          <Link
            to="/contato"
            className="flex items-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 font-medium text-sm px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-300 shadow-md"
          >
            <Sparkles size={16} />
            Falar com a Profissional
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
