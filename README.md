# desafio-f360

Aplicação de gestão financeira desenvolvida como desafio técnico, focada em performance, organização de código e experiência de uso.

O projeto permite:
- visualizar transações financeiras;
- filtrar por descrição, categoria e tipo;
- adicionar e remover transações;
- acompanhar indicadores consolidados;
- analisar dados em gráficos na página de estatísticas.

## Últimas atualizações

- Nova rota de **Estatísticas** (`/statistics`) com visão analítica.
- Inclusão de gráficos com **Chart.js** + **vue-chartjs**:
   - Receitas vs Despesas;
   - Despesas por Categoria;
   - Fluxo Monetário (acumulado diário).
- Composable de analytics (`useTransactionAnalytics`) para cálculos derivados.
- Navegação lateral com acesso rápido para Dashboard e Estatísticas.
- Cobertura de testes expandida para analytics e regras de negócio da store.

## Stack

- Vue 3
- Vite
- TypeScript
- Pinia
- Tailwind CSS
- Vee Validate + Zod
- Vue Router
- Vue Virtual Scroller
- Vitest

## Requisitos

- Node.js 18+ (recomendado)
- npm 9+

## Instalação

```bash
git clone <url-do-repositorio>
cd desafio-f360
npm install
```

## Execução

### Desenvolvimento

```bash
npm run dev
```

### Build de produção

```bash
npm run build
```

### Preview da build

```bash
npm run preview
```

## Scripts disponíveis

- `npm run dev` — inicia ambiente de desenvolvimento.
- `npm run build` — valida tipos e gera build de produção.
- `npm run preview` — sobe preview local da build.
- `npm run test` — executa testes com Vitest.
- `npm run coverage` — executa testes com relatório de cobertura.

## Funcionalidades

### Dashboard

- Cards de resumo financeiro (receitas, despesas e saldo).
- Listagem de transações com virtualização para grande volume de dados.
- Filtros com debounce por texto/categoria/tipo.
- Modal para criação e remoção de transações.

### Estatísticas

- Resumo financeiro reutilizado do dashboard.
- Visualização de tendências por mês.
- Distribuição de despesas por categoria.
- Fluxo de caixa acumulado por dia.

## Estrutura de pastas (resumo)

```text
src/
   components/                # Componentes reutilizáveis (UI, header, sidebar)
   composables/               # Hooks reutilizáveis e seus testes
   layouts/                   # Layouts globais
   mocks/                     # Geração de dados simulados
   router/                    # Definição de rotas
   schemas/                   # Schemas de validação (Zod)
   stores/                    # Estado global (Pinia)
      transactions/
         analytics/             # Cálculos analíticos e testes
   types/                     # Tipos globais
   views/
      Dashboard/               # Tela principal de transações
      Statistics/              # Tela de estatísticas e gráficos
```

## Decisões técnicas

- **Arquitetura modular** para facilitar manutenção e evolução.
- **Virtualização de lista** para suportar alto volume (mock de até 30.000 transações).
- **Store centralizada (Pinia)** com getters de indicadores financeiros.
- **Composable de analytics** para separar visualização e regras de cálculo.
- **Validação com Zod + Vee Validate** para formulários mais robustos.
- **Testes unitários com Vitest** em composables e stores.

## Testes implementados

- `useFormField`
- `useMaskedInput`
- `useTransactionFilter`
- `transactionStore`
- `useTransactionAnalytics`

Para rodar:

```bash
npm run test
```

Cobertura:

```bash
npm run coverage
```




