<template>
  <div id="app" ref="app" :style="[transfrom]">
    <!-- <div class="filterGray navWarperWraper">
      <div class="navHidden"></div>
      <div class="navWarper">
        <div class="navTabs">
          <van-tabs v-model="activeName" @click="onClick" :ellipsis="false">
            <van-tab v-for="value in tabList" :key="value.id" :title="value.title" :name="value.router"></van-tab>
          </van-tabs>
        </div>
      </div>
    </div> -->
    <router-view />
  </div>
</template>

<script>
import { store, actions, mutations } from '@/store/index';
/* eslint-disable */
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      transfrom: {},
    };
  },
  created() {
    // console.log(this.$router, this.$route)
    this.initStoreList();
    this.$setgoindex();
  },
  mounted() {
    this.resize();
    // var that = this;
    // this.$nextTick(function() {
    //   document.body.addEventListener(
    //     "click",
    //     event => {
    //       const eventFix = that.getEvent(event);
    //       if (!eventFix) {
    //         return;
    //       }
    //       this._handleEvent(eventFix);
    //     },
    //     false
    //   );
    // })
  },
  methods: {
    resize() {
      let scale = 1;
      if (document.body.clientWidth >= 800) {
        scale = 750 / document.body.clientWidth;
        this.transfrom = {
          transform: "scale(" + scale + ")"
        };
      } else {
        this.transfrom = {};
      }
      window.onresize = () => {
        if (document.body.clientWidth<=375) {
          mutations.setMobile(true)
        } else {
          mutations.setMobile(false)
        }
        if (document.body.clientWidth >= 800) {
          scale = 750 / document.body.clientWidth;
          this.transfrom = {
            transform: "scale(" + scale + ")"
          };
        } else {
          this.transfrom = {};
        }
      };
    },
    getEvent(event) {
      return event || window.event;
    },
    getDomPath(element, useClass = false) {
      if (!(element instanceof HTMLElement)) {
        console.warn("input is not a HTML element!");
        return "";
      }
      let domPath = [];
      let elem = element;
      while (elem) {
        let domDesc = '';
        const getDomDesc = (elem, useClass = false) => {
          const children = elem.parentNode.children;
          if (children.length > 1) {
            for (let i = 0; i < children.length; i++) {
              if (children[i] === elem) {
                domDesc += `:nth-child(${i + 1})`;
                break;
              }
            }
          }
          domPath.unshift(domDesc);
        }
        domDesc = getDomDesc(elem, useClass)
        console.log(domDesc)
        if (!domDesc) {
          break;
        }
        domPath.unshift(domDesc);
        if (
          querySelector(domPath.join(">")) === element ||
          domDesc.indexOf("body") >= 0
        ) {
          break;
        }
        domPath.shift();
        const children = elem.parentNode.children;
        if (children.length > 1) {
          for (let i = 0; i < children.length; i++) {
            if (children[i] === elem) {
              domDesc += `:nth-child(${i + 1})`;
              break;
            }
          }
        }
        domPath.unshift(domDesc);
        if (querySelector(domPath.join(">")) === element) {
          break;
        }
        elem = elem.parentNode;
      }
      return domPath.join(">");
    },
    _handleEvent(event) {
      const domPath = this.getDomPath(event.target);
      const rect = this.$refs.app.getBoundingClientRect(event.target);
      if (rect.width == 0 || rect.height == 0) {
        return;
      }
      let t = document.documentElement || document.body.parentNode;
      const scrollX = (t && typeof t.scrollLeft == "number" ? t : document.body)
        .scrollLeft;
      const scrollY = (t && typeof t.scrollTop == "number" ? t : document.body)
        .scrollTop;
      const pageX = event.pageX || event.clientX + scrollX;
      const pageY = event.pageY || event.clientY + scrollY;
      const data = {
        domPath: encodeURIComponent(domPath),
        trackingType: event.type,
        offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
        offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6)
      };
      this.send(data);
    },
    send(data) {
      console.log(data);
    },
    initStoreList() {
      actions.SetShopList();
      actions.SetSupplierList()
    }
  }
};
</script>

<style lang="scss">
body,
html {
  /* background-color: #fff; */
  width: 100vw;
  height: 100%;
}
body {
  font-family: PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB,
    Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #222;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  min-height: 100%;
}

:root {
  --origin-safe-area-inset-top: 0;
  --origin-safe-area-inset-bottom: 0;
  --safe-area-inset-top: var(
    --windvane-safe-area-inset-top,
    var(--origin-safe-area-inset-top)
  );
  --safe-area-inset-bottom: var(
    --windvane-safe-area-inset-bottom,
    var(--origin-safe-area-inset-bottom)
  );
}
:root {
  --origin-safe-area-inset-top: env(safe-area-inset-top);
  --origin-safe-area-inset-bottom: env(safe-area-inset-bottom);
}
:root {
  --origin-safe-area-inset-top: 0;
  --origin-safe-area-inset-bottom: 0;
  --safe-area-inset-top: var(
    --windvane-safe-area-inset-top,
    var(--origin-safe-area-inset-top)
  );
  --safe-area-inset-bottom: var(
    --windvane-safe-area-inset-bottom,
    var(--origin-safe-area-inset-bottom)
  );
}
:root {
  --origin-safe-area-inset-top: env(safe-area-inset-top);
  --origin-safe-area-inset-bottom: env(safe-area-inset-bottom);
}

#app {
  /* background-color: #fff; */
  /* padding-top: 128px; */
  box-shadow: 0 0 1.333vw rgba(0, 0, 0, 0.1);
  min-height: 100%;
  transform-origin: center top;
}
#app {
  width: 100vw;
  margin: 0 auto;
  position: relative;
}

</style>
