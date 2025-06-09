'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Users, Building, Coffee, Wifi } from 'lucide-react';

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Telefone',
    details: [
      '(81) 3030-3030',
      '(81) 9 9999-9999'
    ],
    description: 'Atendimento comercial e suporte técnico'
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'E-mail',
    details: [
      'contato@hubplural.com',
      'comercial@hubplural.com'
    ],
    description: 'Resposta em até 24 horas'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Horário de Funcionamento',
    details: [
      'Segunda a Sexta: 8h às 18h',
      'Sábados: 9h às 14h'
    ],
    description: 'Acesso 24h para planos premium'
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Endereço Principal',
    details: [
      'Rua da Inovação, 123',
      'Boa Viagem, Recife - PE'
    ],
    description: 'CEP: 51020-000'
  }
];

const officeFeatures = [
  {
    icon: <Wifi className="w-5 h-5" />,
    title: 'Wi-Fi Ultra Rápido',
    description: 'Conexão de fibra óptica'
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    title: 'Coffee Break',
    description: 'Café premium incluído'
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: 'Salas de Reunião',
    description: 'Equipadas com tecnologia'
  },
  {
    icon: <Building className="w-5 h-5" />,
    title: 'Escritórios Privativos',
    description: 'Totalmente mobiliados'
  }
];

const locations = [
  {
    name: 'Hub Plural - Boa Viagem',
    address: 'Rua da Inovação, 123 - Boa Viagem',
    phone: '(81) 3030-3030',
    features: ['Coworking', 'Escritórios Privativos', 'Salas de Reunião'],
    hours: 'Seg-Sex: 8h-18h',
    isMain: true
  },
  {
    name: 'Hub Plural - Casa Forte',
    address: 'Av. Casa Forte, 456 - Casa Forte',
    phone: '(81) 3031-3031',
    features: ['Coworking', 'Eventos', 'Workshops'],
    hours: 'Seg-Sex: 8h-18h',
    isMain: false
  },
  {
    name: 'Hub Plural - Olinda',
    address: 'Rua do Amparo, 789 - Olinda',
    phone: '(81) 3032-3032',
    features: ['Coworking', 'Escritório Virtual'],
    hours: 'Seg-Sex: 8h-18h',
    isMain: false
  }
];

export default function ContactInfoSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50">
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
            Informações de Contato
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-black uppercase tracking-tight leading-tight mb-6"
          >
            Múltiplas Formas
            <br />
            <span className="text-neutral-600">De Nos Encontrar</span>
          </motion.h2>
        </motion.div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 bg-amber-400 rounded-lg flex items-center justify-center mb-6 text-black group-hover:bg-black group-hover:text-amber-400 transition-all duration-300"
              >
                {info.icon}
              </motion.div>
              
              <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-4">
                {info.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-neutral-700 font-medium">
                    {detail}
                  </p>
                ))}
              </div>
              
              <p className="text-sm text-neutral-500 font-light">
                {info.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Office Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 shadow-sm mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-4">
              O Que Oferecemos
            </h3>
            <p className="text-neutral-600 font-light text-lg">
              Infraestrutura completa para o seu sucesso profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officeFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300"
                >
                  {feature.icon}
                </motion.div>
                
                <h4 className="text-lg font-bold text-black uppercase tracking-wide mb-2">
                  {feature.title}
                </h4>
                
                <p className="text-neutral-600 font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Locations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-4">
              Nossas Unidades
            </h3>
            <p className="text-neutral-600 font-light text-lg">
              Escolha a localização mais conveniente para você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className={`bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${location.isMain ? 'ring-2 ring-amber-400' : ''}`}
              >
                {location.isMain && (
                  <div className="bg-amber-400 text-black text-xs font-bold uppercase tracking-wide px-3 py-1 inline-block mb-4">
                    Unidade Principal
                  </div>
                )}
                
                <h4 className="text-xl font-bold text-black uppercase tracking-wide mb-4">
                  {location.name}
                </h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                    <p className="text-neutral-700">{location.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <p className="text-neutral-700 font-medium">{location.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <p className="text-neutral-700">{location.hours}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-bold text-black uppercase tracking-wide">
                    Serviços Disponíveis:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {location.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-neutral-100 text-neutral-700 px-3 py-1 text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 