<template>
  <div class="container">
   <van-nav-bar
  :title="`购物车${checkedCounts}`"
  left-text="返回"
  :right-text="deletes"
  left-arrow
  @click-left="$router.back()"
  @click-right="onClickRight=deleCar=!deleCar"
  class="list"
/>
<div style="height:400px;width:100%;font-size:20px;" v-show="totalCount===0">
 购物车空空如也，赶紧去狂购吧！！！
</div>
 <van-cell v-for="item in shopCar" :key="item.id">
   <van-card
   :tag="item.isHotSale? 'hot':'new'"
  :price="`${item.coin}积分`"
  :desc="item.versionDescription"
  :title="item.name"
  :thumb="`https://sc.wolfcode.cn/${item.coverImg}`"
  class="product"
>
<template #tags>
    <van-tag plain type="warning" size="large">
        {{item.isHotSale? 'hot':'new'}}
    </van-tag>
  </template>
  <template #footer>
    <NumberStr :values="item.total" @change="updateProduct({
      productId:item.id,
      total:$event
    })"/>
  <van-checkbox  v-model="item.isChecked"></van-checkbox>
    <van-tag type="primary" size="medium" v-show="deleCar" @click="deletePro(item.id)">
      删除
    </van-tag>
  </template>
</van-card>
 </van-cell>
<van-submit-bar :price="checkedPrice*100" button-text="提交订单" suffix-label="积分" :decimal-length="0" @submit="onSubmit">
  <van-checkbox v-model="checkedAll">合计</van-checkbox>
</van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import NumberStr from '@/components/numberStr'
export default {
  name: 'ShopCar',
  data () {
    return {
      deleCar: false
    }
  },
  components: {
    NumberStr
  },
  computed: {
    ...mapGetters('shopcar', ['checkedPrice', 'totalPrice', 'totalCount', 'checkedCount']),
    ...mapState('shopcar', ['shopCar']),
    deletes () {
      return this.deleCar ? '完成' : '管理商品'
    },
    checkedAll: {
      get () {
        return this.shopCar.every(prod => prod.isChecked)
      },
      set (value) {
        this.updateAllProductCheck(value)
      }
    },
    checkedCounts () {
      return this.checkedCount === 0 ? '' : this.checkedCount
    }
  },
  methods: {
    ...mapActions('shopcar', ['deleteCars', 'updateProduct']),
    ...mapMutations('shopcar', ['updateAllProductCheck', 'updateProdctChecked']),
    onSubmit () {
      this.$router.push('/order')
    },
    deletePro (id) {
      // console.log(id)
      this.deleteCars(id)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  padding: 90px 0;
.van-cell .van-field{
  background-color: #FAFAFA;

  }
  .number-str{
    position: absolute;
  }
}
/deep/ .list{
    position: fixed ;
    top: 0;
    right: 0;
    left: 0;
  }

</style>
