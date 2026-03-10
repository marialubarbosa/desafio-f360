

# desafio-f360

Este projeto é uma implementação de uma listagem de transações financeiras desenvolvida como parte de um desafio técnico. O objetivo principal foi construir uma interface performática capaz de lidar com um grande volume de dados, mantendo boa organização de código e boas práticas de desenvolvimento frontend.

A aplicação permite visualizar, filtrar e explorar uma lista de transações financeiras simuladas.


## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Instalação](#instalacao)
- [Rodando o Projeto](#rodando-o-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Decisões Técnicas](#decisoes-tecnicas)
- [Testes](#testes)
- [Screenshots](#screenshots)
- [Boas Práticas](#boas-praticas)
- [Estilização com Tailwind CSS](#estilizacao-com-tailwind-css)


## Sobre o Projeto

Aplicação para gerenciamento de transações financeiras, construída com Vue 3, Vite, TypeScript, Pinia e Tailwind CSS. O objetivo é demonstrar arquitetura escalável, boas práticas e código limpo.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <url-do-repositorio>
cd desafio-f360
npm install
# ou yarn
```

## Rodando o Projeto

Para rodar em modo desenvolvimento:

```bash
npm run dev
# ou yarn dev
```

Para build de produção:

```bash
npm run build
# ou yarn build
```

## Estrutura de Pastas

```
src/
   components/      # Componentes Vue reutilizáveis
   layouts/         # Layouts globais
   views/           # Páginas principais
   stores/          # Estado global (Pinia)
   services/        # Serviços de API/lógica
   composables/     # Hooks reutilizáveis
   schemas/         # Schemas de validação (Zod)
   types/           # Tipos TypeScript globais
   utils/           # Funções utilitárias
   constants/       # Constantes globais
   mocks/           # Dados mockados
   assets/          # Imagens e assets estáticos
```

## Decisões Técnicas

- **Vue 3 + Vite + TypeScript**: Para performance, tipagem e DX moderna.
- **Pinia**: Gerenciamento de estado simples e escalável.
- **Tailwind CSS**: Rapidez e padronização visual.
- **Zod**: Validação de schemas de formulário.
- **Aliases de Imports**: Facilita manutenção e evita imports relativos longos.
- **Arquitetura Modular**: Separação clara de responsabilidades.
- **Barrel Files**: Facilita imports e refatoração.
- **Mocks**: Permite desenvolvimento sem backend.
- **Animações com Transition e TransitionGroup**: Implementadas para transições suaves na entrada/saída de componentes, como no dashboard, lista de transações e modais, utilizando CSS transitions para melhor UX.
- **Testes com Vitest**: Cobertura de testes unitários para composables e stores, assegurando qualidade e manutenção do código.

## Testes

O projeto utiliza **Vitest** para testes unitários, com foco em composables, stores e lógica de negócio. Os testes garantem a qualidade e confiabilidade do código.

Para executar os testes:

```bash
npm run test
```

Para executar com cobertura:

```bash
npm run coverage
```

Testes implementados:
- **Composables**: `useFormField`, `useMaskedInput`, `useTransactionFilter`
- **Store**: `transactionStore` (Pinia)

## Screenshots
![Dashboard](image.png)
![Modal de Transação](image-1.png)




