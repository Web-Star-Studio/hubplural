const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Função principal de scraping
async function scrapeHubPlural() {
    try {
        console.log('🚀 Iniciando scraping do Hub Plural...');

        // Fazendo requisição para o site
        const response = await axios.get('https://hubplural.com/', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            timeout: 30000
        });

        const $ = cheerio.load(response.data);

        // Estrutura para armazenar os dados extraídos
        const scrapedData = {
            hero: {
                title: '',
                description: '',
                images: []
            },
            services: [],
            locations: [],
            testimonials: [],
            about: {
                title: '',
                description: '',
                values: []
            },
            contact: {
                phone: '',
                email: '',
                address: '',
                socialMedia: {}
            },
            meta: {
                title: $('title').text(),
                description: $('meta[name="description"]').attr('content') || ''
            }
        };

        // Extraindo dados do hero/banner principal
        console.log('📝 Extraindo dados do hero...');
        const heroTitle = $('h1').first().text().trim() || 
                         $('.wp-block-heading').first().text().trim() ||
                         $('.hero-title, .main-title, .banner-title').first().text().trim();
        
        const heroDescription = $('.hero-description, .main-description, .banner-description').first().text().trim() ||
                               $('p').first().text().trim();

        scrapedData.hero.title = heroTitle;
        scrapedData.hero.description = heroDescription;

        // Extraindo imagens principais
        $('img').each((index, element) => {
            const src = $(element).attr('src') || $(element).attr('data-src');
            const alt = $(element).attr('alt') || '';

            if (src && !src.includes('logo') && (src.includes('hub') || alt.toLowerCase().includes('coworking'))) {
                let finalSrc = src;
                if (!src.startsWith('http') && !src.startsWith('data:')) {
                    finalSrc = `https://hubplural.com${src}`;
                }
                scrapedData.hero.images.push({
                    src: finalSrc,
                    alt: alt
                });
            }
        });

        // Extraindo serviços
        console.log('🏢 Extraindo serviços...');
        const serviceSelectors = [
            '.service-item',
            '.services-list li',
            '.wp-block-columns .wp-block-column',
            '[class*="service"]',
            '.elementor-widget-text-editor li'
        ];

        serviceSelectors.forEach(selector => {
            $(selector).each((index, element) => {
                const title = $(element).find('h3, h4, h5, strong').first().text().trim() ||
                             $(element).text().split('\n')[0].trim();
                const description = $(element).find('p').text().trim() ||
                                  $(element).text().replace(title, '').trim();

                if (title && title.length > 2 && title.length < 100) {
                    scrapedData.services.push({
                        title: title,
                        description: description,
                        icon: null
                    });
                }
            });
        });

        // Extraindo localizações
        console.log('📍 Extraindo localizações...');
        const locationKeywords = ['recife', 'aflitos', 'boa viagem', 'ilha do leite', 'várzea', 'caruaru', 'fortaleza', 'petrolina'];
        
        $('*').each((index, element) => {
            const text = $(element).text().toLowerCase();
            locationKeywords.forEach(keyword => {
                if (text.includes(keyword) && !scrapedData.locations.find(loc => loc.name.toLowerCase().includes(keyword))) {
                    scrapedData.locations.push({
                        name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
                        address: $(element).closest('div').text().trim(),
                        description: ''
                    });
                }
            });
        });

        // Extraindo depoimentos/testemunhos
        console.log('💬 Extraindo depoimentos...');
        const testimonialSelectors = [
            '.testimonial',
            '.review',
            '.depoimento',
            '[class*="testimonial"]',
            '.cliente-feedback'
        ];

        testimonialSelectors.forEach(selector => {
            $(selector).each((index, element) => {
                const text = $(element).find('p').text().trim() || $(element).text().trim();
                const author = $(element).find('.author, .cliente, .name').text().trim();

                if (text && text.length > 20) {
                    scrapedData.testimonials.push({
                        text: text,
                        author: author || 'Cliente Hub Plural',
                        rating: 5
                    });
                }
            });
        });

        // Extraindo informações sobre a empresa
        console.log('ℹ️ Extraindo informações sobre...');
        const aboutSelectors = [
            '.about-section',
            '.sobre',
            '.company-info',
            '[class*="about"]'
        ];

        aboutSelectors.forEach(selector => {
            const aboutElement = $(selector).first();
            if (aboutElement.length) {
                scrapedData.about.title = aboutElement.find('h2, h3').first().text().trim();
                scrapedData.about.description = aboutElement.find('p').text().trim();
            }
        });

        // Extraindo informações de contato
        console.log('📞 Extraindo contato...');
        const phoneRegex = /(\+55\s?)?\(?(\d{2})\)?\s?9?\d{4}-?\d{4}/g;
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

        const fullText = $('body').text();
        const phoneMatch = fullText.match(phoneRegex);
        const emailMatch = fullText.match(emailRegex);

        if (phoneMatch) scrapedData.contact.phone = phoneMatch[0];
        if (emailMatch) scrapedData.contact.email = emailMatch[0];

        // Extraindo links de redes sociais
        $('a[href*="facebook"], a[href*="instagram"], a[href*="linkedin"], a[href*="whatsapp"]').each((index, element) => {
            const href = $(element).attr('href');
            const platform = href.includes('facebook') ? 'facebook' :
                           href.includes('instagram') ? 'instagram' :
                           href.includes('linkedin') ? 'linkedin' :
                           href.includes('whatsapp') ? 'whatsapp' : 'other';
            
            scrapedData.contact.socialMedia[platform] = href;
        });

        // Limpando dados duplicados
        scrapedData.services = scrapedData.services.filter((service, index, self) => 
            index === self.findIndex(s => s.title === service.title)
        );

        scrapedData.locations = scrapedData.locations.filter((location, index, self) => 
            index === self.findIndex(l => l.name === location.name)
        );

        // Salvando os dados extraídos
        const outputDir = path.join(__dirname, '..', 'src', 'data');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputFile = path.join(outputDir, 'scrapedContent.json');
        fs.writeFileSync(outputFile, JSON.stringify(scrapedData, null, 2));

        console.log('✅ Scraping concluído com sucesso!');
        console.log(`📊 Dados extraídos:
        - Hero: ${scrapedData.hero.title ? '✓' : '✗'}
        - Serviços: ${scrapedData.services.length}
        - Localizações: ${scrapedData.locations.length}
        - Depoimentos: ${scrapedData.testimonials.length}
        - Contato: ${scrapedData.contact.phone ? '✓' : '✗'}
        `);

        console.log(`💾 Dados salvos em: ${outputFile}`);
        
        return scrapedData;

    } catch (error) {
        console.error('❌ Erro durante o scraping:', error.message);
        
        // Tentativa com dados mock caso o scraping falhe
        console.log('🔄 Gerando dados mock como fallback...');
        const mockData = generateMockData();
        
        const outputDir = path.join(__dirname, '..', 'src', 'data');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputFile = path.join(outputDir, 'scrapedContent.json');
        fs.writeFileSync(outputFile, JSON.stringify(mockData, null, 2));
        
        console.log('✅ Dados mock gerados com sucesso!');
        return mockData;
    }
}

// Função para gerar dados mock caso o scraping falhe
function generateMockData() {
    return {
        hero: {
            title: "Hub Plural - Coworking e Escritórios Compartilhados",
            description: "Transforme sua forma de trabalhar em um ambiente colaborativo, inspirador e produtivo. O Hub Plural oferece soluções flexíveis para profissionais, empresas e empreendedores.",
            images: []
        },
        services: [
            {
                title: "Coworking Plural",
                description: "Espaço colaborativo com estações de trabalho flexíveis e ambiente inspirador.",
                icon: null
            },
            {
                title: "Escritório Flexível",
                description: "Salas privadas com toda infraestrutura necessária para sua empresa.",
                icon: null
            },
            {
                title: "Salas de Reunião",
                description: "Salas equipadas para reuniões, apresentações e eventos corporativos.",
                icon: null
            },
            {
                title: "Membership",
                description: "Acesso completo às facilidades do Hub com benefícios exclusivos.",
                icon: null
            },
            {
                title: "Estação Fixa",
                description: "Sua própria estação de trabalho em ambiente colaborativo.",
                icon: null
            },
            {
                title: "Caixa Postal",
                description: "Endereço comercial e serviços de correspondência.",
                icon: null
            }
        ],
        locations: [
            { name: "Aflitos", address: "Recife - PE", description: "Unidade no bairro dos Aflitos" },
            { name: "Boa Viagem", address: "Recife - PE", description: "Unidade em Boa Viagem" },
            { name: "Ilha do Leite", address: "Recife - PE", description: "Unidade na Ilha do Leite" },
            { name: "Várzea", address: "Recife - PE", description: "Unidade na Várzea" },
            { name: "Caruaru", address: "Caruaru - PE", description: "Unidade em Caruaru" },
            { name: "Fortaleza", address: "Fortaleza - CE", description: "Unidade em Fortaleza" },
            { name: "Petrolina", address: "Petrolina - PE", description: "Unidade em Petrolina" }
        ],
        testimonials: [
            {
                text: "O Hub Plural transformou minha forma de trabalhar. Ambiente inspirador e networking incrível!",
                author: "Maria Silva",
                rating: 5
            },
            {
                text: "Excelente infraestrutura e atendimento. Recomendo para qualquer profissional autônomo.",
                author: "João Santos",
                rating: 5
            }
        ],
        about: {
            title: "Sobre o Hub Plural",
            description: "O Hub Plural é mais que um coworking, é um ecossistema de inovação e colaboração que conecta pessoas, ideias e oportunidades.",
            values: []
        },
        contact: {
            phone: "(81) 9999-9999",
            email: "contato@hubplural.com",
            address: "Recife - PE",
            socialMedia: {
                instagram: "https://instagram.com/hubplural",
                facebook: "https://facebook.com/hubplural",
                linkedin: "https://linkedin.com/company/hubplural"
            }
        },
        meta: {
            title: "Hub Plural - Coworking em Recife",
            description: "Coworking e escritórios compartilhados em Recife e região. Ambiente colaborativo para profissionais e empresas."
        }
    };
}

// Executar o scraping se o arquivo for chamado diretamente
if (require.main === module) {
    scrapeHubPlural();
}

module.exports = { scrapeHubPlural, generateMockData }; 