<template>
  <global-header 
    title="订单最新数据"
    subTitle="实时展示"
  >
    <div class="fix-top-stack">
      <!-- <div class="page-tab">
        <p v-for="(value) in selectTabs" :key="value.key" :class="[selectTab === value.key ? 'current':'']" @click="tabClick(value.key)">{{value.name}}</p>
      </div> -->
      <recent-number :headerData="headerData" :title="'截止'+localTime">
        <template v-slot:tips>
          <span @click="showInt =! showInt"><icon-svg class="icon-13" icon-class="help"></icon-svg>介绍</span>
        </template>
      </recent-number>
      <div class="balck-block"></div>
      <div class="global-tabs">
        <!-- @click="onClickLine" -->
        <van-tabs @change="onClickLine" v-model="active" :class="[tabClass]" :ellipsis="false">
          <van-tab v-for="value in shopListR" :key="value.shop_id" :title="value.shop_name">
            <custom-swiper :initData="value.tabData" dateType="tag" :selectDate="value.time" :dateArr="dateArr" @dateChange="dateChange"></custom-swiper>
          </van-tab>
        </van-tabs>
      </div>
      <div class="balck-block"></div>
      <div class="global-tabs">
        <van-tabs v-model="active1" :class="[tabClass]" :ellipsis="false">
          <van-tab v-for="value in typeList" :key="value.id" :title="value.name">
            <custom-swiper :initData="value.tabData"></custom-swiper>
          </van-tab>
        </van-tabs>
      </div>
      <div class="balck-block"></div>
      <van-tabs type="card" :ellipsis="false" style="margin-top: 10px;">
        <van-tab :title="value.title" v-for="value in tabCardList" :key="value.key">
          <table-title :title="value.subTitle"></table-title>
          <van-skeleton :row="5" :loading="loading">
            <custom-table :columns="value.column" :data-source="value.dataSource">
              <template v-slot:sales_price="record">
                <span class="red-color">¥{{record.row}}</span>
              </template>
              <template v-slot:gross1="record">
                <span class="red-color">¥{{record.row}}</span>
              </template>
              <template v-slot:gross2="record">
                <span class="red-color">¥{{record.row}}</span>
              </template>
              <template v-slot:detail>
                <div class="cell blue-color">详情</div>
              </template>
            </custom-table>
          </van-skeleton>
        </van-tab>
      </van-tabs>
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
  </global-header>
</template>

<script>
import { yAxis, xAxis, tooltip } from '@/constants/echart';
import { statistics, shop } from '@/api';
import { store } from '@/store';
import util from '@/utils/util'

const color = {
  color0: ['#92B8FF', '#ffa655'],
  color1: ['#60BBFC', '#FFAFE6'],
  color2: ['#60BBFC', '#FF6060'],
  color3: ['#FFAFE6', '#92B8FF'],
}
const tabDataT = [
  {
    name: "订单数量",
    key: 'orders',
    title: '历史商品/新增商品对比',
    options: null
  },
  {
    name: "销售金额",
    key: 'sell_prices',
    title: '历史商品/新增商品对比',
    options: null
  },
  {
    name: "交易成功",
    key: 'trade_success',
    title: '历史商品/新增商品对比',
    options: null
  },
  {
    name: "交易关闭",
    key: 'trade_cancel',
    title: '历史商品/新增商品对比',
    options: null
  },
  {
    name: "毛利1",
    key: 'gross1',
    title: '历史商品/新增商品对比',
    options: null
  },
  {
    name: "毛利2",
    key: 'gross2',
    title: '历史商品/新增商品对比',
    options: null
  },
]

export default {
  data() {
    return {
      showInt: false,
      // selectTabs: [
      //   {
      //     name: '全部商品数据',
      //     key: 'all'
      //   },
      //   {
      //     name: '全部订单数据',
      //     key: 'order'
      //   },
      // ],
      // selectTab: "all",
      headerData: null,
      localTime: '',
      active: 0,
      active1: 0,
      tableData: [],
      columns2: [
        { title: '平台店铺', dataIndex: 'shop_name', width: '25%'},
        { title: '分销订单', dataIndex: 'order_num', sorter: (a, b) => b.order_num - a.order_num},
        { title: '销量', dataIndex: 'sales', sorter: true},
        { title: '销售金额', dataIndex: 'sales_price', scopedSlots: { customRender: 'sales_price' }, sorter: true},
        { title: '查看', scopedSlots: { customRender: 'detail' }, width: '12%'},
      ],
      columns1: [
        { title: '平台店铺', dataIndex: 'shop_name', width: '25%'},
        { title: '分销订单', dataIndex: 'order_num', sorter: (a, b) => b.order_num - a.order_num},
        { title: '毛利1', dataIndex: 'gross1', scopedSlots: { customRender: 'gross1' }, sorter: true},
        { title: '毛利2', dataIndex: 'gross2', scopedSlots: { customRender: 'gross2' }, sorter: true},
        { title: '查看', scopedSlots: { customRender: 'detail' }, width: '12%'},
      ],
      tabCardList: [
        {
          title: '按店铺',
          subTitle: '各店铺-今日订单数据',
          column: null,
          dataSource: null,
          key: 12
        },
        {
          title: '按毛利',
          subTitle: '各店铺-今日毛利数据',
          column: null,
          dataSource: null,
          key: 13
        }
      ],
      loading: true,
      typeList: [
        {
          id: 11,
          name: '店铺',
          tabData: tabDataT,
        },
        {
          id: 12,
          name: '供应商',
          tabData: [
            {
              name: "订单数量",
              key: 'order_num',
              title: '历史商品/新增商品对比',
              options: null
            },
            {
              name: "销售金额",
              key: 'sell_price',
              title: '历史商品/新增商品对比',
              options: null
            },
            {
              name: "毛利1",
              key: 'gross1',
              title: '历史商品/新增商品对比',
              options: null
            },
            {
              name: "毛利2",
              key: 'gross2',
              title: '历史商品/新增商品对比',
              options: null
            },
          ],
        },
        {
          id: 13,
          name: '品牌',
          tabData: tabDataT
        },
        {
          id: 14,
          name: '品类',
          tabData: tabDataT
        },
        {
          id: 15,
          name: '销售价',
          tabData: tabDataT
        }
      ],
      shopListR: [],
      time: 1,
      dateArr: [
        {
          value: 1,
          label: '日'
        },
        {
          value: 2,
          label: '周'
        },
        {
          value: 3,
          label: '月'
        }
      ]
    }
  },
  // created() {},
  async mounted() {
    this.fetchRecentNumber()
    this.fetchTable();
    const res = await shop.by.org.page({
      'org_id': 35,
    });
    if (res.success === true && res.data.length && Array.isArray(res.data)) {
      const first = {
        'approle_status': null,
        'cert_status': null,
        'gropu_type': null,
        'logo': null,
        'org_id': null,
        'platform_id': null,
        'platform_name': null,
        'shop_id': '',
        'shop_name': "全部",
        'shop_type': null,
        'status': null,
      }
      res.data.unshift(first);
      this.shopListR = res.data.map(value => {
        return {...value, tabData: null, time: this.dateArr[0].value}
      })
    }
    this.fetchDataLine();
    this.fetchDataBar();
    // util.sleep(200).then(() => {
    //   this.fetchDataLine();
    //   this.fetchDataBar();
    //   this.fetchRecentNumber()
    //   this.fetchTable();
    // })
  },
  methods: {
    dateChange(e) {
      this.time = e;
      this.shopListR[this.active].time = e;
      this.fetchDataLine()
    },
    onClickLine(name) {
      this.fetchDataLine();
      // this.shopList.forEach(value => {
      //   if (!value.tabData) {
      //     this.fetchDataLine();
      //   }
      // })
    },
    async fetchRecentNumber() {
      const res = await statistics.trade.get({
        'shop_id': ''
      })
      if (res.success === true) {
        const item = res.data;
        this.localTime = item.local_time;
        this.headerData = [
          {
            name: "订单总数",
            total: item.order_total_num,
            change: item.order_num - item.yesterday_order_num,
            today: item.order_num
          },
          {
            name: "总销量",
            total: item.sell_total_num,
            change: item.sell_num - item.yesterday_sell_num,
            today: item.sell_num
          },
          {
            name: "销售总额",
            total: `¥${item.sell_total_price}`,
            today: item.sell_price
          },
          {
            name: "待发货",
            total: item.wait_send_goods,
            change: item.wait_send_goods - item.yesterday_wait_send_goods
          },
          {
            name: "交易成功",
            total: item.trade_success_total_num,
            today: item.trade_success_num
          },
          {
            name: "交易关闭",
            total: item.trade_cancel_total_num,
            today: item.trade_cancel_num
          },
          {
            name: "毛利1",
            total: `¥${item.gross1Total_price}`,
            today: item.gross1Price
          },
          {
            name: "毛利2",
            total: `¥${item.gross2Total_price}`,
            today: item.gross2Price
          },
          {
            name: "订单成功率",
            total: this.$fixedNum(item.trade_success_rate*100) +'%',
          },
          {
            name: "平均毛利率",
            total: this.$fixedNum(item.gross_rate*100) +'%'
          },
        ];
      }
    },
    async fetchDataLine() {
      const resAll = await statistics.trade.line.report.get({
        'shop_id': this.shopListR[this.active].shop_id,
        'time': this.shopListR[this.active].time,
        'page_size': ''
      })
      const res = resAll.data;
      if (resAll.success === true) {
        const res = resAll.data;
        const tabData = JSON.parse(JSON.stringify(tabDataT));
        tabData.forEach((value, index) => {
          const options1 = {
            tooltip: {
              trigger: 'axis',
              ...tooltip
            },
            grid: {
              bottom: '0%',
              left: '0%',
              right: '0%',
              top: '4%',
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: [],
              ...xAxis
            },
            yAxis: {
              type: "value",
              ...yAxis
            },
            series: []
          };
          
          const data = res[value.key] && res[value.key].map(value => {
            return value.history.t
          })
          const data1 = res[value.key] && res[value.key].map(value => {
            return {
              date: value.history.t,
              value: value.history.d,
            }
          })
          const data2 = res[value.key] && res[value.key].map(value => {
            return {
              date: value.increasing.t,
              value: value.increasing.d,
            }
          })
          const colorT = color['color'+index] || ['#60BBFC', '#ffa655'];
          const series = [
            {
              name: "现有商品",
              type: "line",
              data: data1,
              rate: 0,
              color: colorT[0],
              smooth: true,
              lineStyle: { width: 4 },
              symbolSize: 10,
            },
            {
              name: "新增商品",
              type: "line",
              data: data2,
              rate: 0,
              color: colorT[1],
              smooth: true,
              lineStyle: { width: 4 },
              symbolSize: 10,
            },
          ]
          options1.xAxis.data = data;
          // options1.yAxis.axisLabel.formatter = '{value} °C';
          // options1.tooltip.formatter = function(params) {
          //   console.log(params);
          //   return params[2].name + '<br />' + ((params[2].value)).toFixed(1) + '%';
          // }
          options1.series = series;
          value.options = options1;
        })
        this.$set(this.shopListR[this.active], 'tabData', tabData||null)
      }
    },
    async fetchDataBar() {
      // const res = await statistics.trade.report.get({
      //   'start_time': '',
      //   'end_time': '',
      //   'statistics_tag': '',
      // })
      // console.log(res);
    },
    async fetchTable() {
      this.loading = true;
      const res = await statistics.shop.local.order.get();
      if (res.success === true) {
        this.tableData = res.data;
        this.tabCardList.forEach((value, index) => {
          value.column = this['columns'+(index+1)];
          value.dataSource = this.tableData
        })
        this.loading = false
      }
    },
    dealData(res) {
      const data = res.history.map(value => {
        return value.d
      })
      const data1 = res.history.map(value => {
        return {
          date: value.d,
          value: value.n,
        }
      })
      const data2 = res.increasing.map(value => {
        return {
          date: value.d,
          value: value.n,
        }
      })
      return {
        data: data,
        data1: data1,
        data2: data2,
      }
    },
    goDetail() {
      this.$router.push({
        name: 'OrderDetails'
      })
    }
  },
  computed: {
    tabClass() {
      return this.shopList.length<=3 ? 'tab-limit':''
    },
    shopList() {
      return store.shopList || []
      // return store.shopList.forEach(value => {
      //   this.$set(value, 'tabData', null)
      // }) || [];
    }
  }
}
</script>