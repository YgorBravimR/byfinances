type AvailableCurrencies = 'BRL' | 'USD'

export const currencyFormater = (value: number, currency: AvailableCurrencies = 'BRL') => {
  const formater = new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency,
  })

  const formattedValue = formater.format(value).replace(/-/g, '')

  return formattedValue
}
