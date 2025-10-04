<div align="center">
  <h1> 🏋️‍♂️ Sempre em Forma App </h1>
</div>


<img align="center" alt="" src="./assets/images/icon.png">




Aplicativo mobile desenvolvido para o gerenciamento completo de uma **academia funcional**, criando uma solução eficiente e moderna para administração interna e acompanhamento dos alunos.

Este projeto foi construído como parte de uma disciplina de **Desenvolvimento Mobile**, com foco em usabilidade e integração com backend.

---

## 🎯 Finalidade do Projeto

O *Sempre em Forma App* tem como objetivo resolver desafios comuns em academias que ainda utilizam métodos manuais ou sistemas desconectados. Entre as funcionalidades propostas:

- 📋 Cadastro e gerenciamento de alunos  
- 📅 Organização de treinos, planos e aulas  
- 🏁 Acompanhamento da evolução dos alunos  
- 🔐 Autenticação e controle de acesso via JWT  
- 📱 Interface amigável tanto para administradores quanto para alunos

Resultado: **mais controle, eficiência e praticidade no dia a dia da academia.**

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| **Frontend (Mobile)** |<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="25" alt="react logo"  /> <img width="8" />React Native + Expo <img width="80" /> |
| **Backend (API REST)** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height="25" alt="flask logo"  /><img width="8" /> Flask (Python) |
| **Banco de Dados** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="25" alt="postgresql logo"  />  <img width="8" /> PostgreSQL |
| **Autenticação** | JWT (JSON Web Token) |

---

## ✅ Status do Projeto

✔️ Concluído em Novembro de 2024
📦 Entregue ao proprietário da academia para uso real

---

## 🖼️ Demonstração (Protótipo Visual)

Você pode visualizar a interface completa do projeto no Figma:

👉 **[Visualizar Protótipo](https://www.figma.com/design/x6K2FIAz2UgPG0wgE2JiET/PROJETO-SEMPRE-EM-FORMA?node-id=0-1&p=f&t=QYbj042QnJrPS1BQ-0)**

 
---

## 🚀 Como Executar o Projeto

> ⚠️ Certifique-se de que a **API (Flask + PostgreSQL)** esteja rodando e devidamente configurada no app. Sem isso, as telas podem exibir erro de carregamento.

```bash
# Instalar dependências do projeto
npm install

# Instalar dependências para suporte Web (Expo)
npx expo install react-native-web react-dom @expo/webpack-config

# Instalar Expo globalmente
npm install -g expo-cli

# Iniciar o aplicativo (modo web ou mobile)
npx expo start -w

