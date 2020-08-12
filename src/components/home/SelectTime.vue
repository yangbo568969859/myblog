<template>
  <div class="select-time" @click="showTime">
    <i class="select-time-picker-icon">
      <icon-svg icon-class="time"></icon-svg>
    </i>
    <span class="select-time-picker-input">{{start}}</span>
    <span class="select-time-separator">至</span>
    <span class="select-time-picker-input">{{end}}</span>
    <van-calendar v-model="show" :round="false" type="range" position="right" get-container="#app" @confirm="onConfirm" />
    <!-- <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" get-container="#app">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
      />
    </van-popup> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      show: false,
      start: this.formatDate(new Date()),
      end: this.formatDate(new Date())
    }
  },
  methods: {
    showTime() {
      this.show = true;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.start = this.formatDate(start)
      this.end = this.formatDate(end)
      this.$emit('timeChange', date)
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
  }
}
</script>

<style lang="scss">
.select-time {
  padding: 4px 11px;
  border-radius: 4px;
  border: 1px solid #efefef;
  font-size: 12px;
  color: #737373;
  position: relative;
  height: 32px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-right: 26px;
  &-separator {
    display: inline-block;
    min-width: 10px;
    color: rgba(0,0,0,.45);
    white-space: nowrap;
    text-align: center;
    vertical-align: top;
    pointer-events: none;
    padding: 0 3px;
  }
  &-picker-input {
    // width: 44%;
    // height: 99%;
    // text-align: center;
    // background-color: transparent;
    // border: 0;
    // outline: 0;
  }
  &-picker-icon {
    position: absolute;
    top: 50%;
    right: 6px;
    z-index: 1;
    width: 14px;
    height: 14px;
    margin-top: -7px;
    font-size: 12px;
    line-height: 14px;
    transition: all .3s;
    user-select: none;
  }
}
</style>