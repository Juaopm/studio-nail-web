import React, { useState } from "react";
import {
  Sparkles,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Fibra de Vidro",
    date: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode montar a lógica para disparar direto pro WhatsApp ou salvar no back-end depois
    setSubmitted(true);
  };

  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Cabeçalho da Seção */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5C158]/15 text-[#997A15] text-xs font-medium tracking-wide uppercase">
          <Sparkles size={14} />
          <span>Atendimento Personalizado</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight">
          Agende Seu{" "}
          <span className="font-semibold bg-linear-to-r from-[#D4AF37] to-[#B89728] bg-clip-text text-transparent">
            Horário
          </span>
        </h1>
        <p className="text-zinc-600 max-w-xl mx-auto font-light text-sm sm:text-base">
          Preencha o formulário abaixo para solicitar o seu agendamento ou entre
          em contato diretamente pelo nosso canal de atendimento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Coluna Esquerda: Informações de Contato e Localização */}
        <div className="lg:col-span-5 space-y-8 bg-linear-to-br from-zinc-900 to-zinc-950 text-white p-8 sm:p-10 rounded-2xl border border-[#D4AF37]/30 shadow-xl">
          <div className="space-y-3">
            <h3 className="text-xl font-light tracking-wide">
              Informações de Contato
            </h3>
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              Atendimento exclusivo com horário marcado para garantir total
              dedicação ao seu procedimento.
            </p>
          </div>

          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                <MapPin size={20} />
              </div>
              <div>
                <strong className="block font-medium text-white">
                  Localização
                </strong>
                <span className="text-zinc-400 font-light">
                  Av Assis Brasil 3532, sala 609 — Centro Comercial Lindóia,
                  Porto Alegre - RS
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                <Clock size={20} />
              </div>
              <div>
                <strong className="block font-medium text-white">
                  Horário de Funcionamento
                </strong>
                <span className="text-zinc-400 font-light">
                  Segunda a Sábado: das 08:00 às 19:30
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <a
              href="https://wa.me/555191103238"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 font-medium text-sm py-3.5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-md"
            >
              <MessageCircle size={18} />
              Chamar Direto no WhatsApp
            </a>
          </div>
        </div>

        {/* Coluna Direita: Formulário de Solicitação */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-zinc-200/80 shadow-md">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-[#E5C158]/15 text-[#997A15] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-light text-zinc-900">
                Solicitação Enviada!
              </h3>
              <p className="text-zinc-600 font-light text-sm max-w-md mx-auto">
                Recebemos os seus dados. Entraremos em contato em breve para
                confirmar o seu horário no Studio Nail.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs font-medium text-[#997A15] hover:underline uppercase tracking-wider"
              >
                Enviar nova solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    WhatsApp / Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(51) 99999-9999"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Procedimento Desejado
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors bg-white"
                  >
                    <option value="Molde F1">Molde F1 (R$ 149,90)</option>
                    <option value="Fibra de Vidro">
                      Fibra de Vidro (R$ 189,90)
                    </option>
                    <option value="Manutenção">Manutenção (R$ 120,00)</option>
                    <option value="Banho de Gel">
                      Banho de Gel (R$ 119,90)
                    </option>
                    <option value="Blindagem">Blindagem (R$ 109,90)</option>
                    <option value="Esmaltação em Gel Mãos">
                      Esmaltação em Gel (Mãos) (R$ 79,90)
                    </option>
                    <option value="Pé com Gel">Pé com Gel (R$ 79,90)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Data Preferida
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                  Observações (Opcional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tem alguma preferência de horário ou arte específica?"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 font-medium text-sm py-4 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
              >
                <Send size={16} />
                Solicitar Agendamento
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
