<template>
  <div>
      <van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服" dot />
  <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/car')" :badge="checkedCount"/>
 <van-goods-action-icon icon="shop-o" text="店铺" @click="$router.push('/')" />
  <van-goods-action-button type="danger" @click="open" text="立即兑换" />
</van-goods-action>
<van-sku
  v-model="show"
    :sku="sku"
    :goods="goods"
  :goods-id="goodsId"
  @buy-clicked="onBuyClicked"
  @add-cart="onAddCartClicked"
/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Footer',
  props: {
    lists: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      show: false,
      sku: {
        tree: [
          {
            k: '', // skuKeyName：规格类目名称
            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: '1', // skuValueId：规格值 id
                name: '', // skuValueName：规格值名称
                imgUrl: '', // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: '' // 用于预览显示的规格类目图片
              }
            ],
            largeImageMode: true //  是否展示大图模式
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: '1', // skuId
            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
            price: '', // 价格（单位分）
            stock_num: 0 // 当前 sku 组合对应的库存
          }
        ],
        price: '', // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        initialSku: {
          s1: '1'
        }
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: ''
      },
      goodsId: '',
      immediate: 1
    }
  },
  computed: {
    ...mapGetters('shopcar', ['checkedCount'])
  },
  methods: {
    dd () {
      this.$store.commit('shopCar/addCar', this.list)
    },
    getImg () {
      const { coverImg, coin, stock, id, title } = this.lists
      // console.log(coverImg)
      this.goods.picture = `https://sc.wolfcode.cn/${coverImg[0]}`
      this.sku.price = coin
      this.sku.stock_num = stock
      this.goodsId = id
      const { list, tree } = this.sku
      // console.log(list)
      list[0].id = id
      list[0].price = coin * 100
      list[0].stock_num = stock
      tree[0].k = title
      tree[0].v[0].name = title
      tree[0].v[0].imgUrl = `https://sc.wolfcode.cn/${coverImg[0]}`
      tree[0].v[0].previewImgUrl = `https://sc.wolfcode.cn/${coverImg[1]}`
    },
    onAddCartClicked (e) {
      // console.log(e.goodsId)
      this.$store.dispatch('shopcar/addCars', { productId: e.goodsId, total: e.selectedNum })
      this.show = false
    },
    onBuyClicked (e) {
      console.log(e)
    },
    open () {
      this.getImg()
      this.show = true
    }
  }
}
</script>

<style>

</style>
