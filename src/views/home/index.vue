<template>
  <div class="container">
    <!-- 头部 -->
     <Header/>
     <!-- 商品列表 -->
   <ShangPin/>
  </div>
</template>
<script>
import Header from '@/components/header'
import ShangPin from '@/components/shangpin'
export default {
  name: 'Home',
  components: {
    Header, ShangPin
  },
  created () {

  },
  data () {
    return {
      code: ''
    }
  },
  methods: {
  }

}
</script>

<style lang="less" scoped>

</style>
