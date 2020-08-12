<template>
  <div>
    <van-nav-bar
      title="京东爱琴海购店铺"
      left-arrow
      @click-left="onClickLeft"
    />
    <global-header
      title="订单最新数据"
      subTitle="实时展示"
    >
      <div class="page-tab">
        <p v-for="(value) in selectTabs" :key="value.key" :class="[selectTab === value.key ? 'current':'']" @click="tabClick(value.key)">{{value.name}}</p>
      </div>
      <recent-number v-if="selectTab=='all'" :headerData="headerData" title="截止2020-04-22  12:00" :borderTop="true">
        <template v-slot:tips>
          <span @click="showInt =! showInt"><icon-svg class="icon-13" icon-class="help"></icon-svg>介绍</span>
        </template>
      </recent-number>
      <recent-number v-else :headerData="headerData1" title="截止2020-04-22  12:00" :borderTop="true">
        <template v-slot:tips>
          <span @click="showInt =! showInt"><icon-svg class="icon-13" icon-class="help"></icon-svg>介绍</span>
        </template>
      </recent-number>
      <title-num time="数据来源：中台每日公开数据"></title-num>
      <div class="pdBottom"></div>
    </global-header>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      headerData1: [
        {
          name: "分销订单总数",
          total: "189",
          change: "12"
        },
        {
          name: "总销量",
          total: "12",
          change: "0"
        },
        {
          name: "销售金额",
          total: "33",
          change: "0"
        },
        {
          name: "交易成功",
          total: "189",
          change: "13"
        },
        {
          name: "交易关闭",
          total: "236",
          change: "30"
        },
        {
          name: "毛利1",
          total: "¥124354.3",
          change: "0"
        },
        {
          name: "毛利2",
          total: "¥124354.3",
          change: "¥10"
        },
        {
          name: "订单成功率",
          total: "90.5%",
          change: "0.5%"
        },
        {
          name: "订单失败率",
          total: "9.5%",
          change: "0.5%"
        },
      ],
      headerData: [
        {
          name: "分销订单",
          total: "189",
          change: "12"
        },
        {
          name: "待发货",
          total: "12",
          change: "0"
        },
        {
          name: "销量",
          total: "33",
          change: "0"
        },
        {
          name: "销售金额",
          total: "¥24354.3",
          change: "¥1210"
        },
        {
          name: "交易成功",
          total: "236",
          change: "30"
        },
        {
          name: "交易关闭",
          total: "45",
          change: "6"
        },
        {
          name: "毛利1",
          total: "¥124354.3",
          change: "¥10"
        },
        {
          name: "毛利2",
          total: "¥4354.3",
          change: "¥5"
        },
      ],
      active: 0,
      tabList: [
        {
          title: '分销订单',
          id: 1
        },
      ],
    }
  },
  // created() {},
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log('初始化数据')
    },
    tabClick(value) {
      this.selectTab = value;
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