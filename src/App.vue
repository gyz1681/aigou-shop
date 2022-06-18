<template>
  <div id="app">
    <!-- 路由的出口 -->
    <keep-alive include="ShangPin">
    <router-view/>
    </keep-alive>
    <!-- 路由的出口 -->

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
