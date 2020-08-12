<template>
  <div>
    <van-nav-bar
      :title="'供应商 - ' +(supplierName||'--')+'数据'"
      left-arrow
      @click-left="onClickLeft"
    />
    <global-header 
      title="每日更新 数据动态播放"
      :subTitle="supplierName+'最新商品数据'"
    >
      <div class="fix-top-stack">
        <recent-number :headerData="headerData" title="截止2020-04-22  12:00">
          <template v-slot:tips>
            <span @click="showTips"><icon-svg class="icon-13" icon-class="help"></icon-svg>介绍</span>
          </template>
        </recent-number>
        <div class="global-tabs" style="margin-bottom: 6px;">
          <van-tabs v-model="active" :class="[tabClass]" :border="false" :ellipsis="false">
            <van-tab v-for="value in tabList" :key="value.id" :title="value.title">
              <custom-swiper :initData="tabData"></custom-swiper>
            </van-tab>
          </van-tabs>
        </div>
        <van-tabs type="card" :ellipsis="false">
          <van-tab :title="value.title" v-for="value in tabCardList" :key="value.key">
            <van-skeleton :row="5" :loading="loading">
              <custom-table :columns="value.column" :data-source="value.dataSource">
                <template v-slot:add="record">
                  <span class="red-color">{{record.row}}</span>
                </template>
                <template v-slot:detail>
                  <div @click="goDetail" class="cell blue-color">详情</div>
                </template>
              </custom-table>
            </van-skeleton>
          </van-tab>
        </van-tabs>
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
    </global-header>
  </div>
</template>

<script>
import { yAxis, xAxis, tooltip } from '@/constants/echart';
export default {
  data() {
    return {
      supplierName: '',
      headerData: [
        {
          name: "SPU总数",
          total: "4189",
          change: "132"
        },
        {
          name: "总库存",
          total: "78989",
          change: "890"
        },
        {
          name: "售馨数",
          total: "33",
          change: "0"
        },
        {
          name: "SKU总数",
          total: "33",
          change: "0"
        },
        {
          name: "总货值",
          total: "€1124354",
          change: "€121009"
        },
        {
          name: "下架数",
          total: "6554",
          change: "30"
        },
        {
          name: "已下载",
          total: "41189",
          change: "132"
        },
        {
          name: "待下载",
          total: "5677",
          change: "233"
        },
        {
          name: "异常",
          total: "33",
          change: "0"
        },
      ],
      active: 0,
      tabList: [
        {
          title: '全部供应商',
          id: 1
        },
        {
          title: 'TheClutcher',
          id: 12
        },
        {
          title: 'Eraldo',
          id: 13
        },
        {
          title: 'Brg',
          id: 15
        },
      ],
      tabCardList: [
        {
          title: '已下载',
          column: null,
          dataSource: null,
          key: 12
        },
        {
          title: '待下载',
          column: null,
          dataSource: null,
          key: 13
        },
      ],
      loading: true,
      tabData: [
        {
          name: "SPU数据",
          key: 'spu',
          options: null
        },
        {
          name: "SKU数据",
          key: 'sku',
          options: null
        },
        {
          name: "库存数据",
          key: 'quantity',
          options: null
        },
        {
          name: "货值数据",
          key: 'money',
          options: null
        },
        {
          name: "下载数据",
          key: 'download',
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
      columns0: [
        { title: '品牌', dataIndex: 'name', width: '25%'},
        { title: 'SPU数量', dataIndex: 'add', scopedSlots: { customRender: 'add' }, sorter: true},
        { title: '下载数', dataIndex: 'now', scopedSlots: { customRender: 'now' }, sorter: true},
        { title: '货值', dataIndex: 'worth', sorter: true},
      ],
      showInt: false,
    }
  },
  created() {
    this.supplierName = this.$route.query.supplier_name;
  },
  mounted() {
    this.fetchData();
    this.fetchTableData()
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
    fetchTableData() {
      this.tabCardList.forEach((value, index) => {
        value.column = this.columns0;
        value.dataSource = this.supplierList
      })
      const timer = setTimeout(() => {
        this.loading = false
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearTimeout(timer);
      })
    },
    showTips() {
      console.log('showtips')
      this.showInt = !this.showInt;
    },
    goDetail() {
      this.$router.push({
        name: 'SupplierData',
        query: {
          'supplier_id': 1009
        }
      })
    },
    onClickLeft() {
      this.$router.back()
    }
  },
  computed: {
    tabClass() {
      return this.tabList.length<=1 ? 'tab-limit':''
    }
  }
}
</script>