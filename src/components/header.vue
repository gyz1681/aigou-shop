<template>
  <div class="container">
      <van-cell icon="shop-o" class="head" :value="coins">
          <template #title v-if="isLogins">
               <span class="custom-title" v-show="isLogins">{{userInfo.nickName}}</span>
               <span class="custom-title" @click="loginOut" style="margin-left:10px;"  v-show="isLogins">退出登录</span>
          </template>
           <template #title v-else >
               <span class="custom-title"><RouterLink to="/login">登录</RouterLink></span>
          </template>
      </van-cell>
  <van-search
  v-model="keyword"
  shape="round"
  show-action
  background="#E30080"
  placeholder="请输入搜索关键词"
 @search="onSearch"
>
    <template #action>
       <div @click="onSearch" class="search">搜索</div>
    </template>
  </van-search>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      keyword: ''
    }
  },
  created () {
  },
  computed: {
    ...mapGetters(['userInfo']),
    isLogins () {
      return !!this.userInfo
    },
    coins () {
      return this.userInfo ? `可用积分${this.userInfo.coin}` : '可用积分--'
    }
  },
  methods: {
    ...mapMutations('shopcar', ['removeProduct']),
    onSearch () {
      this.$store.commit('car/getSearch', this.keyword)
    },
    async loginOut () {
      await this.$dialog.confirm({
        message: '确认退出登录吗？'
      }).then(() => {
        this.$store.dispatch('car/loginOut')
        this.removeProduct()
        this.$router.go()
      }).catch(() => {
        console.log('')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
    .head{
        background-color: #E30080 ;
        color: #fff;
        /deep/.van-cell__value{
            color: #fff;
        }
    }
   .search{
     color:#fff;
   }
}
</style>
