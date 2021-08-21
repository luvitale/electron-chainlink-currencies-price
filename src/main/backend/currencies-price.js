/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unreachable */
const { ipcMain } = require('electron')

const getAddress = (sourceCurrency, destinationCurrency) => {
  const addresses = require('./addresses')

  let isCorrectRate = true

  let resultAddressObject = addresses.find(addressObj => {
    return (
      addressObj.sourceCurrency === sourceCurrency &&
      addressObj.destinationCurrency === destinationCurrency
    )
  })

  // Swapping currencies
  if (!resultAddressObject) {
    resultAddressObject = addresses.find(addressObj => {
      return (
        addressObj.sourceCurrency === destinationCurrency &&
        addressObj.destinationCurrency === sourceCurrency
      )
    })

    isCorrectRate = false
  }

  return {
    addr: resultAddressObject ? resultAddressObject.address : undefined,
    isCorrectRate
  }
}

const getCurrencyPrice = async (sourceCurrency, destinationCurrency) => {
  const Web3 = require('web3')
  const { infuraProjectID } = require('./secrets.json')
  const web3 = new Web3(`https://mainnet.infura.io/v3/${infuraProjectID}`)
  const aggregatorV3InterfaceABI = [{
    inputs: [],
    name: 'decimals',
    outputs: [{
      internalType: 'uint8', name: '', type: 'uint8'
    }],
    stateMutability: 'view',
    type: 'function'
  }, {
    inputs: [],
    name: 'description',
    outputs: [{
      internalType: 'string', name: '', type: 'string'
    }],
    stateMutability: 'view',
    type: 'function'
  }, {
    inputs: [{
      internalType: 'uint80',
      name: '_roundId',
      type: 'uint80'
    }],
    name: 'getRoundData',
    outputs: [{
      internalType: 'uint80', name: 'roundId', type: 'uint80'
    }, {
      internalType: 'int256', name: 'answer', type: 'int256'
    }, {
      internalType: 'uint256', name: 'startedAt', type: 'uint256'
    }, {
      internalType: 'uint256', name: 'updatedAt', type: 'uint256'
    }, {
      internalType: 'uint80', name: 'answeredInRound', type: 'uint80'
    }],
    stateMutability: 'view',
    type: 'function'
  }, {
    inputs: [],
    name: 'latestRoundData',
    outputs: [{
      internalType: 'uint80', name: 'roundId', type: 'uint80'
    }, {
      internalType: 'int256', name: 'answer', type: 'int256'
    }, {
      internalType: 'uint256', name: 'startedAt', type: 'uint256'
    }, {
      internalType: 'uint256', name: 'updatedAt', type: 'uint256'
    }, {
      internalType: 'uint80', name: 'answeredInRound', type: 'uint80'
    }],
    stateMutability: 'view',
    type: 'function'
  }, {
    inputs: [],
    name: 'version',
    outputs: [{
      internalType: 'uint256', name: '', type: 'uint256'
    }],
    stateMutability: 'view',
    type: 'function'
  }]

  const { addr, isCorrectRate } = getAddress(sourceCurrency, destinationCurrency)

  if (!addr) return 1

  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr)

  const decimals = await priceFeed.methods.decimals().call()

  const roundData = await priceFeed.methods.latestRoundData().call()

  const priceData = roundData.answer

  const priceRate = priceData / 10 ** decimals

  if (!isCorrectRate) {
    return 1 / priceRate
  }

  return priceRate
}

const getDestinationAmount = async (sourceAmount, sourceCurrency, destinationCurrency) => {
  const price = await getCurrencyPrice(
    sourceCurrency, destinationCurrency
  )

  return sourceAmount * price
}

ipcMain.on(
  'get-currency-price',
  async (event, { sourceAmount, sourceCurrency, destinationCurrency }) => {
    try {
      const destinationAmount = await getDestinationAmount(
        sourceAmount, sourceCurrency, destinationCurrency
      )

      event.reply('get-currency-price', destinationAmount)
    } catch (error) {
      console.log(error.toString())
    }
  }
)
