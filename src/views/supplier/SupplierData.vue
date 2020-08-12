<template>
  <global-header title="每日更新 数据动态播放" subTitle="商品 订单 采购单数据实时展示">
    <div class="fix-top-stack">
      <recent-number :headerData="headerData" title="截止2020-04-22  12:00">
        <template v-slot:tips>
          <span @click="showTips">
            <icon-svg class="icon-13" icon-class="help"></icon-svg>介绍
          </span>
        </template>
      </recent-number>
      <div class="balck-block"></div>
      <div class="global-tabs">
        <van-tabs @click="onClickLine" v-model="active" :class="[tabClass]" :ellipsis="false">
          <van-tab v-for="value in supplier" :key="value.shop_id" :title="value.company_name">
            <custom-swiper :initData="value.tabData" dateType="tag"></custom-swiper>
          </van-tab>
        </van-tabs>
      </div>
      <div class="balck-block"></div>
      <div class="global-tabs">
        <van-tabs @click="onClickLineF" v-model="activeF" :class="[tabClass]" :ellipsis="false">
          <van-tab v-for="value in supplierF" :key="value.shop_id" :title="value.company_name">
            <custom-swiper :initData="value.tabData" dateType="null"></custom-swiper>
          </van-tab>
        </van-tabs>
      </div>
      <!-- <div class="global-tabs" style="margin-bottom: 6px;">
        <van-tabs v-model="active" :class="[tabClass]" :border="false" :ellipsis="false">
          <van-tab v-for="value in tabList" :key="value.id" :title="value.title">
            <custom-swiper :initData="tabData"></custom-swiper>
          </van-tab>
        </van-tabs>
      </div>-->
      <div class="balck-block"></div>
      <van-tabs type="card" :ellipsis="false" style="margin-top: 10px;">
        <van-tab :title="value.title" v-for="value in tabCardList" :key="value.key">
          <table-title :title="value.subTitle"></table-title>
          <van-skeleton :row="5" :loading="loading">
            <custom-table :columns="value.column" :data-source="value.dataSource">
              <template v-slot:add="record">
                <span class="red-color">{{record.row}}</span>
              </template>
              <template v-slot:detail="record">
                <div @click="goDetail(record.row)" class="cell blue-color">详情</div>
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
</template>

<script>
import { yAxis, xAxis, tooltip } from "@/constants/echart";
import { store } from "@/store";
import DrawBar from "@/jared/bar/drawBar";
import DrawLines from "@/jared/drawLines";

const colors = [
  "#9B0A0E",
  "#FF7B7C",
  "#FFA655",
  "#FFD661",
  "#CD73BF",
  "#7E74EB",
  "#5591FA",
  "#60BBFC",
];
const cts = {
  'history': '现有商品',
  'increasing': '新增商品'
}
const tabDataT = [
  {
    name: "SPU数据",
    key: "spu",
    title: "SPU数/新增SPU数",
    options: null,
  },
  {
    name: "SKU数据",
    key: "sku",
    title: "SKU数据/新增SKU数据",
    options: null,
  },
  {
    name: "库存数据",
    key: "quantity",
    title: "库存数据/新增库存数据",
    options: null,
  },
  {
    name: "货值数据",
    key: "money",
    title: "货值数据/新增货值数据",
    options: null,
  },
  {
    name: "下载数据",
    key: "download",
    title: "下载数据/新增下载数据",
    options: null,
  },
];
const tabDataF = [
  {
    name: "品牌数据",
    key: "brand",
    title: "品牌占比 / 商品数量",
    options: null,
  },
  {
    name: "类目数据",
    key: "category",
    title: "类目占比 / 商品数量",
    options: null,
  },
  {
    name: "上市季节",
    key: "season",
    title: "上市季节占比 / 商品数量",
    options: null,
  },
];

export default {
  data() {
    return {
      headerData: [],
      active: 0,
      activeF: 0,
      tabList: [
        {
          title: "全部供应商",
          id: 1,
        },
        {
          title: "TheClutcher",
          id: 12,
        },
        {
          title: "Eraldo",
          id: 13,
        },
        {
          title: "Brg",
          id: 15,
        },
      ],
      tabCardList: [
        {
          title: "按供应商",
          subTitle: "各供应商商品数据",
          column: null,
          dataSource: null,
          key: 12,
        },
        {
          title: "按品牌",
          subTitle: "按品牌维度",
          column: null,
          dataSource: null,
          key: 13,
        },
        {
          title: "按品类",
          subTitle: "按品类维度",
          column: null,
          dataSource: null,
          key: 14,
        },
        {
          title: "按季节",
          subTitle: "按季节维度",
          column: null,
          dataSource: null,
          key: 15,
        },
        {
          title: "按结算价",
          subTitle: "按结算价维度",
          column: null,
          dataSource: null,
          key: 16,
        },
        {
          title: "按价格变更",
          subTitle: "按价格变更维度",
          column: null,
          dataSource: null,
          key: 18,
        },
      ],
      loading: true,
      options1: {
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     // 坐标轴指示器，坐标轴触发有效
        //     type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        //   }
        // },
        tooltip: {
          ...tooltip,
        },
        legend: {
          data: ["直接访问", "邮件营销", "联盟广告"],
        },
        grid: {
          top: 10,
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            ...xAxis,
          },
        ],
        yAxis: [
          {
            type: "value",
            ...yAxis,
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      },
      options2: {
        tooltip: {
          ...tooltip,
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          ...xAxis,
        },
        yAxis: {
          type: "value",
          ...yAxis,
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
        grid: {
          top: 10,
          bottom: 30,
          right: 10,
        },
      },
      options3: {
        // 提示框
        tooltip: {
          ...tooltip,
          trigger: "axis", // 坐标触发
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
          bottom: 30,
        },
        // x轴的数据
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "意大利",
            "法国",
            "比利时",
            "爱尔兰",
            "美国",
            "冰岛",
            "西班牙",
          ],
          ...xAxis,
        },
        // y轴的数据
        yAxis: {
          type: "value",
          ...yAxis,
        },
        // 折线图 （写几条折线图就写几个对象；是这个{}对象）
        series: [
          {
            name: "FIL",
            type: "line",
            stack: "总量",
            data: [12, 13, 10, 13, 9, 23, 21],
            color: "#ffb54c",
          },
          {
            name: "TIC",
            type: "line",
            stack: "总量",
            data: [20, 12, 11, 24, 29, 33, 31],
            color: "#9186fc",
          },
        ],
      },
      options4: {
        // 提示框
        tooltip: {
          ...tooltip,
          trigger: "axis",
        },
        grid: {
          top: 10,
          right: 10,
          bottom: 30,
        },
        // x轴的数据
        xAxis: {
          type: "value",
          ...xAxis,
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: [
            "意大利",
            "法国",
            "比利时",
            "爱尔兰",
            "美国",
            "冰岛",
            "西班牙",
          ],
          ...yAxis,
        },
        series: [
          {
            name: "FIL",
            type: "bar",
            // barMaxWidth: 6,
            barWidth: "40%",
            stack: "总量",
            data: [555, 666, 777, 999, 1111, 1222, 1444],
            color: "#ffb54c",
          },
        ],
      },
      supplierList: [
        {
          name: "Ridi",
          add: "134",
          now: "12122",
          quantity: "2090",
          fail: "2090",
          worth: "777",
        },
        {
          name: "Brg",
          add: "45",
          now: "23211",
          quantity: "1223",
          fail: "90",
          worth: "888",
        },
        {
          name: "Theclutcher",
          add: "333",
          now: "23234",
          quantity: "44443",
          fail: "500",
          worth: "999",
        },
      ],
      columns0: [
        { title: "供应商", dataIndex: "name", width: "20%" },
        {
          title: "新增SPU",
          dataIndex: "add",
          scopedSlots: { customRender: "add" },
          sorter: true,
        },
        {
          title: "现有SPU",
          dataIndex: "now",
          scopedSlots: { customRender: "now" },
          sorter: true,
        },
        { title: "库存", dataIndex: "quantity", sorter: true },
        { title: "货值", dataIndex: "worth" },
        {
          title: "查看",
          scopedSlots: { customRender: "detail" },
          width: "15%",
        },
      ],
      columns1: [
        { title: "品牌", dataIndex: "name", width: "20%" },
        {
          title: "新增SPU",
          dataIndex: "add",
          scopedSlots: { customRender: "add" },
          sorter: true,
        },
        {
          title: "现有SPU",
          dataIndex: "now",
          scopedSlots: { customRender: "now" },
          sorter: true,
        },
        { title: "库存", dataIndex: "quantity", sorter: true },
        { title: "货值", dataIndex: "worth" },
        {
          title: "查看",
          scopedSlots: { customRender: "detail" },
          width: "15%",
        },
      ],
      columns2: [
        { title: "品类", dataIndex: "name", width: "20%" },
        {
          title: "新增SPU",
          dataIndex: "add",
          scopedSlots: { customRender: "add" },
          sorter: true,
        },
        {
          title: "现有SPU",
          dataIndex: "now",
          scopedSlots: { customRender: "now" },
          sorter: true,
        },
        { title: "库存", dataIndex: "quantity", sorter: true },
        { title: "货值", dataIndex: "worth" },
        {
          title: "查看",
          scopedSlots: { customRender: "detail" },
          width: "15%",
        },
      ],
      columns3: [
        { title: "上市季节", dataIndex: "name", width: "20%" },
        {
          title: "新增SPU",
          dataIndex: "add",
          scopedSlots: { customRender: "add" },
          sorter: true,
        },
        {
          title: "现有SPU",
          dataIndex: "now",
          scopedSlots: { customRender: "now" },
          sorter: true,
        },
        { title: "库存", dataIndex: "quantity", sorter: true },
        { title: "货值", dataIndex: "worth" },
        {
          title: "查看",
          scopedSlots: { customRender: "detail" },
          width: "15%",
        },
      ],
      columns4: [
        { title: "结算价(€)  ", dataIndex: "name", width: "20%" },
        {
          title: "SPU数",
          dataIndex: "add",
          scopedSlots: { customRender: "add" },
          sorter: true,
        },
        { title: "库存", dataIndex: "quantity", sorter: true },
        { title: "货值", dataIndex: "worth" },
        {
          title: "查看",
          scopedSlots: { customRender: "detail" },
          width: "15%",
        },
      ],
      columns5: [
        { title: "品牌", dataIndex: "name", width: "20%" },
        {
          title: "SPU数",
          dataIndex: "add",
          scopedSlots: { customRender: "add" },
          sorter: true,
        },
        { title: "变更数量", dataIndex: "quantity", sorter: true },
        {
          title: "查看",
          scopedSlots: { customRender: "detail" },
          width: "15%",
        },
      ],
      showInt: false,
      cts: {
        'history': '现有商品',
        'increasing': '新增商品'
      }
    };
  },
  mounted() {
    this.fetchRecentNumber();
    this.fetchTableData();
    this.fetchDataLine();
    this.fetchDataLineF();
  },
  methods: {
    onClickLine(name) {
      this.supplier.forEach((value) => {
        if (!value.tabData) {
          this.fetchDataLine();
        }
      });
    },
    onClickLineF(name) {
      this.supplierF.forEach((value, index) => {
        if (!value.tabData && name == index) {
          this.fetchDataLineF();
        }
      });
    },
    async fetchRecentNumber() {
      // const res = await statistics.trade.get({
      //   'shop_id': 10
      // })
      let res;
      const timer = setTimeout(() => {
        res = {
          success: true,
          item: {
            'order_total_num': 1989,
            'order_num': 19,
            'yesterday_order_num': 15,
            'sell_total_num': 2090,
            'sell_num': 20,
            'yesterday_sell_num': 18,
            'sell_total_price': 24354.3,
            'sell_price': 1210.0,
            'yesterday_sell_price': 1,
            'wait_send_goods': 15,
            'yesterday_wait_send_goods': 1,
            'trade_success_total_num': 1533,
            'trade_success_num': 13,
            'trade_cancel_total_num': 5,
            'trade_cancel_num': 3,
            'gross1_total_price': 11554.0,
            'gross1_price': 4090.9,
            'gross2_total_price': 4354.3,
            'gross2_price': 1430.8,
            'trade_success_rate': 0.609,
            'gross_rate': 0.23,
            'local_time': "2020-07-29 13:38:23",
          },
        };
        if (res.success) {
          const item = res.item;
          this.localTime = item.local_time;
          this.headerData = [
            {
              name: "SPU总数",
              total: item.order_total_num,
              today: item.order_num,
            },
            {
              name: "总库存",
              total: item.sell_total_num,
              today: item.sell_num,
            },
            {
              name: "售馨数",
              total: item.sell_num,
              today: item.sell_total_num,
            },
            {
              name: "SKU总数",
              total: item.wait_send_goods,
              change: item.wait_send_goods - item.yesterday_wait_send_goods,
            },
            {
              name: "总货值",
              total: `€${item.sell_total_price}`,
              today: item.sell_price,
            },
            {
              name: "下架数",
              total: item.trade_cancel_total_num,
              today: item.trade_cancel_num,
            },
            {
              name: "已下载",
              total: item.order_num,
              today: item.order_num,
              change: item.order_num,
            },
            {
              name: "待下载",
              total: item.order_num,
              today: 13,
              change: -9,
            },
            {
              name: "异常",
              total: 23,
              today: 23,
              change: 3,
            },
          ];
        }
      }, 200);
      this.$once("hook:beforeDestory", () => {
        clearTimeout(timer);
      });
    },
    async fetchDataLine() {
      // const res = await statistics.trade.get({
      //   'shop_id': 10
      // })
      // console.log(res);
      let res;
      if (this.active === 0) {
        res = {
          spu: {
            history: [
              {
                d: "03.03",
                n: 1,
              },
              {
                d: "03.04",
                n: 6,
              },
              {
                d: "03.05",
                n: 14,
              },
              {
                d: "03.06",
                n: 24,
              },
              {
                d: "03.07",
                n: 80,
              },
              {
                d: "03.08",
                n: 114,
              },
            ],
            increasing: [
              {
                d: "03.03",
                n: 1,
              },
              {
                d: "03.04",
                n: 2,
              },
              {
                d: "03.05",
                n: 3,
              },
              {
                d: "03.06",
                n: 8,
              },
              {
                d: "03.07",
                n: 18,
              },
              {
                d: "03.08",
                n: 54,
              },
            ],
          },
          sku: {
            history: [
              {
                d: "一月",
                n: 10,
              },
              {
                d: "二月",
                n: 17,
              },
              {
                d: "三月",
                n: 30,
              },
              {
                d: "四月",
                n: 67,
              },
              {
                d: "五月",
                n: 16,
              },
              {
                d: "六月",
                n: 7,
              },
            ],
            increasing: [
              {
                d: "一月",
                n: 17,
              },
              {
                d: "二月",
                n: 26,
              },
              {
                d: "三月",
                n: 40,
              },
              {
                d: "四月",
                n: 80,
              },
              {
                d: "五月",
                n: 39,
              },
              {
                d: "六月",
                n: 27,
              },
            ],
          },
        };
      } else {
        res = {
          spu: {
            history: [
              {
                d: "04.03",
                n: 1,
              },
              {
                d: "04.04",
                n: 6,
              },
              {
                d: "04.05",
                n: 145,
              },
              {
                d: "04.06",
                n: 246,
              },
              {
                d: "04.07",
                n: 80,
              },
              {
                d: "04.08",
                n: 114,
              },
            ],
            increasing: [
              {
                d: "04.03",
                n: 1,
              },
              {
                d: "04.04",
                n: 2,
              },
              {
                d: "04.05",
                n: 35,
              },
              {
                d: "04.06",
                n: 86,
              },
              {
                d: "04.07",
                n: 185,
              },
              {
                d: "04.08",
                n: 54,
              },
            ],
          },
          sku: {
            history: [
              {
                d: "一月",
                n: 10,
              },
              {
                d: "二月",
                n: 17,
              },
              {
                d: "三月",
                n: 30,
              },
              {
                d: "四月",
                n: 67,
              },
              {
                d: "五月",
                n: 16,
              },
              {
                d: "六月",
                n: 7,
              },
            ],
            increasing: [
              {
                d: "一月",
                n: 17,
              },
              {
                d: "二月",
                n: 26,
              },
              {
                d: "三月",
                n: 40,
              },
              {
                d: "四月",
                n: 80,
              },
              {
                d: "五月",
                n: 39,
              },
              {
                d: "六月",
                n: 27,
              },
            ],
          },
        };
      }

      const tabData = JSON.parse(JSON.stringify(tabDataT));
      for (let i = 0; i < tabData.length; i++) {
        // this.drawLin(res[tabData[i].key], tabData[i].key);
        if (res[tabData[i].key]) {
          const obj = {}, ctsArr=[], value = res[tabData[i].key];
          this.setDatas(value)
          for(const j in value) {
            obj[cts[j]] = value[j];
            ctsArr.push(cts[j])
          }
          const line1Data = {
            items: ctsArr,
            colorHash: []
          };
          const data = {
            data: [],
            styleData: line1Data,
            a: false,
            b: false,
            show: '累计'
          }
          console.log(obj, ctsArr)
          // let data = [];
          // for(const j in res[tabData[i].key]) {
          //   console.log(res[tabData[i].key][j], j)
          //   data.push()
          // }


          // const lineViewData = {
          //   items: res[tabData[i].key],
          //   colorHash: [],
          // };
          // new DrawLines(res[tabData[i].key] || [], lineViewData);
        }
      }
      // this.shopList[this.active].tabData = tabData;
      this.$set(this.supplier[this.active], "tabData", tabData || null);
    },
    async fetchDataLineF() {
      // const options1 = new DrawBar([])
      // console.log(options1.date)
      // const res = await statistics.trade.get({
      //   'shop_id': 10
      // })
      // console.log(res);
      let res;
      if (this.activeF === 0) {
        res = {
          brand: [
            {
              id: 1,
              name: "BURBERRY",
              value: 12,
              proportion: 0,
            },
            {
              id: 2,
              name: "GOLDEN GOOSE DELUXE BRAND",
              value: 41,
              proportion: 0,
            },
            {
              id: 4,
              name: "TORY BURCH",
              value: 33,
              proportion: 0,
            },
            {
              id: 2,
              name: "OFF-WHITE",
              value: 51,
              proportion: 0,
            },
          ],
          category: [
            {
              id: 1,
              name: "TORY BURCH",
              value: 122,
              proportion: 0,
            },
            {
              id: 2,
              name: "OFF-WHITE",
              value: 34,
              proportion: 0,
            },
          ],
          season: [
            {
              id: 1,
              name: "BURBERRY",
              value: 12,
              proportion: 0,
            },
            {
              id: 2,
              name: "GOLDEN GOOSE DELUXE BRAND",
              value: 42,
              proportion: 0,
            },
            {
              id: 4,
              name: "TORY BURCH",
              value: 32,
              proportion: 0,
            },
            {
              id: 2,
              name: "OFF-WHITE",
              value: 52,
              proportion: 0,
            },
          ],
        };
      } else if (this.activeF === 1) {
        res = {
          brand: [
            {
              id: 1,
              name: "",
              value: 122,
              proportion: 0,
            },
            {
              id: 2,
              name: "",
              value: 122,
              proportion: 0,
            },
          ],
          category: [
            {
              id: 1,
              name: "",
              value: 122,
              proportion: 0,
            },
            {
              id: 2,
              name: "",
              value: 122,
              proportion: 0,
            },
          ],
        };
      }

      const tabData = JSON.parse(JSON.stringify(tabDataF));
      for (let i = 0; i < tabData.length; i++) {
        tabData[i].options = new DrawBar(res[tabData[i].key] || []).date;
      }
      this.$set(this.supplierF[this.activeF], "tabData", tabData || null);
    },
    drawLin(dt, name) {
      console.log(dt, name);
      const colors = {};
      const zhouCts = [];
      for (const i in dt[0]) {
        if (i != "date" && i != "show") {
          zhouCts.push(i);
        }
      }
      zhouCts.map((d, i) => {
        colors[d] = this.colors[i];
      });
      const line1Data = {
        items: zhouCts,
        colorHash: colors,
      };
      // this.lineObj1.show = true;
      this[name] = {
        data: dt,
        styleData: line1Data,
        a: false,
        b: false,
        show: "累计",
      };
    },
    /* eslint-disable */
    setDatas(dt) {
      if (dt) {
        let that = this;
        return new Promise((resolve,reject) => {
          let dataHis = [];
          let dataIns = [];
          let obj = {}
          let obj_obj = {}
          let zhouLineDates = {}

          for (let i in dt) {
            console.log(i, that.cts)
            obj_obj[i] = {}
            let item = obj[i];
            // console.log(item);
            let timArr = false;
            let currentName = '';
            let cts = that.cts[i]
            let lineZhouItem = [];
            for (let n in item) {
              let d = item[n]
              // console.log(n,d)
              // cts.push(n)
              if (!timArr) {
                timArr = d[0].d;
                currentName = n;
              } else if(d[0].d < timArr) {
                timArr = d[0].d;
                currentName = n;
              }
              let dateObj = {}
              d.map(f => {
                dateObj[f.d] = f;
              })
              obj_obj[i][n] = dateObj
            }
            that.zhouDataObj = obj_obj;
            // console.log(obj_obj);
            item[currentName].map(d => {
              let lineDateObj = {}
              let _date = d.d;
              lineDateObj.date = _date;
              lineDateObj.show = true;
              cts.map(ctsItem => {
                // console.log(obj_obj[i][ctsItem][_date]);
                if (obj_obj[i][ctsItem][_date]) {
                  lineDateObj[ctsItem] = obj_obj[i][ctsItem][_date].n
                } else {
                  lineDateObj[ctsItem] = null;
                }
              });
              console.log(lineDateObj)
              // cts.push(lineDateObj);
              // console.log(lineDateObj);
              lineZhouItem.push(lineDateObj);
            })
            console.log(lineZhouItem);
          }
          
        })
      }
    },
    fetchTableData() {
      this.tabCardList.forEach((value, index) => {
        value.column = this["columns" + index];
        value.dataSource = this.supplierList;
      });
      const timer = setTimeout(() => {
        this.loading = false;
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(timer);
      });
    },
    showTips() {
      this.showInt = !this.showInt;
    },
    goDetail(record) {
      this.$router.push({
        name: "SupplierDetails",
        query: {
          'supplier_id': 1009,
          'supplier_name': record.name,
        },
      });
    },
  },
  computed: {
    tabClass() {
      return this.supplier.length <= 3 ? "tab-limit" : "";
    },
    supplier() {
      return JSON.parse(JSON.stringify(store.supplierList)) || [];
    },
    supplierF() {
      return JSON.parse(JSON.stringify(store.supplierList)) || [];
    },
  },
};
</script>