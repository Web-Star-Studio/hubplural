# Sistema de Scraping - Hub Plural

Este diretório contém o sistema de scraping desenvolvido para extrair conteúdo real do site oficial do Hub Plural (https://hubplural.com/) e integrá-lo automaticamente ao nosso site.

## 🚀 Como usar

### Execução do Scraping

```bash
# Via npm script
npm run scrape

# Ou diretamente
node scripts/scraper.js
```

### Atualização Automática de Conteúdo

O script extrai automaticamente:

- **Hero Section**: Título e descrição principais
- **Serviços**: Lista completa de serviços oferecidos
- **Localizações**: Todas as unidades do Hub Plural
- **Depoimentos**: Testemunhos reais de clientes
- **Informações de Contato**: Telefone, email e redes sociais
- **Metadata**: Título e descrição para SEO

## 📁 Estrutura de Arquivos

```
scripts/
├── scraper.js          # Script principal de scraping
└── README.md          # Esta documentação

src/data/
├── scrapedContent.json     # Dados brutos extraídos
└── hubPluralContent.ts     # Dados tipados para uso no React
```

## 🔧 Tecnologias Utilizadas

- **Axios**: Para requisições HTTP
- **Cheerio**: Para parsing e manipulação do DOM
- **Node.js**: Runtime de execução
- **TypeScript**: Tipagem dos dados extraídos

## 📊 Dados Extraídos

### Serviços
- Coworking Plural
- Escritório Flexível  
- Salas de Reunião
- Membership
- Estação Fixa
- Caixa Postal
- Eventos Corporativos

### Localizações
- **Recife**: Aflitos, Boa Viagem, Ilha do Leite, Várzea
- **Outras Regiões**: Caruaru, Fortaleza, Petrolina

### Informações de Contato
- **Telefone**: (81) 98135-2010
- **Redes Sociais**: Facebook, Instagram, LinkedIn, WhatsApp

## 🔄 Integração com o Site

Os dados extraídos são automaticamente integrados nos seguintes componentes:

1. **ServicesSection**: Usa os serviços reais do Hub Plural
2. **TestimonialsSection**: Exibe depoimentos autênticos dos clientes
3. **FullScreenNav**: Links atualizados das redes sociais
4. **WhatsAppFloat**: Número de telefone real
5. **Layout**: Metadata para SEO

## 🛡️ Fallback System

O sistema inclui um mecanismo de fallback que gera dados mock caso o scraping falhe, garantindo que o site continue funcionando mesmo com problemas de conectividade.

## 📝 Personalização

Para adicionar novos seletores ou modificar a extração de dados, edite as seguintes seções no `scraper.js`:

- `serviceSelectors`: Para extrair novos tipos de serviços
- `testimonialSelectors`: Para diferentes formatos de depoimentos  
- `locationKeywords`: Para novas localizações
- `aboutSelectors`: Para informações sobre a empresa

## 🔍 Monitoramento

O script fornece logs detalhados sobre:
- Progresso da extração
- Quantidade de dados coletados
- Erros e problemas encontrados
- Local de salvamento dos arquivos

## ⚡ Performance

- **Timeout**: 30 segundos para requisições
- **User Agent**: Simula um navegador real
- **Error Handling**: Tratamento robusto de erros
- **Data Cleaning**: Remove duplicatas e dados inválidos

## 🔐 Considerações Éticas

Este scraping é realizado:
- ✅ Para uso interno e educacional
- ✅ Respeitando robots.txt
- ✅ Com intervalos apropriados entre requisições
- ✅ Sem sobrecarga do servidor de origem

---

**Desenvolvido com base nas melhores práticas de web scraping usando Node.js e Cheerio.** 