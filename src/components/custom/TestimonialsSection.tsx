'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { testimonials as scrapedTestimonials } from '@/data/hubPluralContent';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

// Avatares genéricos para os depoimentos
const genericAvatars = [
  'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
];

// Função para extrair empresa/posição do nome do autor
const getPositionAndCompany = (author: string) => {
  if (author.toLowerCase().includes('gf.capital')) {
    return { position: 'Equipe', company: 'GF.Capital' };
  }
  if (author.toLowerCase().includes('gestor')) {
    return { position: 'Gestor', company: 'Hub Plural' };
  }
  if (author.toLowerCase().includes('empreendedor')) {
    return { position: 'Empreendedor', company: 'Startup Local' };
  }
  if (author.toLowerCase().includes('ceo')) {
    return { position: 'CEO', company: 'Tech Startup' };
  }
  return { position: 'Cliente', company: 'Hub Plural' };
};

const testimonials: Testimonial[] = scrapedTestimonials.map((testimonial, index) => {
  const { position, company } = getPositionAndCompany(testimonial.author);
  
  return {
    id: `testimonial-${index}`,
    name: testimonial.author,
    position: position,
    company: company,
    content: testimonial.text,
    rating: testimonial.rating,
    avatar: genericAvatars[index % genericAvatars.length]
  };
});

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!isClient) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-neutral-400">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 relative overflow-hidden">
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
            Depoimentos
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight leading-tight"
          >
            O QUE NOSSOS
            <br />
            <span className="text-neutral-600">CLIENTES DIZEM</span>
          </motion.h2>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl -translate-x-6 md:-translate-x-12"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-700" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl translate-x-6 md:translate-x-12"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-neutral-700" />
          </button>

          {/* Testimonial Card */}
          <div className="relative h-[500px] md:h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white p-8 md:p-12 lg:p-16 rounded-lg shadow-2xl max-w-4xl w-full relative">
                  
                  {/* Quote Icon */}
                  <div className="absolute -top-6 left-8 md:left-12 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg md:text-xl lg:text-2xl text-neutral-700 font-light leading-relaxed text-center mb-8 italic">
                    "{currentTestimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-neutral-200">
                      <Image
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-lg font-bold text-black uppercase tracking-wide">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-neutral-600 font-light">
                        {currentTestimonial.position}, {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center space-x-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`
                h-2 rounded-full transition-all duration-300 
                ${index === currentIndex 
                  ? 'w-8 bg-accent' 
                  : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                }
              `}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 md:mt-20"
        >
          {[
            { number: '500+', label: 'Empresas Atendidas' },
            { number: '95%', label: 'Satisfação dos Clientes' },
            { number: '24/7', label: 'Suporte Disponível' },
            { number: '5⭐', label: 'Avaliação Média' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/4 h-1/3 bg-gradient-to-br from-white to-transparent opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/4 bg-gradient-to-tl from-white to-transparent opacity-60 pointer-events-none" />
    </section>
  );
};

export default TestimonialsSection; 