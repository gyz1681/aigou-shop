<template>
  <div>
订单信息提交页面
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'submitOrder',
  created () {
    request('/my/test', 'get').then(res => {
      console.log(res)
    })
  }
}
</script>

<style>

</style>
