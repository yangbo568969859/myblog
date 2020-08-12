<template>
  <div>
    <template v-if="initData">
      <swiper
        class="lineWrap"
        ref="mySwiper"
        :options="swiperOptions"
        @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart"
      >
        <swiper-slide class="lineItem" v-for="value in initData" :key="value.key">
          <div class="itemInner">
            <div class="time-select">
              <div class="left">统计时间</div>
              <div class="right" v-if="dateType!='none'">
                <select-time @timeChange="timeChange" v-if="dateType==='pick'"></select-time>
                <template v-if="dateType==='tag'">
                  <span @click="dateChange(date.value)" v-for="date in dateArr" :key="date.value" :class="[selectDate === date.value?'date-tag--primary':'date-tag--fefault']" class="date-tag date-tag--plain date-hairline--surround">{{date.label}}</span>
                </template>
              </div>
            </div>
            <!-- <div class="up-tips tips-data">{{value.title}}</div> -->
            <div class="country_lengend" v-if="value.options">
              <span class="item" v-for="(bg, i) in value.options.series" :key="i">
                {{bg.name}}
                <i class="color-block" :style="{backgroundColor: bg.color}"></i>
              </span>
            </div>
            <div class="linechart" :style="{height: height}">
              <div class="inner" :class="[isMobile?'':'pc']">
                <e-charts ref="map" :options="value.options" :init-options="initOptions" autoresize></e-charts>
              </div>
            </div>
          </div>
        </swiper-slide>
        <p class="swiper_b_l" slot="button-next"></p>
        <p class="swiper_b_r" slot="button-prev"></p>
        <div class="line-pagination swiper-pagination-custom" slot="pagination"></div>
      </swiper>
      <div class="line-pagination filterGray swiper-pagination-custom">
        <span
          v-for="(value, index) in initData"
          :key="index"
          :class="['swiper-pagination-customs', activeIndex == index ? 'active' : '']"
          @click="chartNavClick(index)"
        >{{value.name}}</span>
      </div>
    </template>
    <div v-else class="echart-empty">
      <van-loading type="spinner" />
      <div class="text">加载数据中...</div>
    </div>
  </div>
</template>

<script>
import { Tag } from 'vant';
import ECharts from "@/components/echarts/Echarts";
import { store } from "@/store";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  props: {
    initData: null,
    height: {
      default: '40vw'
    },
    dateType: {
      default: 'pick', // pick 时间区间； tag 日周月； none 无
      type: String
    },
    dateArr: {
      default: () => {
        return [
          {
            value: 'day',
            label: '日'
          },
          {
            value: 'week',
            label: '周'
          },
          {
            value: 'month',
            label: '月'
          }
        ]
      },
      type: Array
    },
    selectDate: {
      default: 0
    }
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 30,
        navigation: {
          prevEl: ".swiper_b_l",
          nextEl: ".swiper_b_r"
        }
      },
      initOptions: {
        renderer: "canvas",
        devicePixelRatio: window.devicePixelRatio,
        width: 618,
        height: 300
      },
      activeIndex: 0,
      // selectDate: this.dateArr[0].value
    }
  },
  methods: {
    onSwiperSlideChangeTransitionStart() {
      this.activeIndex = this.swiper.activeIndex;
    },
    chartNavClick(index) {
      this.activeIndex = index;
      this.swiper.slideTo(index, 500, false);
    },
    timeChange(date) {
      console.log(date, 'date')
    },
    dateChange(tag) {
      // this.selectDate = tag;
      this.$emit('dateChange', tag)
    }
  },
  computed: {
    swiper: function() {
      return this.$refs.mySwiper.$swiper;
    },
    isMobile() {
      return store.isMobile;
    }
  },
  components: {
    ECharts,
    Swiper,
    SwiperSlide,
    [Tag.name]: Tag,
  },
  directives: {
    swiper: directive
  }
}
</script>


<style lang="scss">
// .lineWrap {
//   margin: 10px auto 0;
//   width: 345px;
//   position: relative;
//   overflow: inherit;
// }
// .lineItem {
//   flex-shrink: 0;
//   .itemInner {
//     border: 1px solid #efefef; /*no*/
//     border-radius: 6px;
//     padding: 13px 0 0;
//   }
// }
// .swiper_b_l,
// .swiper_b_r {
//   width: 36px;
//   height: 36px;
//   position: absolute;
//   top: 50%;
//   -webkit-transform: translateY(-50%);
//   transform: translateY(-50%);
//   background-size: 100% 100%;
//   z-index: 2;
// }
// .swiper_b_l {
//   background-image: url(//mat1.gtimg.com/news/signin/v6/zhexian_left.png);
//   left: -18px;
// }
// .swiper_b_r {
//   background-image: url(//mat1.gtimg.com/news/signin/v6/zhelian_right.png);
//   right: -18px;
// }
// .up-tips {
//   box-sizing: border-box;
//   padding: 0 0 0 5.333vw;
//   height: 18px;
//   line-height: normal;
//   color: #222;
//   font-size: 14px;
//   font-weight: 700;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
// .tips-data {
//   position: relative;
//   margin: 0 5.333vw;
//   padding: 0;
// }
// .up-tips[data-v-27d557a6] {
//   margin: 0 12px 0 14px;
// }


.swiper-pagination-customs {
  line-height: 14px;
  font-size: 12px;
  overflow: hidden;
  display: inline-block;
}


.lineWrap {
  margin: 10px auto 0;
  width: 345px;
  position: relative;
  overflow: inherit;
}
.lineItem {
  flex-shrink: 0;
  .itemInner {
    border: 1px solid #efefef; /*no*/
    border-radius: 6px;
    padding: 10px 0;
  }
  .time-select {
    margin: 0 14px 6px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      font-weight: 500;
      color: #737373;
      font-size: 12px;
    }
    .right {
      >span {
        margin-left: 4px;
      }
    }
  }
}
.swiper_b_l,
.swiper_b_r {
  width: 36px;
  height: 36px;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background-size: 100% 100%;
  z-index: 2;
}
.swiper_b_l {
  background-image: url(https://img.aqsea.com/data/analysis/icon/zhexian_left.png);
  left: -18px;
}
.swiper_b_r {
  background-image: url(https://img.aqsea.com/data/analysis/icon/zhelian_right.png);
  right: -18px;
}
.up-tips {
  box-sizing: border-box;
  padding: 0 0 0 5.333vw;
  height: 18px;
  line-height: normal;
  color: #222;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tips-data {
  position: relative;
  margin: 0 5.333vw;
  padding: 0;
}
.up-tips {
  margin: 0 12px 0 14px;
}
.linechart {
  width: calc(100% - 24px);
  height: 150px;
  margin: 10px 12px 0;
  position: relative;
  .inner {
    position: relative;
    width: 200%;
    height: 200%;
    transform-origin: left top;
    transform: scale(.5);
    &.pc {
      width: 80%;
      height: 80%;
      transform: scale(1.25);
    }
  }
}
.linechart2 {
  height: 200px;
}


.country_lengend {
    // display: flex;
    // flex-wrap: wrap;
    margin: 4px 14px 0;
    height: 20px;
    line-height: 20px;
    .item {
      font-size: 12px;
      // line-height: 16px;
      // height: 16px;
      margin-right: 10px;
      position: relative;
      padding-left: 12px;
      font-weight: 400;
      display: inline-block;
      // float: left;
      .color-block {
        display: block;
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 1px;
        background: grey;
      }
    }
}
.echart-empty {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #c8c9cc;
  .text {
    margin-top: 10px;
  }
}


[class*=date-hairline]::after {
  position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 0 solid #ebedf0;
    transform: scale(.5);
}
.date-tag {
  position: relative;
    display: inline-flex;
    align-items: center;
    padding: .2em .5em;
    color: #fff;
    line-height: normal;
    border-radius: .2em;
    &::after{
      border-color: currentColor;
      border-radius: .4em;
      border-width: 1px;
    }
}
.date-tag--plain {
  color: #969799;
  background: #fff;
}
.date-tag--primary.date-tag--plain {
    color: #1989fa;
}
.date-tag--default.date-tag--plain {
    color: #969799;
}
</style>