<template>
  <div class="container">
   <van-nav-bar
  title="购物车"
  left-text="返回"
  :right-text="deletes"
  left-arrow
  @click-left="$router.back()"
  @click-right="onClickRight=deleCar=!deleCar"
/>
<div style="height:400px;width:100%;font-size:20px;" v-show="totalCount===0">
 购物车空空如也，赶紧去狂购吧！！！
</div>
 <van-cell v-for="item in shopCar" :key="item.id">
   <van-card
      :num="item.total"
   :tag="item.isHotSale? 'hot':'new'"
  :price="`${item.coin}积分`"
  :desc="item.versionDescription"
  :title="item.name"
  :thumb="`https://sc.wolfcode.cn/${item.coverImg}`"
>
<template #tags>
    <van-tag plain type="warning" size="large">
        {{item.isHotSale? 'hot':'new'}}
    </van-tag>
  </template>
  <template #footer>
   <van-field name="stepper" >
  <template #input>
    <van-stepper :value="item.total" @change="updateProduct({
      prodId:item.id,
      total:$event
    })" />
  </template>
</van-field>
  <van-checkbox  v-model="item.isChecked">复选框</van-checkbox>
    <van-tag type="primary" size="medium" v-show="deleCar" @click="deletePro(item.id)">
      删除
    </van-tag>
  </template>
</van-card>
 </van-cell>
<van-submit-bar :price="checkedPrice*100" button-text="提交订单" suffix-label="积分" :decimal-length="0" @submit="onSubmit">
  <van-checkbox v-model="checkedAll">全选</van-checkbox>
</van-submit-bar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'ShopCar',
  data () {
    return {
      deleCar: false
    }
  },
  components: {
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
    }
  },
  methods: {
    ...mapMutations('shopcar', ['deleteFromCart', 'updateAllProductCheck', 'updateProdctChecked', 'updateProduct']),
    onSubmit () {
    },
    addCar () {},
    deleteCar () {},
    deletePro (id) {
      console.log(id)
      this.deleteFromCart(id)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
.van-cell .van-field{
  background-color: #FAFAFA;
  }
}

</style>
