<template>
  <div id="product-list-one">
    <h2>Product List One</h2>
    <ul>
      <li v-for="product in products" >
        <span class="name">{{product.name}}</span>
        <span class="price">${{product.price}}</span>
      </li>
    </ul>
    <ul>
      <li v-for="product in saleProduct" >
        <span class="name">{{product.name}}</span>
        <span class="price">${{product.price}}</span>
      </li>
    </ul>
    <button @click="reducePrice">Reduce Price</button>
    <button @click="reducePriceAfter2s(1)">Reduce Price Later</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  computed: {
    products(){
      return this.$store.state.products;
    },
    // saleProduct(){
    //   return this.$store.getters.saleProduct;
    // }
    // 可以简写为:

    /*
The Vue.js code you provided is using the spread syntax in JavaScript. This syntax allows you to spread the properties of an object or an array into another object or array. In the context of your code, it is used to spread the results of the mapGetters function into the computed property of a Vue component.
Here's how it works:
mapGetters is a utility function provided by Vuex, which is a state management library for Vue.js. It's used to create computed properties that are mapped to Vuex getters.
The mapGetters function takes an array of getter names as its argument. In your code, you're passing an array with a single getter name, 'saleProduct'.
The spread syntax ... is used to spread the results of mapGetters into the computed property of the component. This effectively creates a computed property named 'saleProduct' that is equivalent to calling this.$store.getters.saleProduct.
Using this syntax is a convenient way to map Vuex getters to computed properties in your Vue components, reducing the amount of boilerplate code you need to write.
*/
    ...mapGetters([
      'saleProduct'
    ])
  },
  methods: {
    reducePrice: function() {
      this.$store.commit('reducePrice');
    },
    ...mapActions([
      'reducePriceAfter2s'
    ])

  }
}
</script>

<style scoped>
#product-list-one{
  background: #FFF8B1;
  box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
}
#product-list-one ul{
  padding: 0;
}
#product-list-one li{
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  padding: 20px;
  background: rgba(255,255,255,0.7);
}
.price{
  font-weight: bold;
  color: #E8800C;
}
</style>
