<template>
  <global-header 
    title="采购单最新数据"
    subTitle="实时展示"
  >
    <div class="fix-top-stack">
      <recent-number :headerData="headerData" title="截止2020-04-22  12:00">
        <template v-slot:tips>
          <span @click="showInt =! showInt"><icon-svg class="icon-13" icon-class="help"></icon-svg>介绍</span>
        </template>
      </recent-number>
      <div class="balck-block"></div>
      <div class="global-tabs">
        <van-tabs @click="onClickLine" v-model="active" :class="[tabClass]" :ellipsis="false">
          <van-tab v-for="value in supplier" :key="value.shop_id" :title="value.company_name">
            <custom-swiper :initData="value.tabData"></custom-swiper>
          </van-tab>
        </van-tabs>
      </div>
      <div class="balck-block"></div>
      <div class="global-tabs">
        <van-tabs @click="onClickBar" v-model="active1" :class="[tabClass]" :ellipsis="false">
          <van-tab v-for="value in typeList" :key="value.id" :title="value.name">
            <custom-swiper :initData="value.tabData"></custom-swiper>
          </van-tab>
        </van-tabs>
      </div>
      <div class="balck-block"></div>
      <table-title title="今日-采购单数据" class="anchor-supplier"></table-title>
      <custom-table :columns="columns2" :data-source="supplierList">
        <template v-slot:worth="record">
          <div class="cell">€{{record.row.worth}}</div>
        </template>
        <template v-slot:add="record">
          <span>{{record.row}}</span>
        </template>
        <template v-slot:worth="record">
          <div class="cell">€{{record.row.worth}}</div>
        </template>
      </custom-table>
    </div>
  </global-header>
</template>

<script>
import { yAxis, xAxis, tooltip } from '@/constants/echart';
import { statistics } from '@/api';
import { store } from '@/store';

const color = {
  color0: ['#60BBFC', '#ffa655'],
  color1: ['#60BBFC', '#7E74EB'],
  color2: ['#DD0B10', '#FF6060'],
  color3: ['#FFAFE6', '#92B8FF'],
}

export default {
  data() {
    return {
      headerData: [
        {
          name: "采购单总数",
          total: "189",
          change: "12",
          today: 11
        },
        {
          name: "待发货",
          total: "12",
          change: "0"
        },
        {
          name: "采购成功",
          total: "12",
          today: "0"
        },
        {
          name: "采购失败",
          total: "33",
          today: "0"
        },
        {
          name: "采购金额",
          total: "€124354.3",
          today: "€124.3"
        },
        {
          name: "采购成功率",
          total: "90.5%",
        },
      ],
      active: 0,
      active1: 0,
      tabData: [
        {
          name: "采购单数量",
          key: 'purchase_num',
          options: null
        },
        {
          name: "采购金额",
          key: 'purchase_price',
          options: null
        },
        {
          name: "交易成功",
          key: 'purchase_success',
          options: null
        },
        {
          name: "采购失败",
          key: 'purchase_fail',
          options: null
        },
      ],
      options1: {
        legend: {
          data: ["现有商品", "新增商品"]
        },
        tooltip: {
          trigger: 'axis',
          ...tooltip
        },
        grid: {
          top: 10,
          bottom: 30,
          right: 10,
          left: 20
        },
        xAxis: {
          type: "category",
          data: [],
          ...xAxis
        },
        yAxis: [
          {
            type: "value",
            ...yAxis
          }
        ],
        series: [
          {
            name: "现有商品",
            type: "line",
            data: [],
            rate: 0,
            color: '#60BBFC',
            smooth: true
          },
          {
            name: "新增商品",
            type: "line",
            data: [],
            rate: 0,
            color: '#ffa655',
            smooth: true
          },
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
          bottom: '0%',
          left: '0%',
          right: '0%',
          top: '4%',
          containLabel: true,
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
          data: ["天猫iqh箱包海外专营店", "京东爱琴海购海外旗舰店", "考拉iqh海外专营店", "京东丽锋奢侈品全球购专营店"],
          ...yAxis
        },
        series: [
          {
            name: "数量",
            type: "bar",
            // barMaxWidth: 6,
            barWidth: '40%',
            data: [555, 666, 999, 1444],
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
        { title: '供应商', dataIndex: 'name', width: '25%'},
        { title: '采购单', dataIndex: 'now'},
        { title: '待发货', dataIndex: 'add', scopedSlots: { customRender: 'add' }, sorter: true},
        { title: '采购金额', scopedSlots: { customRender: 'worth' }, sorter: true},
      ],
      typeList: [
        {
          id: 11,
          name: '供应商',
          tabData: [
            {
              name: "采购单数量",
              key: 'purchase_num',
              title: '采购单占比 / 数量',
              options: null
            },
            {
              name: "采购金额",
              key: 'purchase_price',
              title: '历史商品/新增商品对比',
              options: null
            },
            {
              name: "交易成功",
              key: 'purchase_success',
              title: '历史商品/新增商品对比',
              options: null
            },
            {
              name: "采购失败",
              key: 'purchase_fail',
              title: '历史商品/新增商品对比',
              options: null
            },
          ],
        },
        {
          id: 12,
          name: '品牌',
          tabData: [
            {
              name: "采购单数量",
              key: 'purchase_num',
              title: '采购单占比 / 数量',
              options: null
            },
            {
              name: "采购金额",
              key: 'purchase_price',
              title: '历史商品/新增商品对比',
              options: null
            },
          ],
        },
        {
          id: 13,
          name: '品类',
          tabData: [
            {
              name: "采购单数量",
              key: 'purchase_num',
              title: '采购单占比 / 数量',
              options: null
            },
            {
              name: "采购金额",
              key: 'purchase_price',
              title: '历史商品/新增商品对比',
              options: null
            },
          ],
        },
        {
          id: 14,
          name: '采购价',
          tabData: [
            {
              name: "采购单数量",
              key: 'purchase_num',
              title: '采购单占比 / 数量',
              options: null
            },
            {
              name: "采购金额",
              key: 'purchase_price',
              title: '历史商品/新增商品对比',
              options: null
            },
          ],
        },
      ]
    }
  },
  mounted() {
    this.fetchDataLineT()
    this.fetchDataBar()
    this.fetchRecentNumber()
  },
  methods: {
    onClickLine() {
      this.fetchDataLineT();
    },
    onClickBar(name, title) {
      console.log(name, title);
    },
    async fetchDataLineT() {
      let res;
      if (this.active === 0) {
        res = {
          'purchase_num': {
            'history': [
              {
                d: '03.03',
                n: 1
              },
              {
                d: '03.04',
                n: 2
              },
              {
                d: '03.05',
                n: 4
              }
            ],
            'increasing': [
              {
                d: '03.03',
                n: 2
              },
              {
                d: '03.04',
                n: 4
              },
              {
                d: '03.05',
                n: 8
              }
            ]
          },
          'purchase_price': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
          'purchase_success': {
            'history': [
              {
                d: '03.09',
                n: 10
              },
              {
                d: '03.10',
                n: 17
              },
              {
                d: '03.11',
                n: 30
              },
              {
                d: '03.12',
                n: 67
              },
              {
                d: '03.14',
                n: 166
              },
              {
                d: '03.14',
                n: 266
              }
            ],
            'increasing': [
              {
                d: '03.09',
                n: 12
              },
              {
                d: '03.10',
                n: 30
              },
              {
                d: '03.11',
                n: 90
              },
              {
                d: '03.12',
                n: 167
              },
              {
                d: '03.14',
                n: 366
              },
              {
                d: '03.14',
                n: 566
              }
            ]
          },
          'purchase_fail': {
            'history': [
              {
                d: '03.09',
                n: 6.79
              },
              {
                d: '03.10',
                n: 6.44
              },
              {
                d: '03.11',
                n: 5.70
              },
              {
                d: '03.12',
                n: 4.79
              },
              {
                d: '03.14',
                n: 4.17
              },
              {
                d: '03.16',
                n: 3.98
              }
            ],
            'increasing': [
              {
                d: '03.09',
                n: 27.79
              },
              {
                d: '03.10',
                n: 35.79
              },
              {
                d: '03.11',
                n: 42.79
              },
              {
                d: '03.12',
                n: 52.79
              },
              {
                d: '03.14',
                n: 59.79
              },
              {
                d: '03.16',
                n: 61.79
              }
            ]
          },
        }
      } else {
        res = {
          'purchase_num': {
            'history': [
              {
                d: '04.03',
                n: 1
              },
              {
                d: '04.04',
                n: 10
              },
              {
                d: '04.05',
                n: 4
              }
            ],
            'increasing': [
              {
                d: '04.03',
                n: 2
              },
              {
                d: '04.04',
                n: 14
              },
              {
                d: '04.05',
                n: 8
              }
            ]
          },
          'purchase_price': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
          'purchase_success': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
          'purchase_fail': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
        }
      }
      const tabData = [
        {
          name: "采购单数量",
          key: 'purchase_num',
          options: null
        },
        {
          name: "采购金额",
          key: 'purchase_price',
          options: null
        },
        {
          name: "交易成功",
          key: 'purchase_success',
          options: null
        },
        {
          name: "采购失败",
          key: 'purchase_fail',
          options: null
        },
      ]
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
        
        const data = res[value.key].history.map(value => {
          return value.d
        })
        const data1 = res[value.key].history.map(value => {
          return {
            date: value.d,
            value: value.n,
          }
        })
        const data2 = res[value.key].increasing.map(value => {
          return {
            date: value.d,
            value: value.n,
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
            smooth: true
          },
          {
            name: "新增商品",
            type: "line",
            data: data2,
            rate: 0,
            color: colorT[1],
            smooth: true
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
      this.supplier[this.active].tabData = tabData;
    },
    async fetchDataLine() {
      console.log(this.active)
      let res;
      if (this.active === 0) {
        res = {
          'purchase_num': {
            'history': [
              {
                d: '03.03',
                n: 1
              },
              {
                d: '03.04',
                n: 2
              },
              {
                d: '03.05',
                n: 4
              }
            ],
            'increasing': [
              {
                d: '03.03',
                n: 2
              },
              {
                d: '03.04',
                n: 4
              },
              {
                d: '03.05',
                n: 8
              }
            ]
          },
          'purchase_price': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
          'purchase_success': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
          'purchase_fail': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
        }
      } else {
        res = {
          'purchase_num': {
            'history': [
              {
                d: '04.03',
                n: 1
              },
              {
                d: '04.04',
                n: 2
              },
              {
                d: '04.05',
                n: 4
              }
            ],
            'increasing': [
              {
                d: '04.03',
                n: 2
              },
              {
                d: '04.04',
                n: 4
              },
              {
                d: '04.05',
                n: 8
              }
            ]
          },
          'purchase_price': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
          'purchase_success': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
          'purchase_fail': {
            'history': [
              {
                d: '一月',
                n: 10
              },
              {
                d: '二月',
                n: 17
              },
              {
                d: '三月',
                n: 30
              },
              {
                d: '四月',
                n: 67
              },
              {
                d: '五月',
                n: 16
              },
              {
                d: '六月',
                n: 7
              }
            ],
            'increasing': [
              {
                d: '一月',
                n: 17
              },
              {
                d: '二月',
                n: 26
              },
              {
                d: '三月',
                n: 40
              },
              {
                d: '四月',
                n: 80
              },
              {
                d: '五月',
                n: 39
              },
              {
                d: '六月',
                n: 27
              }
            ]
          },
        }
      }
      this.supplier.forEach((s, index) => {
        if (this.active === index) {
          const tabData = [
            {
              name: "采购单数量",
              key: 'purchase_num',
              options: null
            },
            {
              name: "采购金额",
              key: 'purchase_price',
              options: null
            },
            {
              name: "交易成功",
              key: 'purchase_success',
              options: null
            },
            {
              name: "采购失败",
              key: 'purchase_fail',
              options: null
            },
          ]
          tabData.forEach(value => {
            const options1 = this.options1;
            const data = res[value.key].history.map(value => {
              return value.d
            })
            const data1 = res[value.key].history.map(value => {
              return {
                date: value.d,
                value: value.n,
              }
            })
            const data2 = res[value.key].increasing.map(value => {
              return {
                date: value.d,
                value: value.n,
              }
            })
            options1.xAxis.data = data
            options1.series[0].data = data1
            options1.series[1].data = data2;
            value.options = options1;
          })
          console.log(tabData)

          this.$set(s, 'tabData', tabData)
        }
      })
      console.log(this.supplier)
    },
    async fetchDataBar() {
      const res = {
        'purchase_num': [
          {
            id: 1,
            name: '供应商A',
            value: 888,
            proportion: ''
          },
          {
            id: 2,
            name: '供应商B',
            value: 777,
            proportion: ''
          },
          {
            id: 3,
            name: '供应商C',
            value: 666,
            proportion: ''
          },
        ],
        'purchase_price': [
          {
            id: 1,
            name: '供应商A',
            value: 888,
            proportion: ''
          },
          {
            id: 2,
            name: '供应商B',
            value: 777,
            proportion: ''
          },
          {
            id: 3,
            name: '供应商C',
            value: 666,
            proportion: ''
          },
        ],
        'purchase_success': [
          {
            id: 1,
            name: '供应商A',
            value: 888,
            proportion: ''
          },
          {
            id: 2,
            name: '供应商B',
            value: 777,
            proportion: ''
          },
          {
            id: 3,
            name: '供应商C',
            value: 666,
            proportion: ''
          },
        ],
        'purchase_fail': [
          {
            id: 1,
            name: '供应商A',
            value: 888,
            proportion: ''
          },
          {
            id: 2,
            name: '供应商B',
            value: 777,
            proportion: ''
          },
          {
            id: 3,
            name: '供应商C',
            value: 666,
            proportion: ''
          },
        ],
      }
      this.typeList[this.active].tabData.forEach(value => {
        const options1 = this.options4;
        const name = res[value.key].map(value => {
          return value.name
        })
        const data1 = res[value.key].map(value => {
          return value.value
        })
        options1.yAxis.data = name
        options1.series[0].data = data1
        value.options = options1;
      })
      // const res = await statistics.purchase.report.get({
      //   'start_time': '',
      //   'end_time': '',
      //   'statistics_tag': '',
      // })
      // console.log(res);

    },
    async fetchRecentNumber() {
      const res = await statistics.purchase.get({
        'shop_id': 10
      })
      if (res.success) {
        const item = res.item;
        this.localTime = item.local_time;
        this.headerData = [
          {
            name: "采购单总数",
            total: item.purchase_total_num,
            change: item.purchase_num,
            today: item.local_purchase_num
          },
          {
            name: "待发货",
            total: item.wait_send_goods,
            change: item.contrast_wait_send_goods
          },
          {
            name: "采购成功",
            total: `${item.purchase_total_success}`,
            today: item.purchase_success
          },
          {
            name: "采购失败",
            total: item.purchase_total_fail,
            today: item.purchase_fail
          },
          {
            name: "采购金额",
            total: `€${item.purchase_total_price}`,
            today: `€${item.purchase_price}`
          },
          {
            name: "采购成功率",
            total: `${item.purchase_success_rate}%`,
          },
        ];
      }
    },
  },
  computed: {
    tabClass() {
      return this.supplier.length<=3 ? 'tab-limit':''
    },
    supplier() {
      return store.supplierList || [];
    }
  }
}
</script>