<template>
  <div id="app">
    <product-list-one :products="products"></product-list-one>
    <product-list-two :products="products"></product-list-two>
  </div>
</template>

<script>
import ProductListOne from "./components/ProductListOne.vue";
import productListTwo from "./components/ProductListTwo.vue";
export default {
  components:{
    'product-list-one': ProductListOne,
    'product-list-two': productListTwo
  },
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
