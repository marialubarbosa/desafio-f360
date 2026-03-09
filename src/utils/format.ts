// Funções utilitárias de formatação

export function formatCurrency(value: number, locale = 'pt-BR', currency = 'BRL') {
  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
  })
}

export function formatDate(date: string | Date, locale = 'pt-BR') {
  return new Date(date).toLocaleDateString(locale)
}
