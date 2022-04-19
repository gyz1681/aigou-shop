<template>
<div>
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，请稍后再试"
  @load="onLoad"
>
       <van-cell v-for="item in list" :key="item.id">
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
<List :item="item"/>
 </van-cell>
</van-list>
</div>
</template>

<script>
import { AllProAPI } from '@/api/user'
import List from './list.vue'
export default {
  name: 'AllProduct',
  components: {
    List
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false// 控制列表加载失败的提示状态
    }
  },
  created () {
    this.onLoad()
  },
  watch: {
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const result = await AllProAPI()
        this.list = result.data
        this.loading = false
        if (!result.length) {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }

  }
}

</script>

<style>

</style>
