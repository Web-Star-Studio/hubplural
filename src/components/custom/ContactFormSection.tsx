'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

const interestOptions = [
  'Coworking',
  'Escritório Privativo',
  'Sala de Reunião',
  'Escritório Virtual',
  'Evento/Workshop',
  'Consultoria',
  'Outros'
];

export default function ContactFormSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      interest: formData.get('interest') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        (event.target as HTMLFormElement).reset();
      } else {
        setError('Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-600" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-wide mb-4">
              Mensagem Enviada!
            </h2>
            
            <p className="text-neutral-600 font-light text-lg leading-relaxed mb-8">
              Obrigado pelo seu contato! Nossa equipe retornará em até 24 horas.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubmitted(false)}
              className="bg-amber-400 text-black px-8 py-4 font-bold uppercase tracking-wide hover:bg-amber-300 transition-all duration-300"
            >
              Enviar Nova Mensagem
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Formulário de Contato
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            Como Podemos
            <br />
            <span className="text-neutral-600">Ajudar Você?</span>
          </motion.h2>
        </motion.div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 p-4 flex items-center space-x-3 text-red-700"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-2"
              >
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 uppercase tracking-wide">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minLength={3}
                  maxLength={100}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 bg-neutral-50 focus:bg-white"
                  placeholder="Seu nome completo"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 uppercase tracking-wide">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={150}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 bg-neutral-50 focus:bg-white"
                  placeholder="seu@email.com"
                />
              </motion.div>
            </div>

            {/* Phone and Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-2"
              >
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 uppercase tracking-wide">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength={20}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 bg-neutral-50 focus:bg-white"
                  placeholder="(81) 99999-9999"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="space-y-2"
              >
                <label htmlFor="company" className="block text-sm font-medium text-neutral-700 uppercase tracking-wide">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  maxLength={100}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 bg-neutral-50 focus:bg-white"
                  placeholder="Nome da sua empresa"
                />
              </motion.div>
            </div>

            {/* Interest and Subject Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-2"
              >
                <label htmlFor="interest" className="block text-sm font-medium text-neutral-700 uppercase tracking-wide">
                  Interesse
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 bg-neutral-50 focus:bg-white"
                >
                  <option value="">Selecione uma opção</option>
                  {interestOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="space-y-2"
              >
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 uppercase tracking-wide">
                  Assunto *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  maxLength={150}
                  className="w-full px-4 py-3 border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 bg-neutral-50 focus:bg-white"
                  placeholder="Assunto da sua mensagem"
                />
              </motion.div>
            </div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="space-y-2"
            >
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 uppercase tracking-wide">
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                minLength={10}
                maxLength={1000}
                className="w-full px-4 py-3 border border-neutral-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 bg-neutral-50 focus:bg-white resize-none"
                placeholder="Conte-nos mais sobre suas necessidades..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-center"
            >
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.05 }}
                whileTap={{ scale: loading ? 1 : 0.95 }}
                className="bg-amber-400 text-black px-12 py-4 font-bold uppercase tracking-wide hover:bg-amber-300 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-3 mx-auto"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </motion.button>

              <p className="text-sm text-neutral-500 mt-4">
                * Campos obrigatórios. Responderemos em até 24 horas.
              </p>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
} 