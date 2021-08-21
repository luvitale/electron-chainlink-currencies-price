<template>
  <div>
    <div class="title">Currency Price</div>
    <v-container class="price">
      <div class="source-currency-price">
        <v-text-field
          v-model="sourceCurrencyPrice.amount"
          type="number"
          min="0"
          step="0.000000001"
          label="Source amount"
          hide-details="auto"
          @change="handleChange"
        />
        <v-overflow-btn
          v-model="sourceCurrencyPrice.currency"
          class="my-2"
          :items="currencies.filter(
            cur => cur != destinationCurrencyPrice.currency
          )"
          label="Source currency"
          dense
          @change="handleChange"
        />
      </div>

      <div class="destination-currency-price">
        <v-overflow-btn
          v-model="destinationCurrencyPrice.currency"
          :items="currencies.filter(
            cur => cur != sourceCurrencyPrice.currency
          )"
          label="Destination currency"
          dense
          @change="handleChange"
        />
        <v-text-field
          v-model="destinationCurrencyPrice.amount"
          type="number"
          min="0"
          step="0.000000001"
          label="Destination amount"
          hide-details="auto"
          disabled
        />
      </div>

      <v-btn
        class="ma-2 text-none"
        color="success"
        @click="getCurrencyPrice"
      >
        Convert
        <template #loader>
          <span>Loading...</span>
        </template>
      </v-btn>

      <v-btn
        class="ma-2 text-none"
        color="warning"
        @click="swapCurrencies"
      >
        Swap
        <template #loader>
          <span>Loading...</span>
        </template>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import currencies from '../../main/backend/currencies'

export default {
  data () {
    return {
      currencies,
      sourceCurrencyPrice: { currency: 'BTC', amount: 1 },
      destinationCurrencyPrice: { currency: 'ETH', amount: null }
    }
  },

  methods: {
    getCurrencyPrice () {
      if (!window.ipcRenderer) return

      window.ipcRenderer.send(
        'get-currency-price',
        {
          sourceAmount: this.sourceCurrencyPrice.amount,
          sourceCurrency: this.sourceCurrencyPrice.currency,
          destinationCurrency: this.destinationCurrencyPrice.currency
        }
      )

      window.ipcRenderer.receive(
        'get-currency-price',
        destinationAmount => {
          this.destinationCurrencyPrice.amount = destinationAmount
        }
      )
    },

    swapCurrencies () {
      const auxCurrencyPrice = { ...this.sourceCurrencyPrice }

      if (this.destinationCurrencyPrice.amount != null) {
        this.sourceCurrencyPrice.amount = this.destinationCurrencyPrice.amount
        this.destinationCurrencyPrice.amount = auxCurrencyPrice.amount
      }

      this.sourceCurrencyPrice.currency = this.destinationCurrencyPrice.currency
      this.destinationCurrencyPrice.currency = auxCurrencyPrice.currency
    },

    handleChange () {
      this.destinationCurrencyPrice.amount = null
    }
  }
}
</script>

<style scoped>
.title {
  color: #364758;
  font-size: 1.5em;
  letter-spacing: 0.25px;
  margin-top: 10px;
}
.price {
  margin-top: 8px;
}
</style>
