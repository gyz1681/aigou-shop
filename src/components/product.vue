<template>
<div>
 <van-cell v-for="item in list.data.records" :key="item.id">
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
