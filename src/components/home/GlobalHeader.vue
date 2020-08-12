<template>
  <div class="home">
    <div id="header-wrapper">
      <div id="header" class="auto-exp-rgn" :class="[isTop ? 'transparent':'']">
        <a href="" class="back icon" >
          <icon-svg class="sidebar-icon" icon-class="back" />
        </a>
        <i class="space"></i>
        <div class="title-wrap flex-between" :class="[showBack?'have-back':'']">
          <h2 class="title">{{title}}</h2>
        </div>
      </div>
    </div>
    <div id="index-con">
      <div id="m-first-screen-con">
        <div id="m-header-atmos"></div>
        <div id="m-search-con" :class="[isTop? 'm-search--shrink':'', showBack?'have-back': '']">
          <div class="m-search__rect">
            <i></i>
          </div>
          <div class="m-search__link search__link-align-start">
            <div class="m-search__text-runway">
              <p class="scroll-text-item">{{subTitle}}</p>
            </div>
          </div>
        </div>
        <!-- <div class="page-tab">
          <p v-for="(value) in selectTabs" :key="value.key" :class="[selectTab === value.key ? 'current':'']" @click="tabClick(value.key)">{{value.name}}</p>
        </div> -->

        <!-- <div class="home-con">
        </div> -->
        <slot></slot>
      </div>
    </div>
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
</style>
