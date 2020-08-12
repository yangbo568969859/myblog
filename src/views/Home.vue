<template>
  <div class="home">
    <div id="header-wrapper">
      <div id="header" class="auto-exp-rgn" :class="[isTop ? 'transparent':'']">
        <a href="" class="back icon" >
          <icon-svg class="sidebar-icon" icon-class="back" />
        </a>
        <i class="space"></i>
        <div class="title-wrap flex-between" :class="[showBack?'have-back':'']">
          <h2 class="title">中台-实时数据</h2>
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
              <p class="scroll-text-item">每日更新 数据动态播放</p>
            </div>
          </div>
        </div>
        <div class="page-tab">
          <p v-for="(value) in selectTabs" :key="value.key" :class="[selectTab === value.key ? 'current':'']" @click="tabClick(value.key)">{{value.name}}</p>
        </div>

        <div class="home-con">
          <van-skeleton title :row="6" :loading="loading">
            <title-num :time="'统计截至 '+'2020-04-23 17:44:55'" update="7分钟">
              <span @click="showInt =! showInt">介绍</span>
            </title-num>
            <recent-number :headerData="headerData"></recent-number>
            <van-sticky z-index="1111">
              <div class="global-tabs">
                <van-tabs v-model="active" @click="anchorTo">
                  <van-tab title="商品数据"></van-tab>
                  <van-tab title="订单数据"></van-tab>
                  <van-tab title="采购单数据"></van-tab>
                  <van-tab title="结算数据"></van-tab>
                </van-tabs>
              </div>
            </van-sticky>
            <custom-swiper :initData="tabData"></custom-swiper>
            <custom-swiper :initData="tabProps"></custom-swiper>
          </van-skeleton>
          <!-- <list-wrapper></list-wrapper> -->
        
          <table-title title="供应商最新商品数据" class="anchor-supplier"></table-title>
          <common-wrapper :columns="columns" :data-source="supplierList" :title="'供应商最新商品数据'">
            <template v-slot:now="record">
              <span class="now">{{record.row}}</span>
            </template>
            <template v-slot:add="record">
              <span class="red-color">{{record.row}}</span>
            </template>
            <template v-slot:worth="record">
              <div class="cell">€{{record.row.worth}}</div>
            </template>
            <template v-slot:detail>
              <span class="detail">详情</span>
            </template>
          </common-wrapper>
          <table-title title="以品牌维度" class="anchor-brand"></table-title>
          <common-wrapper :columns="columns1" :data-source="supplierList">
            <template v-slot:worth="record">
              <div class="cell">€{{record.row.worth}}</div>
            </template>
            <template v-slot:add="record">
              <span class="red-color">{{record.row}}</span>
            </template>
            <template v-slot:detail>
              <span class="hello">详情</span>
            </template>
          </common-wrapper>
          <table-title title="以品类维度" class="anchor-category"></table-title>
          <common-wrapper :columns="columns2" :data-source="supplierList">
            <template v-slot:worth="record">
              <div class="cell">€{{record.row.worth}}</div>
            </template>
            <template v-slot:add="record">
              <span class="red-color">{{record.row}}</span>
            </template>
            <template v-slot:detail>
              <span class="hello">详情</span>
            </template>
          </common-wrapper>
          <table-title title="以销售价维度" class="anchor-price"></table-title>
          <common-wrapper :columns="columns3" :data-source="supplierList">
            <template v-slot:worth="record">
              <div class="cell">€{{record.row.worth}}</div>
            </template>
            <template v-slot:detail>
              <span class="hello">详情</span>
            </template>
          </common-wrapper>
          <table-title title="以价格变更维度"></table-title>
          <common-wrapper :columns="columns4" :data-source="supplierList">
            <template v-slot:now="record">
              <div class="red-color">{{record.row}}</div>
            </template>
            <template v-slot:detail>
              <span class="hello">详情</span>
            </template>
          </common-wrapper>
          <title-num time="数据来源：中台每日公开数据"></title-num>
          <div class="pdBottom"></div>
        </div>
        <div v-loading="true">
          合理了哦1
        </div>
        <testTitle title="helllele1" subTitle="666"></testTitle>
        <!-- <a-loading :visible="true" text="加载中"></a-loading> -->
      </div>
    </div>

    <van-dialog v-model="showInt" title="商品数据说明" showConfirmButton>
      <div class="my-dialog-content">
        <div class="content">
          <div class="header">1.数据来源：</div>
          <div class="int">商品数据来源于.....</div>
        </div>
        <div class="content">
          <div class="header">2.数据更新时间：</div>
          <div>商品数据来源于.....</div>
        </div>
        <div class="content">
          <div class="header">3.说明：</div>
          <div class="int">商品数据来源于.....</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
// import ListWrapper from "@/components/table/ListWrapper";
import CommonWrapper from "@/components/table/CommonWrapper";
import TableTitle from "@/components/table/TableTitle";
import TitleNum from "@/components/home/TitleNum";
import RecentNumber from "@/components/home/RecentNumber";
import { Tab, Tabs, Tag, Sticky, Dialog, Skeleton } from 'vant';
import { yAxis, xAxis, tooltip } from '@/constants/echart';
import CustomSwiper from '@/components/swiper/CustomSwiper';

import { store, mutations } from '@/store/index';
// import Loading from '@/components/test/loading.js';
import testTitle from '@/components/table/TableTitle';

export default {
  name: "Home",
  data() {
    return {
      showBack: true,
      loading: true,
      isTop: false,
      selectTabs: [
        {
          name: '全部商品数据',
          key: 'all'
        },
        {
          name: '全部订单数据',
          key: 'order'
        },
      ],
      selectTab: "all",
      headerData: [
        {
          name: "SPU总数",
          total: "260186",
          change: "110"
        },
        {
          name: "SKU总数",
          total: "660186",
          change: "520"
        },
        {
          name: "总库存",
          total: "23444",
          change: "0"
        },
        {
          name: "总货值",
          total: "€186,594",
          change: "€1110"
        },
        {
          name: "已下载",
          total: "60186",
          change: "110"
        },
        {
          name: "异常",
          total: "26",
          change: "54"
        },
      ],
      swiperOptions: {
        spaceBetween: 30,
        navigation: {
          prevEl: ".swiper_b_l",
          nextEl: ".swiper_b_r"
        }
      },
      tabData: [
        {
          name: "SPU数据",
          title: '历史商品/新增商品对比',
          key: 'spu',
          options: null
        },
        {
          name: "SKU数据",
          title: '历史商品/新增商品对比',
          key: 'sku',
          options: null
        },
        {
          name: "库存数据",
          title: '历史商品/新增商品对比',
          key: 'quantity',
          options: null
        },
        {
          name: "货值数据",
          title: '历史商品/新增商品对比',
          key: 'money',
          options: null
        },
        {
          name: "下载数据",
          title: '历史商品/新增商品对比',
          key: 'download',
          options: null
        }
      ],
      tabProps: [
        {
          name: "品牌数据",
          title: '品牌占比 / 数量',
          key: 'brand',
          options: null
        },
        {
          name: "类目数据",
          title: '类目占比 / 数量',
          key: 'category',
          options: null
        },
        {
          name: "季节数据",
          title: '季节占比 / 数量',
          key: 'season',
          options: null
        },
      ],
      options1: {
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     // 坐标轴指示器，坐标轴触发有效
        //     type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        //   }
        // },
        tooltip: {
          ...tooltip
        },
        legend: {
          data: ["直接访问", "邮件营销", "联盟广告"]
        },
        grid: {
          top: 10,
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            ...xAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            ...yAxis
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      },
      options2: {
        tooltip: {
          ...tooltip
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          ...xAxis
        },
        yAxis: {
          type: "value",
          ...yAxis
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ],
        grid: {
          top: 10,
          bottom: 30,
          right: 10
        },
      },
      options3: {
        // 提示框
        tooltip: {
          ...tooltip,
          trigger: "axis" // 坐标触发
        },
        // 图表的标注
        // legend: {
        //   // 标注前面的形状这个是圆形
        //   icon: "circle",
        //   // 数据名称
        //   data: ["FIL", "TIC"],
        //   // y轴的位置 可选 top center bottom x轴同理
        //   y: "bottom"
        // },
        // 图形在画布的距离
        grid: {
          top: 10,
          right: 10,
          bottom: 30
        },
        // x轴的数据
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["意大利", "法国", "比利时", "爱尔兰", "美国", "冰岛", "西班牙"],
          ...xAxis
        },
        // y轴的数据
        yAxis: {
          type: "value",
          ...yAxis
        },
        // 折线图 （写几条折线图就写几个对象；是这个{}对象）
        series: [
          {
            name: "FIL",
            type: "line",
            stack: "总量",
            data: [12, 13, 10, 13, 9, 23, 21],
            color: "#ffb54c"
          },
          {
            name: "TIC",
            type: "line",
            stack: "总量",
            data: [20, 12, 11, 24, 29, 33, 31],
            color: "#9186fc"
          }
        ]
      },
      options4: {
        // 提示框
        tooltip: {
          ...tooltip,
          trigger: "axis"
        },
        grid: {
          top: 10,
          right: 10,
          bottom: 30
        },
        // x轴的数据
        xAxis: {
          type: "value",
          ...xAxis,
          axisLine: {
            show: false
          },
        },
        yAxis: {
          type: "category",
          data: ["意大利", "法国", "比利时", "爱尔兰", "美国", "冰岛", "西班牙"],
          ...yAxis
        },
        series: [
          {
            name: "FIL",
            type: "bar",
            // barMaxWidth: 6,
            barWidth: '40%',
            stack: "总量",
            data: [555, 666, 777, 999, 1111, 1222, 1444],
            color: "#ffb54c"
          },
        ]
      },
      initOptions: {
        renderer: "canvas"
      },
      initMapData: [],
      activeIndex: 0,
      active: 2,
      showInt: false,
      supplierList: [
        {
          name: "Ridi",
          add: "134",
          now: "12122",
          quantity: "2090",
          worth: "777"
        },
        {
          name: "Brg",
          add: "45",
          now: "23211",
          quantity: "1223",
          worth: "888"
        },
        {
          name: "Theclutcher",
          add: "333",
          now: "23234",
          quantity: "44443",
          worth: "999"
        }
      ],
      columns: [
        { title: '供应商', dataIndex: 'name', width: '15%'},
        { title: '新增SPU', dataIndex: 'add', width: '15%', scopedSlots: { customRender: 'add' }},
        { title: '现有SPU', dataIndex: 'now', width: '15%', scopedSlots: { customRender: 'now' } },
        { title: '库存', dataIndex: 'quantity', width: '12%'},
        { title: '货值', width: '12%', scopedSlots: { customRender: 'worth' } },
        { title: '查看', width: '12%', scopedSlots: { customRender: 'detail' } , sorter: (a, b) => a.age - b.age},
      ],
      columns1: [
        { title: '供应商', dataIndex: 'name'},
        { title: '新增SPU', dataIndex: 'add', scopedSlots: { customRender: 'add' }},
        { title: '现有SPU', dataIndex: 'now', scopedSlots: { customRender: 'now' } },
        { title: '库存', dataIndex: 'quantity'},
        { title: '货值', scopedSlots: { customRender: 'worth' } },
        { title: '查看', scopedSlots: { customRender: 'detail' } },
      ],
      columns2: [
        { title: '供应商', dataIndex: 'name'},
        { title: '新增SPU', dataIndex: 'add', scopedSlots: { customRender: 'add' }},
        { title: '现有SPU', dataIndex: 'now', scopedSlots: { customRender: 'now' } },
        { title: '库存', dataIndex: 'quantity'},
        { title: '货值', scopedSlots: { customRender: 'worth' } },
        { title: '查看', scopedSlots: { customRender: 'detail' } },
      ],
      columns3: [
        { title: '销售价(￥)', dataIndex: 'name'},
        { title: 'SPU数', dataIndex: 'add', scopedSlots: { customRender: 'add' }},
        { title: '库存', dataIndex: 'quantity'},
        { title: '货值', scopedSlots: { customRender: 'worth' }, sorter: true },
        { title: '查看', scopedSlots: { customRender: 'detail' } },
      ],
      columns4: [
        { title: '品牌', dataIndex: 'name'},
        { title: 'SPU数', dataIndex: 'add'},
        { title: '变更数量', dataIndex: 'now', scopedSlots: { customRender: 'now' }, sorter: true},
        { title: '查看', scopedSlots: { customRender: 'detail' } },
      ],
      timeInterval: null,
      times: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        "scroll",
        throttle(() => this.scrolled(), 50)
      );
    });
    this.fetchData()
    this.fetchDataProps()
    // this.loading = false;
    const timer = setTimeout(() => {
      this.loading = false;
    }, 1500);
    this.$once('hook:beforeDestroy', () => {
      clearTimeout(timer);
    })
    mutations.setUserInfo({
      name: {
        name: 'yangboi'
      }
    })
    // this.$loading({
    //   text:'加载中'
    // })
    this.timeStart();
  },
  methods: {
    fetchData() {
      this.tabData.forEach((value) => {
        this.$set(value, 'options', null)
        if (value.key ==='spu') {
          value.options = this.options1
        } else if (value.key === 'sku') {
          value.options = this.options2
        } else if (value.key === 'quantity') {
          value.options = this.options3
        } else if (value.key === 'money') {
          value.options = this.options4
        } else if (value.key === 'download') {
          value.options = this.options2
        }
      })
    },
    fetchDataProps() {
      this.tabProps.forEach((value) => {
        this.$set(value, 'options', null)
        if (value.key ==='brand') {
          value.options = this.options4
        } else if (value.key === 'category') {
          value.options = this.options3
        } else if (value.key === 'season') {
          value.options = this.options2
        }
      })
    },
    tabClick(value) {
      this.selectTab = value;
    },
    chartNavClick(index) {
      this.activeIndex = index;
      this.swiper.slideTo(index, 500, false);
    },
    onSwiperSlideChangeTransitionStart() {
      this.activeIndex = this.swiper.activeIndex;
    },
    scrolled() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 20) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    },
    timeStart() {
      console.log('start')
      this.timeInterval = setInterval(() => {
        this.times++
        console.log('我开始了第'+this.times+'次')
      }, 11000)
    },
    timeEnd() {
      console.log('end')
      clearInterval(this.timeInterval);
    },
    anchorTo(index, title) {
      const arrList = ['anchor-supplier', 'anchor-category', 'anchor-brand', 'anchor-price']
      const slstr = '.' + arrList[index]
      const anchor = this.$el.querySelector(slstr)
      anchor.scrollIntoView({
        behavior: "smooth",
        block: 'start'
      })
    }
  },
  computed: {
    swiper: function() {
      return this.$refs.mySwiper.$swiper;
    },
    userInfo() {
      return store.userInfo
    }
  },
  components: {
    CommonWrapper,
    TableTitle,
    // ListWrapper,
    TitleNum,
    RecentNumber,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Tag.name]: Tag,
    [Sticky.name]: Sticky,
    [Skeleton.name]: Skeleton,
    [Dialog.Component.name]: Dialog.Component,
    CustomSwiper,
    testTitle
  },
  pageVisible() {
    this.timeStart()
    console.log('页面显示出来了')
  },
  pageHidden() {
    this.timeEnd();
    console.log('页面隐藏了')
  }
};
</script>

<style lang="scss">
</style>
