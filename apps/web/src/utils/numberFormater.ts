type AvailableCurrencies = 'BRL' | 'USD'

export const currencyFormater = (value: number, currency: AvailableCurrencies = 'BRL') => {
  const formater = new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency,
  })

  const formattedValue = formater.format(value).replace(/-/g, '')

  return formattedValue
}

export type Formatter<T = string> = {
  format: (value: T) => string
  parse: (value: string) => T
}

export const defaultFormatter: Formatter = {
  format: (value) => value,
  parse: (value) => value,
}

export const currencyFormatter: (config?: { locale?: string; currency?: string }) => Formatter<number> = ({
  locale = 'pt-BR',
  currency = 'BRL',
} = {}) => {
  const numberFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  })

  return {
    format: (value: number) => {
      return numberFormatter.format(value)
    },
    parse: (value: string) => {
      const rawValue = parseInt(value.replace(/\D/g, ''), 10) || 0

      return rawValue / 100
    },
  }
}
