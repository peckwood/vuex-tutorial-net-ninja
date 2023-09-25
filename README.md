### initiate project

```
vue init webpack-simple vuex-playlist

used default in the options

cd vuex-playlist

# install dependencies for this project
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Files

- Product List One and Product List Two are there to show store can be used in multiple components.
- Product List One shows
  - how to use getters to access store
  - how to call mutations to change store
  - how to call actions to change store(action allow async calls)
- Product List Two shows how to access store directly
- Product List Two shows how to access store using getters
- Product List 3shows how to change store using mutation

## Vuex Tutorial #3 - Setting up a Central Store

### add vuex 3 dependency

#### vuex3 is compatible with vue2

```
npm install vuex@3 --save
```

#### add `src/store/store.js`

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    products: [
      {name: 'Banana', price:20},
      {name: 'Star', price:40},
      {name: 'Green', price:60},
      {name: 'Red', price:80},
    ]
  }
})

```

## Vuex Tutorial #4 - Using Computed Properties

import into main.js to use this central store in our application

#### main.js

add the following code:

```
...
import {store} from './store/store'

new Vue({
  store: store,
	...
})
```

### access products in computed property

```
  computed: {
    products(){
      return this.$store.state.products;
    }
  }
```

## Vuex Tutorial #5 - Getters

### use getters

In store.js, add getter:

```
  getters: {
    saleProduct: state => {
      return state.products.map(product => {
        return {
          name: '**' + product.name + '**',
          price: product.price / 2
        }
      })
    }
  }
```

use getter in components:

```
    saleProducts(){
      return this.$store.getters.saleProduct;
    }
```

### use mutations

In store.js, add mutation:

```
  mutations: {
    reducePrice: state => {
      state.products.forEach(product =>
        product.price -= 1
      );
    }
  }
```

call mutation:

```
  methods: {
    reducePrice(){
      this.$store.commit('reducePrice');
    }
  }
```

You can set strict to true to disable direct editing, so store can only be changed using mutation

direct editing vs mutation

1. direct editing cannot be tracked, but mutation can.
2. when store's strict is true, you cannot use direct editing, you can only use mutation

### actions

#### mutation limitation:

when you mutate store state in a mutation that update with a delay, the mutation happen instantly but change occur later. Which is hard to track.

we shouldn't put async code inside mutations, we should use actions instead

In store.js, add action:

```
  actions: {
    reducePriceAfter3s: context => {
      setTimeout(function(){
        context.commit('reducePrice');
      }, 3000)
    }
  }
```

#### use action:

```
this.$store.dispatch('reducePriceAfter3s');
```

mutation tracking adds a record after 3 seconds

#### How to pass parameter to action:

store.js:

```
  actions: {
    reducePriceAfter2s: (context, payload) => {
      setTimeout(function(){
        context.commit('reducePrice', payload);
      }, 3000)
    }
  }
```



component:

```
 <button @click="reducePriceAfter2s(1)">Reduce Price Later</button>
```

```
  methods: {
    ...mapActions([
      'reducePriceAfter2s'
    ])
  }
```



### Vuex Tutorial #8 - Mapping Actions & Getters

need to install babel if spread syntax is not supported

```
npm install babel-preset-stage-2 --save-dev
rerun app
```

and in .babellrc, add stage-3

```
{
  "presets": [
    ["env", { "modules": false }],
    "stage-3"
  ]
}
```



```
<script>
import {mapGetters, mapActions} from "vuex";

export default {
  computed: {
    products(){
      return this.$store.state.products;
    },
    ...mapGetters([
      'saleProduct'
    ])
  },
  methods: {
    ...mapActions([
      'reducePriceAfter2s'
    ])
  }
}
</script>
```

> [Youtube Vuex Tutorial from The Net Ninja](https://www.youtube.com/playlist?list=PL4cUxeGkcC9i371QO_Rtkl26MwtiJ30P2)
