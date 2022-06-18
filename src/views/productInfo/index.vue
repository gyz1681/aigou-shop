<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" class="imge" lazy-render="true" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group inset>
      <van-cell :title="seriesTitle" :label="seriesSubTitle" />
    </van-cell-group>
    <van-cell-group inset>
      <van-cell :title="`${list.coin}积分`" class="jifen" />
    </van-cell-group>
    <van-cell-group inset>
      <van-cell :title="title"> </van-cell>
      <van-cell>
        <van-tag plain type="primary" size="large" :class="{ current: item.currentActivate }" @click="tages(item.id)"
          v-for="item in products" :key="item.id">{{ item.title }}</van-tag>
      </van-cell>
    </van-cell-group>
    <Footer :lists="list" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import { productInfo } from '@/api/user'
export default {
  components: { Footer },
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    age: {
      type: String,
      required: true
    }
  },
  name: 'productInfo',
  data () {
    return {
      images: [],
      list: {},
      products: {},
      title: '',
      active: '',
      seriesTitle: '',
      seriesSubTitle: ''
    }
  },
  created () {
    this.productInfo()
  },
  methods: {
    async productInfo () {
      try {
        const { data } = await productInfo(this.$route.params.id)
        const { seriesTitle, seriesSubTitle, parameterJson } = data.productInfo
        this.seriesTitle = seriesTitle
        this.seriesSubTitle = seriesSubTitle
        const { parameters, title } = parameterJson[0]
        this.title = title
        this.products = parameters
        // console.log(this.products)
        const arr1 = this.getActive(parameters)
        this.list = arr1[0]
        // console.log(this.list)
        this.getImg(this.list.coverImg)
      } catch (error) {
        this.$toast('获取数据失败' + error)
      }
    },
    tages (id) {
      var arr = this.products.filter(item => item.id === id)
      this.list = arr[0]
      this.products.forEach(item => {
        item.currentActivate = false
        if (item.id === id) {
          item.currentActivate = true
        }
      })
    },
    getActive (arr) {
      return arr.filter(item => item.currentActivate === true)
    },
    getImg (arr) {
      arr.forEach(item => {
        this.images.push(`https://sc.wolfcode.cn/${item}`)
      })
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;

  .imge {
    width: 100%;
  }
}

.jifen {
  font-size: 50px;
  font-weight: 700;
  color: #fd604d;
}

.van-tag--primary.van-tag--plain {
  color: #999;
  margin: 10px;
}

.current {
  color: #fd604d !important;
}
</style>
