# 💬 WhatsApp Hub

> **Gerencie contatos e automatize comunicações pelo WhatsApp de forma centralizada.**

---

## 🧠 **Descrição do Projeto**

O **WhatsApp Hub** é uma aplicação web para **gerenciamento de contatos** e **integração com o WhatsApp**, permitindo o envio em um único painel.

Seu objetivo é **facilitar a comunicação, organização e automação** de interações via WhatsApp — ideal para empresas ou usuários que precisam lidar com múltiplos contatos de forma prática e inteligente.

---

## 🌐 **Link da Aplicação**

🔗 [**Clique aqui para acessar o projeto**](https://projeto-contatos-jet.vercel.app)

---

## ⚙️ **Tecnologias Utilizadas**

- 🟩 **Node.js**
- 🚀 **Express.js**
- 🗄️ **Supabase**
- 💻 **JavaScript**
- 🎨 **HTML / CSS**
- 🤖 **Gemini API (Google)**

---

## ✨ **Funcionalidades**

✅ Cadastro, edição e remoção de contatos  
✅ Listagem e busca de contatos cadastrados  
✅ Integração com o **WhatsApp Web API** para envio de mensagens  
✅ Armazenamento de dados via **Supabase**  
✅ Interface web responsiva e amigável  
✅ Integração com **Gemini API** para automação e respostas inteligentes  

---

## **Funcionalidades Extras**

Nossa aplicação combina uma agenda de contatos com um gerador de links de WhatsApp e uma camada de inteligência artificial que permite ao usuário criar e traduzir mensagens automaticamente. A IA é a inovação central: ela transforma o app de uma ferramenta utilitária para um assistente de comunicação, capaz de gerar textos prontos, adaptar tom, sintetizar ideias e traduzir para múltiplos idiomas com qualidade e rapidez.

🧑‍💻 Geração de mensagens: o usuário descreve o objetivo/estilo e a IA produz uma mensagem pronta para ser enviada.

👅 Tradução de mensagens: o usuário fornece um texto (por exemplo: em português) e a IA gera uma tradução natural para inglês, espanhol, francês, alemão, japonês, etc.

## 🧩 **Como Executar o Projeto Localmente**

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/vitorbertolla/Projeto_Contatos
cd Projeto_Contatos
2️⃣ Instale as dependências
bash
Copiar código
npm install
3️⃣ Configure o Supabase
No painel do Supabase, crie uma tabela chamada contatos com as colunas:

id → inteiro (primary key, auto increment)

name → texto

number → texto

4️⃣ Configure as variáveis de ambiente
Duplique o arquivo .env.example, renomeie para .env e preencha com seus dados:

env
Copiar código
VITE_API_KEY="sua chave da Gemini API"
VITE_SUPABASE_KEY="sua chave pública do Supabase"
VITE_SUPABASE_URL="sua URL do projeto Supabase"
5️⃣ Execute o projeto
bash
Copiar código
npm run dev
Depois, acesse no navegador:
👉 http://localhost:5173


👨‍💻 Autor
Vitor Bertolla
João Buhler
João Bozz
📍 Desenvolvedores Front-end | Estudantes da UTFPR Campo Mourão
🔗 GitHub