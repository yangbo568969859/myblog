<template>
  <div class="timeNum">
    <p>
      <span>{{time}}</span>
      <em v-if="update"> 更新于<span>{{update}}</span>前</em>
    </p>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      required: true
    },
    update: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.timeNum {
  padding: 15px 15px;
  line-height: 14px;
  font-size: 12px;
  background-color: #fff;
  color: #737373;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  p {
    text-align: left;
  }
  span {
    font-weight: 500;
    color: #737373;
  }
  em {
    font-style: normal;
  }
}
</style>