# Regras e Contexto para Agente de IA: Desenvolvimento do Site Hub Plural

## 1. Visão Geral do Projeto

**Nome do Projeto:** Protótipo Interativo Hub Plural
**Empresa:** Hub Plural (Espaços de Coworking)
**Localizações Atendidas:** Recife, Caruaru, Fortaleza, Petrolina.
**Objetivo Principal:** Desenvolver um protótipo de site inovador e altamente interativo para o Hub Plural, diferenciando-o da concorrência e do site atual. A primeira versão (MVP) focará em uma experiência rica com imagens estáticas e pontos interativos.
**Linguagem de Design:** Moderna, limpa, profissional, acolhedora e com uma sutil "cara de Recife" (contemporânea, evitando clichês). Foco na comunidade e flexibilidade.
**Público-Alvo:** Profissionais, freelancers, startups e empresas buscando espaços de trabalho flexíveis e inspiradores.

## 2. Funcionalidade Principal (MVP): Exploração Interativa de Espaços

* **Abordagem:** Utilizar imagens estáticas de alta qualidade dos diferentes ambientes e unidades do Hub Plural.
* **Interatividade:**
    * **Hotspots:** Sobrepor pontos interativos (ícones discretos, talvez com leve animação como pulsar) em locais específicos das imagens.
        * **Ao passar o mouse (Hover):** Exibir um tooltip com título ou breve descrição do ponto (ex: "Sala de Reunião Maracatu", "Nossa Cafeteria Aconchegante").
        * **Ao clicar:** Abrir um modal ou sidebar com informações detalhadas:
            * Mais fotos do local específico (mini-galeria).
            * Descrição completa.
            * Lista de comodidades (Wi-Fi, café, capacidade, etc.).
            * Possíveis CTAs (Call to Action), como "Agendar Visita" ou "Ver Planos para este Espaço".
* **Navegação:**
    * Permitir que o usuário selecione a unidade (Recife, Caruaru, etc.) e, dentro dela, diferentes ambientes (coworking, sala privativa, auditório) para explorar através das imagens interativas.
    * Pode ser via um menu, mapa interativo simplificado ou galeria de thumbnails.

## 3. Design, Estética e Identidade "Recife"

* **Fotografia:** Crucial. As fotos devem ser profissionais, bem iluminadas, mostrando os espaços de forma atraente e, sutilmente, incorporando elementos da cultura/identidade de Recife (ex: um quadro de artista local, um detalhe arquitetônico, cores).
* **Paleta de Cores:** Moderna e profissional. Pode se inspirar em Recife (azuis do mar, verdes da natureza, tons terrosos da arquitetura histórica, toques vibrantes da cultura popular), mas aplicados de forma equilibrada e contemporânea.
* **Tipografia:** Moderna, legível e elegante.
* **Ícones e Elementos Gráficos:** Discretos, modernos. Hotspots e ícones podem ter um design sutilmente temático.
* **Copywriting:** Profissional, mas acolhedor. Focado na experiência e nos benefícios. Pode incluir referências culturais sutis e expressões locais com moderação, se alinhado à marca.

## 4. Estrutura do Site e Seções Relevantes (Principais)

1.  **Página Inicial:** Destaque para a exploração interativa da principal unidade (provavelmente Recife) ou uma visão geral das opções.
2.  **Nossos Espaços:** Detalhamento dos tipos de espaços oferecidos (estações de coworking, salas privativas, salas de reunião, auditórios, espaços de eventos). Cada tipo de espaço pode levar a uma exploração interativa.
3.  **Planos e Preços:** Apresentação clara dos planos e o que cada um inclui.
4.  **Unidades:**
    * Página ou seção para cada cidade (Recife, Caruaru, Fortaleza, Petrolina).
    * Cada página de unidade deve apresentar seus diferenciais e permitir a exploração interativa dos seus ambientes.
5.  **Eventos e Comunidade:** Divulgação de eventos, fomento ao networking.
6.  **Blog:** Conteúdo relevante sobre trabalho, produtividade, comunidade.
7.  **Sobre Nós:** História, missão e valores do Hub Plural.
8.  **Contato:** Formulário, telefones, e-mails, mapas e links para redes sociais.

## 5. Stack Tecnológico

* **Frontend:** React
* **Framework/Meta-framework:** Next.js 15 (utilizando o App Router)
* **Estilização:** Tailwind CSS
    * Customizar `tailwind.config.js` para paleta de cores, fontes, etc.
    * Utilizar para transições e animações sutis.
* **Otimização de Imagens:** Componente `next/image` do Next.js.
* **Gerenciamento de Estado:**
    * Para interações simples (visibilidade de tooltips/modais): `useState` e `useContext` do React.
    * Considerar Zustand ou Jotai apenas se a complexidade do estado global crescer significativamente (manter simples para o MVP).
* **Versionamento:** Git / GitHub (ou similar).
* **Observação:** Não haverá modelagem ou renderização 3D (Three.js, etc.) nesta fase do protótipo.

## 6. Instruções para o Agente de IA (Cursor)

* **Geração de Código:**
    * Auxiliar na criação de componentes React funcionais e reutilizáveis (ex: `InteractiveImageContainer`, `Hotspot`, `InfoModal`, `ImageGallery`).
    * Gerar snippets para lógica de posicionamento de hotspots (baseado em coordenadas relativas/percentuais na imagem).
    * Ajudar a implementar a lógica de exibição/ocultação de tooltips e modais.
* **Estilização com Tailwind CSS:**
    * Sugerir classes do Tailwind para alcançar o design visual desejado (layouts, componentes, responsividade).
    * Ajudar a configurar transições e animações suaves.
* **Next.js 15:**
    * Orientar sobre a estrutura do App Router (páginas, layouts, componentes Server e Client).
    * Garantir o uso correto do `next/image` para otimização.
* **Boas Práticas:**
    * Sugerir refatorações para melhorar a legibilidade, manutenibilidade e performance do código.
    * Auxiliar na criação de uma estrutura de pastas organizada para o projeto.
    * Lembrar de princípios de acessibilidade (ARIA attributes, navegação por teclado para hotspots).
* **Foco no MVP:** Manter o desenvolvimento alinhado com os requisitos do protótipo, evitando complexidade desnecessária nesta fase.

Este documento deve fornecer um bom ponto de partida e contexto para o seu agente de IA. Ajuste-o conforme necessário à medida que o projeto evolui!