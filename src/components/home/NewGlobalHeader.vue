<template>
  <div class="wrap">
    <div id="head" class="head">
      <h3 class="middle">中台-实时数据</h3>
      <h1 class="title">{{title}}</h1>
      <p class="tips">{{subTitle}}</p>
    </div>
    <slot></slot>
    <title-num v-if="bottomTitle" :time="bottomTitle"></title-num>
    <div class="pdBottom"></div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";

export default {
  name: "GlobalHeader",
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    bottomTitle: {
      type: String,
      default: '数据来源：中台每日公开数据'
    }
  },
  data() {
    return {
      showBack: true,
      loading: true,
      isTop: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        "scroll",
        throttle(() => this.scrolled(), 50)
      );
    });
    // this.loading = false;
    const timer = setTimeout(() => {
      this.loading = false;
    }, 1500);
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer);
    })
  },
  methods: {
    scrolled() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 20) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss">
.wrap {
  width: 100vw;
  overflow: hidden;
}
.head {
  height: 150px;
  background-size: cover;
  position: relative;
  color: #fff;
  padding: 0 15px;
  overflow: hidden;
  z-index: -1;
  &::before {
    content: ".";
    font-size: 0;
    line-height: 0;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
    height: 48.533vw;
    background: url(https://img.aqsea.com/data/analysis/bg/title_bg.png) top;
    background-size: cover;
    background-color: #20201F;
  }
  h1 {
    font-size: 20px;
  }
  .middle {
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .tips {
    margin-top: 6px;
    font-size: 13px;
  }
}
</style>
