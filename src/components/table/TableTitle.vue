<template>
  <div class="list-wrapper">
    <div class="up-tips tips-data">
      <span class="title">{{title}}</span>
    </div>
    <span v-if="subTitle" class="tips">{{subTitle}}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    subTitle: {
      type: String
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.list-wrapper {
  margin-top: 18px;
  .tips {
    color: #737373;
    font-size: 12px;
    line-height: 12px;
    height: 12px;
    font-weight: 400;
    font-style: normal;
    margin: 6px 0 0 20px;
    display: inline-block;
  }
  .up-tips {
    margin: 0 20px;
  }
}
.up-tips .title {
  display: inline-block;
  position: relative;
  font-size: 16px;
}
</style>