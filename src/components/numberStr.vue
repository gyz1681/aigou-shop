<template>
 <div class="number-str">
<button @click="increase(-1)" :disabled="currentValue<=1" class="right">-</button>
  <input type="number" :value="currentValue" @change="changeValue" class="input">
<button @click="increase(1)" :disabled="currentValue>=5" class="left">+</button>
 </div>
</template>

<script>
export default {
  model: {
    prop: 'values',
    event: 'change'
  },
  props: {
    values: {
      type: Number,
      default: 0,
      require: true
    }
  },
  data () {
    return {
      currentValue: this.values
    }
  },
  watch: {
    value (newVal) {
      this.currentValue = newVal
    }
  },
  methods: {
    changeValue (e) {
    //   console.log(e)
      if (e.target.value > 5) {
        e.target.value = 5
      } else if (e.target.value < 1) {
        e.target.value = 1
      }
      this.currentValue = parseInt(e.target.value)
      this.$emit('change', this.currentValue)
    },
    increase (value) {
      this.currentValue += value
      this.$emit('change', this.currentValue)
    }
  }
}
</script>

<style lang="less" scoped>
.number-str{
    position: relative;
    left: 300px;
    right: 30px;
    bottom: 90px;
    .input{
        width: 100px;
        height: 53px;
       text-align: center;
      font-size: 20px;
      border: 0;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  /deep/ .right,.left{
         width: 60px;
         height: 60px;
         font-weight: 700;
         border: 1px solid #ccc;
         vertical-align: bottom;
  }
}
</style>
