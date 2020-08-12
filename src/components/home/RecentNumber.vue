<template>
  <div class="recent-box fix-stack" :class="[borderTop?'border-only':'border-all']">
    <div class="timeTips" v-if="title">
      <p>
        <span>{{title}}</span>
        <em v-if="updateTime"> 更新于<span>{{updateTime}}</span>前</em>
      </p>
      <slot name="tips"/>
    </div>
    <div class="recentNumber">
      <div
        class="icbar"
        :class="[theme[(index)%6]]"
        v-for="(value, index) in headerData"
        :key="index"
      >
        <div class="add">
          {{value.name}}
        </div>
        <div class="number intnum">{{value.total}}</div>
        <div class="text">
          <template v-if="value.today || value.today === 0">
            今日<span class="number">{{value.today>=0?'+':''}}{{value.today}}</span>
          </template>
          <template v-if="value.change || value.change === 0">
            较昨日<span class="number">{{value.change>=0?'+':''}}{{value.change}}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerData: {
      type: Array,
      default: () => []
    },
    title: String,
    updateTime: [Number, String],
    borderTop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      theme: ["confirm", "heal", "dead", "nowConfirm", "nowSevere", "import"],
    }
  }
}
</script>

<style lang="scss">
.timeTips {
  padding: 10px 15px;
  line-height: 14px;
  font-size: 12px;
  background-color: #fff;
  color: #737373;
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

.recent-box {
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  // border: 1px solid #efefef;
  &.border-all {
    border-radius: 6px;
  }
  &.border-only {
    border-radius: 0 0 6px 6px;
    border-top: none;
  }
}
.fix-stack {
  // margin-top: -33px;
}
.recentNumber {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  // margin: 0 20px;
  overflow: hidden;
  .icbar {
    flex: 1;
    width: 33.3%;
    min-width: 33.3%;
    // width: 111px;
    // margin: 0 2px 2px 0;
    padding: 6px 0 12px;
    position: relative;
    text-align: center;
    // &:first-child {
    //   border-radius: 6px 0 0 0;
    // }
    // &:nth-child(3) {
    //   border-radius: 0 6px 0 0;
    // }
    &.confirm {
      background-color: #fdf1f1;
      .number {
        color: #cc1e1e;
      }
    }
    &.heal {
      background-color: #f1f8f4;
      .number {
        color: #178b50;
      }
    }
    &.dead {
      background-color: #f3f6f8;
      .number {
        color: #4e5a65;
      }
    }
    &.nowConfirm {
      background-color: #fdf1f1;
      .number {
        color: #f23a3b;
      }
    }
    &.nowSevere {
      background-color: #faf2f6;
      .number {
        color: #ca3f81;
      }
    }
    &.import {
      background-color: #fcf4f0;
      .number {
        color: #f05926;
      }
    }
  }
  .add {
    padding-top: 6px;
    color: #222;
    font-size: 12px;
    line-height: 12px;
    height: 12px;
    font-weight: 500;
  }
  .intnum {
    font-size: 18px;
    line-height: 22px;
    height: 22px;
    font-weight: 600;
    padding-top: 6px;
  }
  .text {
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    color: #222;
    font-weight: 500;
    margin-top: 6px;
  }
}
</style>