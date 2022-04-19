<template>
<div>
 <van-cell v-for="item in list.data.records" :key="item.id">
     <!-- <van-card
  num="2"
  :price="item.coin"
  :desc="item.seriesSubTitle"
  :title="item.seriesTitle"
  :thumb="`https://sc.wolfcode.cn/${item.coverImg}`"
   @click="$router.push({
    name:'products',
    params:{
      id:item.id
    }
  })"
>
</van-card> -->
<List :item ="item"/>
 </van-cell>
</div>
</template>

<script>
import List from './list.vue'
export default {
  name: 'Product',
  components: {
    List
  },
  props: {
    list: {
      type: [Array, Object],
      required: true
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style>

</style>
