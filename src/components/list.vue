<template>
  <div>
<van-card
  :price="`${item.coin}积分`"
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
 <template #tags>
    <van-tag plain type="warning" size="large">
        {{item.isHotSale? 'hot':'new'}}
    </van-tag>
  </template>
  <template #footer>
     <van-tag plain type="warning" size="large">立即兑换</van-tag>
  </template>
</van-card>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    item: {
      type: [Array, Object],
      required: true
    }
  }
}
</script>

<style>

</style>
