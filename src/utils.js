export const formatDecimalNumber = number => number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const currencyFormat = (myNumber, currency = 'MXN') => `$${formatDecimalNumber(Number(myNumber).toFixed(2))} ${currency}`;