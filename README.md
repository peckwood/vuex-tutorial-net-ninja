# vuex-playlist

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).



# vuex notes

### add vuex 3 dependency

#### vuex3 is compatible with vue2

```
npm install vuex@3 --save
```

#### add `src/store/store.js`

```
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

#### main.js

add

```
...
import {store} from './store/store'

new Vue({
  store: store,
	...
})
```

### access products in components

```
  computed: {
    products(){
      return this.$store.state.products;
    }
  }
```

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

when you update store with async calls inside mutations, you will get error:

```
Error: [vuex] do not mutate vuex store state outside mutation handlers.
```

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

### quick way to reference getters and actions

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
