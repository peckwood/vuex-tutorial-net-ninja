import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  //set to true to allow only changes of state throught mutations
  //disallow changing directly in component
  strict: true,
  state: {
    products: [
      {name: 'Banana', price:20},
      {name: 'Star', price:40},
      {name: 'Green', price:60},
      {name: 'Red', price:80},
    ]
  },
  getters: {
    saleProduct: state => {
      return state.products.map(product => {
        return {
          name: '**' + product.name + '**',
          price: product.price / 2
        }
      })
    }
  },
  // mutations: {
  //   reducePrice: (state, payload) => {
  //     state.products.forEach((product) =>
  //       product.price -= 1
  //     );
  //   }
  // },
  mutations: {
    reducePrice: state => {
      state.products.forEach( product => {
        product.price -= 1
      });
    }
  },
  actions: {
    reducePriceAfter2s: (context, payload) => {
      setTimeout(function(){
        context.commit('reducePrice', payload);
      }, 3000)
    }
  }
})
