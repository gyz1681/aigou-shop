<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
   <van-icon
        slot="left"
        name="cross"
        class="close"
        @click="$router.back()"
      />
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.phone"
        name="phone"
        placeholder="请输入手机号"
        :rules="userFormRules.phone"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.verifyCode"
        name="verifyCode"
        placeholder="请输入验证码"
        :rules="userFormRules.verifyCode"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down :time="1000*60" v-if="isCountDownShow" format="ss s" @finish="isCountDownShow = false"/>
          <van-button class="send-sms-btn" round size="small" type="default" @click="onSendSms" v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
      <!-- <div style="text-align: center;">
        <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
        </a>
      </div> -->
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { PhoneLoginAPI, SendSMSAPI } from '@/api/user'
import { mapActions } from 'vuex'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  mounted () {
    // 组件渲染完毕，使用QC生成QQ登录按钮
    // this.loginQC()
  },
  data () {
    return {
      user: {
        phone: '18682463885', // 手机号
        verifyCode: '' // 验证码

      },
      userFormRules: {
        phone: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        verifyCode: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{4}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  methods: {

    ...mapActions('shopcar', ['getCarts']),
    async onSubmit () {
    // 1. 获取表单数据
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })

      // TODO: 2. 表单验证

      // 3. 提交表单请求登录
      await PhoneLoginAPI(this.user).then(res => {
      // console.log(res)
        if (res.code === 0) {
          this.$store.commit('car/setToken', res['x-auth-token'])
          this.$store.dispatch('car/getUser')
          this.getCarts()
          this.$toast('登录成功')
          this.$router.back()
        } else if (res.code !== 0) {
          this.$toast('验证码有误')
        } else {
          this.$toast('登录失败')
        }
      }).catch(err => {
        console.log('登录失败' + err)
      })

    // 4. 根据请求响应结果处理后续操作
    },
    async onSendSms () {
    // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('phone')
      } catch (err) {
        return console.log('验证失败', err)
      }

      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true

      // 3. 请求发送验证码
      await SendSMSAPI({
        phone: this.user.phone
      }).then(() => {
        this.$toast('发送成功')
      }).catch(err => {
        this.$toast('获取失败' + err)
      })
    }
  }
}

</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
.close{
  color:#fff;
}
}
</style>
