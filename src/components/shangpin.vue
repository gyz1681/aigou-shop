<template>
<div class="container">
    <van-tabs v-model="active" swipeable animated class="pruducts">
           <van-tab title="所有商品">
    <AllProduct/>
  </van-tab>
  <van-tab :title="item.text" v-for="(item, index) in items" :key="index" >
   <Product :list="item"/>
</van-tab>
</van-tabs>
</div>
</template>

<script>
import Product from './product.vue'
import AllProduct from './allProduct.vue'
import { RemenAPI, HotAPI } from '@/api/user'
export default {
  name: 'ShangPin',
  components: {
    Product, AllProduct
  },
  created () {
    this.getProduct()
  },
  data () {
    return {
      items: [],
      active: 0
    }
  },
  computed: {

  },
  methods: {
    async getProduct () {
      try {
        const commen = RemenAPI()
        const hot = HotAPI()
        const result = await Promise.all([commen, hot])
        // console.log(result)
        result.forEach(item => {
          const text = item.data.name
          delete item.data.name
          item.data.text = text
          this.items.push(item.data)
        })
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.container{
    padding-top:280px;
    padding-bottom:120px;
    .pruducts{
        height: 89vh;
    overflow-y: auto;
    /deep/ .van-tabs__wrap{
            position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    top: 195px;
    }
    }
}
</style>
