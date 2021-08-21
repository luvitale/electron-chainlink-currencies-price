# electron-chainlink-currencies-price

> Electron app with currencies price via Chainlink

## Configuration

In `src/main/backend`, add `secrets.json` file with Infura Project ID:

```json
{
  "infuraProjectID": "<Infura Project ID>"
}
```

## Build Setup

``` bash
# install dependencies
yarn

# serve app with hot reload
yarn dev

# build electron application for production
yarn build

# yarn tests
yarn test


# lint all JS/Vue component files in `src/`
yarn lint

```

---

This project was generated with [electron-nuxt](https://github.com/Unesmanet/electron-nuxt) v1.7.2 based in [michalzaq12 template](https://github.com/michalzaq12/electron-nuxt) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://github.com/michalzaq12/electron-nuxt/blob/master/README.md).
