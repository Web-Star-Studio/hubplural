'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const contactQuickInfo = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Telefone',
    value: '(81) 3030-3030'
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'E-mail',
    value: 'contato@hubplural.com'
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Endereço',
    value: 'Recife, Pernambuco'
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: 'Horário',
    value: 'Seg-Sex: 8h às 18h'
  }
];

export default function ContactHeroSection() {
  return (
    <section className="relative min-h-[60vh] bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-28">
        
        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-amber-400 mb-6 uppercase"
          >
            Entre em Contato
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight mb-6"
          >
            Vamos Conversar
            <br />
            <span className="text-white/80">Sobre Seu Projeto</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Estamos aqui para ajudar você a encontrar o espaço de trabalho perfeito. 
            Entre em contato conosco e descubra como podemos impulsionar seu negócio.
          </motion.p>

          {/* Quick Contact Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {contactQuickInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center group hover:bg-white/15 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-black group-hover:bg-white group-hover:text-amber-500 transition-all duration-300"
                >
                  {item.icon}
                </motion.div>
                
                <div className="text-sm font-medium text-white/60 uppercase tracking-wide mb-2">
                  {item.label}
                </div>
                
                <div className="text-white font-medium">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-blue-400/5 rounded-full blur-3xl"></div>
    </section>
  );
} 