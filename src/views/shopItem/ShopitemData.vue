<template>
  <global-header 
    title="中台-实时数据"
    subTitle="店铺商品最新数据"
  >
    <div class="fix-top-stack">
      <recent-number :headerData="headerData" title="截止2020-04-22  12:00">
        <template v-slot:tips>
          <span @click="showInt =! showInt"><icon-svg class="icon-13" icon-class="help"></icon-svg>介绍</span>
        </template>
      </recent-number>
      <div class="global-tabs">
        <van-tabs v-model="active" :class="[tabClass]" :border="false">
          <van-tab v-for="value in tabList" :key="value.id" :title="value.title">
            <custom-swiper :initData="tabData"></custom-swiper>
          </van-tab>
        </van-tabs>
      </div>
      <table-title title="采购单数据" class="anchor-supplier"></table-title>
      <custom-table :columns="columns2" :data-source="supplierList">
        <template v-slot:add="record">
          <span class="red-color">{{record.row}}</span>
        </template>
        <template v-slot:detail>
          <div class="cell blue-color">详情</div>
        </template>
      </custom-table>
    </div>
  </global-header>
</template>

<script>
import { yAxis, xAxis, tooltip } from '@/constants/echart';
export default {
  data() {
    return {
      headerData: [
        {
          name: "在售商品",
          total: "4189",
          change: "132"
        },
        {
          name: "仓库商品数",
          total: "78989",
          change: "890"
        },
        {
          name: "授权品牌数",
          total: "33",
          change: "0"
        },
      ],
      active: 0,
      tabList: [
        {
          title: '在售商品',
          id: 1
        },
        {
          title: '仓库商品',
          id: 12
        },
        {
          title: '授权品牌',
          id: 13
        },
      ],
      tabData: [
        {
          name: "京东丽锋奢侈品全球购专营店",
          key: 'spu',
          options: null
        },
        {
          name: "京东爱琴海购海外旗舰店",
          key: 'sku',
          options: null
        },
        {
          name: "考拉iqh海外专营店",
          key: 'quantity',
          options: null
        },
        {
          name: "天猫iqh箱包海外专营店",
          key: 'money',
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
      supplierList: [
        {
          name: "Ridi",
          add: "134",
          now: "12122",
          quantity: "2090",
          fail: "2090",
          worth: "777"
        },
        {
          name: "Brg",
          add: "45",
          now: "23211",
          quantity: "1223",
          fail: "90",
          worth: "888"
        },
        {
          name: "Theclutcher",
          add: "333",
          now: "23234",
          quantity: "44443",
          fail: "500",
          worth: "999"
        }
      ],
      columns2: [
        { title: '平台店铺', dataIndex: 'name', width: '20%'},
        { title: '在售商品', dataIndex: 'add', scopedSlots: { customRender: 'add' }, sorter: true},
        { title: '仓库商品', dataIndex: 'now', scopedSlots: { customRender: 'now' }, sorter: true},
        { title: '授权品牌', dataIndex: 'quantity', sorter: true},
        { title: '查看', scopedSlots: { customRender: 'detail' }, width: '15%'},
      ],
    }
  },
  mounted() {
    this.fetchData()
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
  },
  computed: {
    tabClass() {
      return this.tabList.length<=1 ? 'tab-limit':''
    }
  }
}
</script>