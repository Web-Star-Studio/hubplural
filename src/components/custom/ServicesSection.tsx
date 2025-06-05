'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Coffee, Calendar, Headphones, Shield, Clock, MapPin } from 'lucide-react';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 'coworking',
    icon: <Users className="w-8 h-8" />,
    title: 'COWORKING SPACES',
    description: 'Ambientes colaborativos e inspiradores para profissionais e equipes',
    features: ['Espaços compartilhados', 'Networking', 'Ambiente produtivo', 'Comunidade ativa']
  },
  {
    id: 'private-offices',
    icon: <MapPin className="w-8 h-8" />,
    title: 'ESCRITÓRIOS PRIVATIVOS',
    description: 'Escritórios exclusivos com total privacidade e flexibilidade',
    features: ['100% privativo', 'Mobília completa', 'Contratos flexíveis', 'Localização premium']
  },
  {
    id: 'meeting-rooms',
    icon: <Calendar className="w-8 h-8" />,
    title: 'SALAS DE REUNIÃO',
    description: 'Salas equipadas para reuniões, apresentações e eventos corporativos',
    features: ['Tecnologia moderna', 'Capacidades variadas', 'Reserva online', 'Suporte técnico']
  },
  {
    id: 'virtual-office',
    icon: <Wifi className="w-8 h-8" />,
    title: 'ESCRITÓRIO VIRTUAL',
    description: 'Endereço comercial prestigioso sem os custos de um escritório físico',
    features: ['Endereço comercial', 'Recepção de correspondência', 'Atendimento telefônico', 'Acesso eventual']
  },
  {
    id: 'amenities',
    icon: <Coffee className="w-8 h-8" />,
    title: 'COMODIDADES',
    description: 'Facilidades completas para seu conforto e produtividade',
    features: ['Coffee bar premium', 'Internet alta velocidade', 'Impressão ilimitada', 'Recepção dedicada']
  },
  {
    id: 'support',
    icon: <Headphones className="w-8 h-8" />,
    title: 'SUPORTE 24/7',
    description: 'Atendimento completo e suporte técnico para todas as suas necessidades',
    features: ['Suporte técnico', 'Atendimento personalizado', 'Manutenção preventiva', 'Segurança 24h']
  }
];

const ServicesSection: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase"
          >
            Nossos Serviços
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            SOLUÇÕES COMPLETAS
            <br />
            <span className="text-neutral-600">PARA SEU NEGÓCIO</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-lg md:text-xl text-neutral-600 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Oferecemos uma gama completa de serviços para impulsionar sua produtividade 
            e conectar você com uma comunidade vibrante de profissionais
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative"
            >
              <div className={`
                relative p-8 md:p-10 bg-white border border-neutral-200 
                transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                hover:border-neutral-800 hover:shadow-2xl hover:-translate-y-2
                ${hoveredService === service.id ? 'scale-105' : 'scale-100'}
              `}>
                
                {/* Icon */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-16 h-16 mb-6 flex items-center justify-center rounded-full
                    transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                    ${hoveredService === service.id 
                      ? 'bg-black text-white' 
                      : 'bg-neutral-100 text-black group-hover:bg-black group-hover:text-white'
                    }
                  `}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-black uppercase tracking-wide mb-4 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-600 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: (index * 0.1) + (featureIndex * 0.1) + 0.3 
                      }}
                      className="flex items-center text-sm text-neutral-500"
                    >
                      <div className={`
                        w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300
                        ${hoveredService === service.id ? 'bg-black' : 'bg-neutral-300'}
                      `} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* Hover overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br from-black/5 to-transparent 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                `} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16 md:mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-8 md:px-10 py-4 md:py-5 bg-black text-white font-medium uppercase tracking-wider
              transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              hover:bg-neutral-800 hover:shadow-xl border border-black
              focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-2
            "
          >
            Agendar Visita
          </motion.button>
          
          <p className="mt-4 text-sm text-neutral-500 font-light">
            Conheça nossos espaços e descubra a solução ideal para você
          </p>
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-neutral-50 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-neutral-50 to-transparent opacity-50 pointer-events-none" />
    </section>
  );
};

export default ServicesSection; 