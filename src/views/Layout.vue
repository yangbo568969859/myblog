<template>
  <div class="home">
    <div class="filterGray navWarperWraper">
      <div class="navHidden"></div>
      <div class="navWarper">
        <div class="navTabs">
          <van-tabs
            v-model="activeName"
            @click="onClick"
            :ellipsis="false"
            @disabled="onClickDisabled"
          >
            <van-tab
              v-for="value in tabList"
              :key="value.id"
              :title="value.title"
              :name="value.router"
              :disabled="value.disabled"
            ></van-tab>
          </van-tabs>
        </div>
        <!-- <div class="hidden" ref="hidden">
          <div id="staticNav" class="navTabs view">
            <div @click="tabClick(tab)" :class="[activeName===tab.router?'active':'']" v-for="tab in tabList" :key="tab.id">{{tab.title}}</div>
          </div>
        </div>-->
      </div>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "SupplierData",
      tabList: [
        {
          title: "商品数据",
          router: "SupplierData",
          id: 0,
          disabled: false,
        },
        {
          title: "产品库数据",
          router: "ProductData",
          id: 1,
          disabled: true,
        },
        {
          title: "店铺商品数据",
          router: "ShopItemData",
          id: 2,
          disabled: true,
        },
        {
          title: "订单数据",
          router: "OrderData",
          id: 3,
          disabled: false,
        },
        {
          title: "采购单数据",
          router: "PurchaseData",
          id: 5,
          disabled: false,
        },
        {
          title: "结算数据",
          router: "SettleData",
          id: 4,
          disabled: false,
        },
      ],
    };
  },
  mounted() {
    this.setKey();
  },
  methods: {
    onClick(name, title) {
      if (name === this.$route.name) return;
      this.$router.push({
        name: name,
      });
    },
    onClickDisabled(name, title) {
      console.log(name, title);
      this.$toast(`${title}页面暂未开放`);
    },
    setKey() {
      if (!this.$route.name) {
        this.activeName = "OrderData";
        return;
      }
      this.tabList.forEach((value) => {
        if (value.router === this.$route.name) {
          this.activeName = value.router;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  padding-top: 45px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.navWarperWraper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1111;
}
.navHidden {
  height: 45px;
}
.navWarper {
  background: #fff;
  z-index: 8;
  height: 45px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  .van-tab {
    padding: 0 10px;
  }
  // .hidden {
  //   height: 100%;
  //   width: 100%;
  //   overflow: hidden;
  //   position: relative;
  // }
}
.navTabs {
  padding: 0 10px;
}
// .navTabs {
//   height: 62px;
//   padding: 0 10px;
//   background: #f8f8f8;
//   z-index: 9;
//   display: flex;
//   justify-content: left;
//   overflow: auto;
//   width: 355px;
//   transition: all 0.3s ease-out;
//   background-color: #005dff;
//   > div {
//     display: inline-block;
//     -ms-flex-negative: 0;
//     flex-shrink: 0;
//     padding: 0 10px;
//     line-height: 44px;
//     height: 44px;
//     text-align: center;
//     font-size: 14px;
//     position: relative;
//     color: hsla(0, 0%, 100%, 0.7);
//     &.active {
//       color: #fff;
//       font-weight: 500;
//       &::after {
//         content: ".";
//         font-size: 0;
//         line-height: 0;
//         display: block;
//         position: absolute;
//         width: 30px;
//         height: 2px;
//         border-radius: 4px;
//         background-color: #ffeaa6;
//         top: 38px;
//         left: 50%;
//         transform: translate(-50%);
//       }
//     }
//   }
// }
// .view {
//   transition: all 0.6s cubic-bezier(0.55, 0, 0.1, 1);
//   transform: translateZ(0);
// }
</style>