'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Bus, Train, Clock } from 'lucide-react';

const transportOptions = [
  {
    icon: <Car className="w-5 h-5" />,
    type: 'Carro',
    description: 'Estacionamento gratuito no local',
    time: '15 min do centro'
  },
  {
    icon: <Bus className="w-5 h-5" />,
    type: 'Ônibus',
    description: 'Linhas 42, 51, 84 param em frente',
    time: '20 min do centro'
  },
  {
    icon: <Train className="w-5 h-5" />,
    type: 'Metrô',
    description: 'Estação Shopping, Linha Sul',
    time: '10 min caminhando'
  },
  {
    icon: <Navigation className="w-5 h-5" />,
    type: 'Aplicativo',
    description: 'Uber, 99, InDriver disponíveis',
    time: 'R$ 8-15 do centro'
  }
];

const landmarks = [
  'Shopping Recife - 500m',
  'Aeroporto Internacional - 15km',
  'Marco Zero - 12km',
  'Universidade UFPE - 8km',
  'Hospital Português - 2km',
  'Praia de Boa Viagem - 1km'
];

export default function ContactMapSection() {
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
            Localização
            <div className="absolute -bottom-1 left-0 w-8 h-px bg-amber-400"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            Fácil de
            <br />
            <span className="text-neutral-600">Chegar</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Placeholder for actual map integration */}
            <div className="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg overflow-hidden relative group">
              
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <MapPin className="w-10 h-10 text-black" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-black uppercase tracking-wide mb-2">
                    Hub Plural
                  </h3>
                  
                  <p className="text-neutral-600 font-light">
                    Rua da Inovação, 123<br />
                    Boa Viagem, Recife - PE
                  </p>
                </div>
              </div>

              {/* Overlay with map link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/80 flex items-center justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-amber-400 text-black px-8 py-4 font-bold uppercase tracking-wide hover:bg-white transition-all duration-300 flex items-center space-x-3"
                  onClick={() => window.open('https://maps.google.com?q=Rua+da+Inovação+123+Boa+Viagem+Recife', '_blank')}
                >
                  <Navigation className="w-5 h-5" />
                  <span>Ver no Maps</span>
                </motion.button>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-neutral-900 text-white p-6 -mt-12 relative z-10 mx-4"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-wide mb-2">
                    Endereço Completo
                  </h4>
                  
                  <div className="space-y-1 text-white/80">
                    <p>Rua da Inovação, 123</p>
                    <p>Boa Viagem, Recife - PE</p>
                    <p>CEP: 51020-000</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-white/70">
                      Seg-Sex: 8h às 18h | Sáb: 9h às 14h
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Transport and Landmarks */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            
            {/* Transport Options */}
            <div>
              <h3 className="text-3xl font-bold text-black uppercase tracking-tight mb-8">
                Como Chegar
              </h3>
              
              <div className="space-y-6">
                {transportOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-4 p-6 bg-neutral-50 hover:bg-white hover:shadow-md transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center text-black group-hover:bg-black group-hover:text-amber-400 transition-all duration-300"
                    >
                      {option.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-black uppercase tracking-wide mb-1">
                        {option.type}
                      </h4>
                      
                      <p className="text-neutral-600 font-light mb-2">
                        {option.description}
                      </p>
                      
                      <p className="text-sm text-amber-600 font-medium">
                        {option.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Landmarks */}
            <div>
              <h3 className="text-3xl font-bold text-black uppercase tracking-tight mb-8">
                Pontos de Referência
              </h3>
              
              <div className="bg-neutral-50 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {landmarks.map((landmark, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * index }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span className="text-neutral-700 font-medium">{landmark}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-neutral-200"
                >
                  <p className="text-neutral-600 font-light text-center">
                    <strong className="text-black">Localização privilegiada</strong> no coração de Boa Viagem,
                    <br />próximo aos principais centros comerciais e de negócios da cidade.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-12 py-4 font-bold uppercase tracking-wide hover:bg-neutral-800 transition-all duration-300 inline-flex items-center space-x-3"
                onClick={() => window.open('https://maps.google.com?q=Rua+da+Inovação+123+Boa+Viagem+Recife', '_blank')}
              >
                <Navigation className="w-5 h-5" />
                <span>Traçar Rota</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 