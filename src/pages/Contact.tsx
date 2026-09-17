import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  Calendar,
} from "lucide-react";

const SERVICE_IDS: Record<string, number> = {
  "Molde F1": 1,
  "Fibra de Vidro": 2,
  Manutenção: 3,
  "Banho de Gel": 4,
  Blindagem: 5,
  "Esmaltação em Gel Mãos": 6,
  "Pé com Gel": 7,
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Fibra de Vidro",
    date: "",
    time: "",
  });

  const [step, setStep] = useState<"form" | "selecting-time">("form");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Função para aplicar a máscara de telefone automaticamente: (99) 99999-9999
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : "";
    }
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleFetchAvailableTimes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.name || !formData.phone) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const serviceId = SERVICE_IDS[formData.service] || 2;
      const response = await fetch(
        `http://localhost:8080/api/appointments/available-times?serviceId=${serviceId}&date=${formData.date}`,
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar horários disponíveis.");
      }

      const times: string[] = await response.json();
      setAvailableTimes(times);
      setStep("selecting-time");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Não foi possível carregar os horários. Verifique se o servidor está rodando.",
      );
    } finally {
      setStatus("idle");
    }
  };

  const handleFinalSubmit = async () => {
    if (!formData.time) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const serviceId = SERVICE_IDS[formData.service] || 2;

      const payload = {
        serviceId: serviceId,
        clientName: formData.name,
        clientPhone: formData.phone,
        date: formData.date,
        time: formData.time,
      };

      const response = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erro ao realizar o pré-agendamento.");
      }

      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(
        error.message || "Ocorreu um erro ao salvar o agendamento.",
      );
      setStatus("idle");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setStep("form");
    setFormData({
      name: "",
      phone: "",
      service: "Fibra de Vidro",
      date: "",
      time: "",
    });
    setAvailableTimes([]);
    setErrorMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-full py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
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
              <a
                href="https://www.google.com/maps/place/Marcele+Machado+Nails+Designer+-+ALONGAMENTO+DE+UNHAS+PORTO+ALEGRE/@-30.0100247,-51.1519321,17z/data=!3m1!4b1!4m6!3m5!1s0x9519771a0efe56a1:0xa092649d900b5110!8m2!3d-30.0100247!4d-51.1519321!16s%2Fg%2F11zdb_y9lj?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group text-left"
              >
                <div className="p-3 rounded-xl bg-zinc-800 text-[#D4AF37] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                    Localização
                  </h4>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    Av Assis Brasil 3532, sala 609 — Centro Comercial Lindóia,
                    Porto Alegre - RS
                  </p>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-4 text-left">
              <div className="p-3 rounded-xl bg-zinc-800 text-[#D4AF37] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Horário de Funcionamento
                </h4>
                <p className="text-sm text-zinc-400">
                  Segunda a Sábado: das 08:00 às 19:30
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="https://wa.me/555191103238"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 font-medium text-sm py-3.5 rounded-xl hover:opacity-90 transition-all duration-300 shadow-md"
              >
                <MessageCircle size={18} />
                Chamar direto no WhatsApp
              </a>
            </motion.div>
          </div>
        </div>

        {/* Coluna Direita: Formulário */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-zinc-200/80 shadow-md">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
              {errorMessage}
            </div>
          )}

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="py-16 text-center space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-16 h-16 bg-[#E5C158]/15 text-[#997A15] rounded-full flex items-center justify-center mx-auto"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15,
                    ease: "easeOut",
                  }}
                >
                  <CheckCircle2 size={32} />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.25,
                  ease: "easeOut",
                }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-light text-zinc-900">
                  Pré-agendamento realizado! ✨
                </h3>

                <p className="text-zinc-600 font-light text-sm max-w-md mx-auto leading-relaxed">
                  Seu horário foi reservado com sucesso. A profissional validará
                  sua solicitação em instantes e você receberá a confirmação
                  oficial por WhatsApp.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="flex flex-col items-center gap-4"
              >
                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 bg-white text-[#997A15] text-xs font-medium uppercase tracking-wider hover:border-[#D4AF37] hover:bg-[#E5C158]/10 transition-all duration-300"
                >
                  <span className="text-base leading-none">＋</span>
                  Enviar nova solicitação
                </motion.button>

                <p className="text-xs text-zinc-400 font-light italic">
                  Será um prazer cuidar de você. ✨
                </p>
              </motion.div>
            </motion.div>
          ) : step === "selecting-time" ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-zinc-900">
                  Selecione o horário desejado
                </h3>
                <p className="text-xs text-zinc-500">
                  Horários livres para{" "}
                  <span className="font-semibold text-zinc-800">
                    {formData.date}
                  </span>{" "}
                  ({formData.service}):
                </p>
              </div>

              {availableTimes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableTimes.map((slot) => {
                    const formattedTime = slot.slice(0, 5);
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-200 ${
                          formData.time === slot
                            ? "bg-[#D4AF37] text-zinc-950 border-[#D4AF37] shadow-sm"
                            : "border-zinc-200 text-zinc-700 hover:border-[#D4AF37] hover:bg-zinc-50"
                        }`}
                      >
                        {formattedTime}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-zinc-500 bg-zinc-50 rounded-xl border border-dashed border-zinc-200 px-4">
                  {new Date(formData.date + "T00:00:00").getDay() === 0 ? (
                    <span className="font-medium text-zinc-700">
                      📅 O estúdio não abre aos domingos. Por favor, selecione
                      uma data de segunda a sábado.
                    </span>
                  ) : (
                    <span>
                      Não há horários disponíveis para esta data. Lembre-se que
                      o agendamento exige antecedência mínima de 24h.
                    </span>
                  )}
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep("form")}
                  className="w-1/3 py-3 rounded-xl border border-zinc-200 text-zinc-600 text-sm font-medium hover:bg-zinc-50 transition-colors"
                >
                  Voltar
                </button>

                <motion.button
                  type="button"
                  disabled={!formData.time || status === "loading"}
                  onClick={handleFinalSubmit}
                  whileHover={
                    formData.time && status !== "loading" ? { scale: 1.01 } : {}
                  }
                  whileTap={
                    formData.time && status !== "loading" ? { scale: 0.98 } : {}
                  }
                  className="w-2/3 flex items-center justify-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 font-medium text-sm py-3 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Reservando horário...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Solicitar agendamento
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFetchAvailableTimes} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    required
                    disabled={status === "loading"}
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors disabled:bg-zinc-50 disabled:text-zinc-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    WhatsApp / Telefone
                  </label>
                  <input
                    type="tel"
                    required
                    disabled={status === "loading"}
                    placeholder="(51) 99999-9999"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors disabled:bg-zinc-50 disabled:text-zinc-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Procedimento Desejado
                  </label>
                  <select
                    disabled={status === "loading"}
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors bg-white disabled:bg-zinc-50 disabled:text-zinc-400"
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
                    Data preferida para atendimento
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    disabled={status === "loading"}
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors disabled:bg-zinc-50 disabled:text-zinc-400"
                  />
                </div>
              </div>

              <motion.div
                whileHover={status !== "loading" ? { scale: 1.01 } : {}}
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
              >
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-[#D4AF37] to-[#B89728] text-zinc-950 font-medium text-sm py-4 rounded-xl hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-all duration-300 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Buscando horários livres...
                    </>
                  ) : (
                    <>
                      <Calendar size={16} />
                      Ver horários disponíveis
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};
