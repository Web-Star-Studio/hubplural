'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Coffee, Calendar, Headphones, Shield, Clock, MapPin, Building, Package, UserCheck } from 'lucide-react';
import { services as scrapedServices } from '@/data/hubPluralContent';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

// Mapeamento de ícones para os serviços
const getServiceIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('coworking')) return <Users className="w-8 h-8" />;
  if (titleLower.includes('escritório') || titleLower.includes('flexível')) return <Building className="w-8 h-8" />;
  if (titleLower.includes('reunião') || titleLower.includes('salas')) return <Calendar className="w-8 h-8" />;
  if (titleLower.includes('membership')) return <UserCheck className="w-8 h-8" />;
  if (titleLower.includes('estação') || titleLower.includes('fixa')) return <MapPin className="w-8 h-8" />;
  if (titleLower.includes('caixa') || titleLower.includes('postal')) return <Package className="w-8 h-8" />;
  if (titleLower.includes('evento')) return <Coffee className="w-8 h-8" />;
  return <Wifi className="w-8 h-8" />;
};

// Características para cada tipo de serviço
const getServiceFeatures = (title: string): string[] => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('coworking')) return ['Espaços compartilhados', 'Networking ativo', 'Ambiente inspirador', 'Comunidade vibrante'];
  if (titleLower.includes('escritório') || titleLower.includes('flexível')) return ['100% privativo', 'Sem manutenção', 'Contratos flexíveis', 'Localização premium'];
  if (titleLower.includes('reunião') || titleLower.includes('salas')) return ['Tecnologia moderna', 'Capacidades variadas', 'Reserva fácil', 'Suporte técnico'];
  if (titleLower.includes('membership')) return ['Acesso total', 'Benefícios exclusivos', 'Networking qualificado', 'Descontos especiais'];
  if (titleLower.includes('estação') || titleLower.includes('fixa')) return ['Espaço garantido', 'Ambiente colaborativo', 'Sempre disponível', 'Comunidade ativa'];
  if (titleLower.includes('caixa') || titleLower.includes('postal')) return ['Endereço comercial', 'Presença profissional', 'Recepção de correspondência', 'Credibilidade'];
  if (titleLower.includes('evento')) return ['Espaços modernos', 'Equipamentos inclusos', 'Networking', 'Suporte completo'];
  return ['Serviço completo', 'Atendimento premium', 'Flexibilidade', 'Suporte dedicado'];
};

const services: Service[] = scrapedServices.map((service, index) => ({
  id: `service-${index}`,
  icon: getServiceIcon(service.title),
  title: service.title.toUpperCase(),
  description: service.description,
  features: getServiceFeatures(service.title)
}));

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
            className="text-sm font-light tracking-[0.2em] text-neutral-500 mb-4 uppercase relative inline-block"
          >
            Nossos Serviços
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-secondary"></div>
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
                hover:border-neutral-800 hover:shadow-2xl hover:-translate-y-2 hover:border-t-4 hover:border-t-secondary
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
                      ? 'bg-red-700 text-white' 
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
                        ${hoveredService === service.id ? 'bg-secondary' : 'bg-neutral-300'}
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
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-neutral-50 to-transparent opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-neutral-50 to-transparent opacity-50 pointer-events-none" />
    </section>
  );
};

export default ServicesSection; 