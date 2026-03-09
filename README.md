
# desafio-f360
Gerenciador de Transações Financeiras

## Arquitetura Avançada

O projeto segue uma arquitetura modular, separando responsabilidades em pastas específicas:

- **components/**: Componentes Vue reutilizáveis, organizados por domínio.
- **layouts/**: Layouts globais para páginas.
- **views/**: Páginas principais da aplicação.
- **stores/**: Gerenciamento de estado (Pinia).
- **services/**: Serviços para lógica de negócio e integração (ex: API, mocks).
- **composables/**: Hooks reutilizáveis (Vue 3 Composition API).
- **schemas/**: Schemas de validação (ex: Zod).
- **types/**: Tipos TypeScript globais.
- **utils/**: Funções utilitárias e helpers.
- **constants/**: Constantes globais do projeto.
- **mocks/**: Dados mockados para desenvolvimento.

## Aliases de Imports

Para facilitar a manutenção e evitar imports relativos complexos, utilize os aliases definidos em `tsconfig.app.json` e `vite.config.ts`:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@views/` → `src/views/`
- `@stores/` → `src/stores/`
- `@services/` → `src/services/`
- `@composables/` → `src/composables/`
- `@schemas/` → `src/schemas/`
- `@types/` → `src/types/`
- `@utils/` → `src/utils/`
- `@constants/` → `src/constants/`
- `@layouts/` → `src/layouts/`
- `@mocks/` → `src/mocks/`

## Boas Práticas

- Componentes e arquivos em `kebab-case` para Vue, `camelCase` para arquivos TypeScript.
- Separação clara de responsabilidades.
- Uso de barrel files (`index.ts`) para facilitar imports.
- Serviços desacoplados da UI.
- Utilização de schemas para validação de dados.
- Utilização de composables para lógica reutilizável.

## Estilização com Tailwind CSS

O projeto já está configurado para usar Tailwind CSS via Vite. Para começar:

1. Instale as dependências:

   ```bash
   npm install
   # ou yarn
   ```

2. As diretivas do Tailwind (`@tailwind base`, `@tailwind components` e `@tailwind utilities`) estão em `src/style.css`.

3. Importe o CSS global em `src/main.ts` (já feito):

   ```ts
   import './style.css'
   ```

4. Modifique `tailwind.config.js` para ajustar os caminhos ou estender o tema.

5. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

6. Utilize classes utilitárias do Tailwind nos componentes.

```