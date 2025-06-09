'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Serviços',
      links: [
        'Coworking',
        'Escritórios Privados',
        'Salas de Reunião',
        'Endereço Fiscal'
      ]
    },
    {
      title: 'Empresa',
      links: [
        'Sobre Nós',
        'Blog',
        'Carreiras',
        'Contato'
      ]
    },
    {
      title: 'Suporte',
      links: [
        'Central de Ajuda',
        'FAQ',
        'Privacidade',
        'Termos'
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const contactInfo = [
    { icon: MapPin, text: 'Av. Dom Luís, 500 - Aldeota, Fortaleza' },
    { icon: Phone, text: '+55 (85) 3456-7890' },
    { icon: Mail, text: 'contato@hubplural.com.br' }
  ];

  return (
    <footer className="bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4">
                  <Image
                    src="/hub-plural-logo-preta.png"
                    alt="Hub Plural Logo"
                    width={200}
                    height={52}
                    className="h-24 w-auto"
                  />
                </div>
                <p className="text-neutral-600 leading-relaxed max-w-sm">
                  Conectando pessoas, ideias e negócios no futuro do trabalho.
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-3"
              >
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <contact.icon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span className="text-sm text-neutral-600">{contact.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {footerSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + (sectionIndex * 0.1) }}
                    className="space-y-4"
                  >
                    <h4 className="font-semibold text-black text-sm uppercase tracking-wider">
                      {section.title}
                    </h4>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link}>
                          <a
                            href="#"
                            className="text-neutral-600 hover:text-accent transition-colors duration-200 text-sm"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-4"
              >
                <h4 className="font-semibold text-black text-sm uppercase tracking-wider">
                  Social
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-9 h-9 border border-neutral-200 rounded-lg flex items-center justify-center hover:border-accent hover:bg-accent hover:text-white transition-all duration-200 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-neutral-100 py-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-500">
              © 2025 Hub Plural. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-neutral-500 hover:text-accent transition-colors duration-200">
                Política de Privacidade
              </a>
              <a href="#" className="text-neutral-500 hover:text-accent transition-colors duration-200">
                Termos de Uso
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 