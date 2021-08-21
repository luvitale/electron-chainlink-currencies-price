const { ipcMain } = require('electron')

const getCurrencyPrice = (_sourceCurrency, _destinationCurrency) => {
  return 1
}

const getDestinationAmount = (sourceAmount, sourceCurrency, destinationCurrency) => {
  const price = getCurrencyPrice(
    sourceCurrency, destinationCurrency
  )
  return sourceAmount * price
}

ipcMain.on(
  'get-currency-price',
  (event, sourceAmount, sourceCurrency, destinationCurrency) => {
    const destinationAmount = getDestinationAmount(
      sourceAmount, sourceCurrency, destinationCurrency
    )
    event.reply('get-currency-price', destinationAmount)
  }
)
