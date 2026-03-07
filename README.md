# desafio-f360
Gerenciador de Transações Financeiras

## Estilização com Tailwind CSS

Este projeto já foi configurado para usar Tailwind CSS via Vite. Para começar a estilizar:

1. Garanta que as dependências estejam instaladas:

   ```bash
   npm install
   # ou yarn
   ```

2. As diretivas do Tailwind (`@tailwind base`, `@tailwind components` e `@tailwind utilities`) estão no arquivo `src/style.css`.

3. Importe o CSS global em `src/main.ts` (já feito):

   ```ts
   import './style.css'
   ```

4. Modifique `tailwind.config.js` para ajustar os caminhos ou estender o tema.

5. Execute o servidor de desenvolvimento com `npm run dev` e use classes utilitárias nos componentes.

```