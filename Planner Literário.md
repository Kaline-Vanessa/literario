# Planner Literário

Um aplicativo web interativo para organizar e gerenciar sua biblioteca pessoal, inspirado no design do Canva. Permite fazer upload de capas de livros e organizá-las por categorias e meses.

## Características

- **Interface Intuitiva**: Design moderno e responsivo inspirado no Canva
- **Upload de Imagens**: Funcionalidade completa para upload de capas de livros
- **Organização por Categorias**: Biblioteca, Estante, Desafios, TBR, Favoritos, Citações, Dias de Leitura e Wishlist
- **Navegação por Meses**: Organize suas leituras mensalmente
- **Sistema de Avaliação**: Avalie seus livros com estrelas
- **Responsivo**: Funciona perfeitamente em desktop e mobile

## Tecnologias Utilizadas

### Frontend
- React 18
- Tailwind CSS
- Shadcn/UI Components
- Lucide Icons
- Vite (bundler)

### Backend
- Flask (Python)
- Flask-CORS
- SQLAlchemy
- Werkzeug (para upload de arquivos)

## Estrutura do Projeto

```
planner-literario/
├── planner-literario/          # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── ...
│   └── dist/                   # Build de produção
└── planner-backend/            # Backend Flask
    ├── src/
    │   ├── routes/
    │   ├── models/
    │   ├── static/             # Frontend integrado
    │   └── main.py
    └── requirements.txt
```

## Como Executar

### Desenvolvimento

1. **Frontend (React)**:
   ```bash
   cd planner-literario
   pnpm install
   pnpm run dev --host
   ```

2. **Backend (Flask)**:
   ```bash
   cd planner-backend
   source venv/bin/activate
   python src/main.py
   ```

### Produção (Aplicativo Integrado)

1. **Build do Frontend**:
   ```bash
   cd planner-literario
   pnpm run build
   ```

2. **Copiar para Flask**:
   ```bash
   cp -r planner-literario/dist/* planner-backend/src/static/
   ```

3. **Executar Flask**:
   ```bash
   cd planner-backend
   source venv/bin/activate
   python src/main.py
   ```

4. **Acessar**: http://localhost:5000

## Funcionalidades

### Página Inicial
- Grid de categorias com ícones coloridos
- Navegação intuitiva entre seções
- Design responsivo

### Seções Disponíveis
- **Biblioteca**: Organize livros por mês
- **Estante**: Sua coleção atual
- **Desafios**: Metas de leitura
- **TBR**: To Be Read (lista de leitura)
- **Favoritos**: Seus livros preferidos
- **Citações**: Trechos marcantes
- **Dias de Leitura**: Calendário de leitura
- **Wishlist**: Lista de desejos

### Upload de Imagens
- Suporte para PNG, JPG, JPEG, GIF, WEBP
- Preview instantâneo
- Armazenamento seguro no servidor
- URLs únicas para cada imagem

### Sistema de Avaliação
- Avaliação por estrelas (1-5)
- Interface interativa
- Visual feedback

## API Endpoints

### Upload de Imagem
- **POST** `/api/upload`
- **Parâmetros**: 
  - `file`: Arquivo de imagem
  - `book_id`: ID único do livro
- **Resposta**: URL da imagem carregada

## Personalização

O aplicativo pode ser facilmente personalizado:

1. **Cores**: Edite as variáveis CSS em `App.css`
2. **Categorias**: Modifique o array `sections` em `App.jsx`
3. **Layout**: Ajuste os componentes React
4. **Backend**: Adicione novas rotas em `src/routes/`

## Segurança

- Validação de tipos de arquivo
- Nomes de arquivo únicos (UUID)
- Sanitização de nomes de arquivo
- CORS configurado adequadamente

## Deployment

O aplicativo está pronto para deployment em qualquer plataforma que suporte Flask:

- Heroku
- Railway
- DigitalOcean
- AWS
- Google Cloud

## Licença

Este projeto foi desenvolvido como uma solução personalizada baseada no design do Canva fornecido pelo usuário.

