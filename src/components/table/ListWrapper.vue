<template>
  <div class="list-wrapper">
    <div class="up-tips tips-data">
      <span class="title">供应商最新商品数据</span>
    </div>
    <span class="tips">7:00-10:00为更新高峰，数据如有滞后请谅解。</span>
    <div class="listWraper">
      <table>
        <thead>
          <tr>
            <th class="area">
              <span>供应商</span>
            </th>
            <th>新增商品</th>
            <th>现有商品</th>
            <th>库存</th>
            <th>货值</th>
            <th>查看</th>
          </tr>
        </thead>
      </table>
      <table>
        <tbody v-for="(value, index) in supplierList" :key="index">
          <tr>
            <th class="area">
              <p><span>{{value.name}}</span></p>
              <p></p>
            </th>
            <td>
              <p class="bold">{{value.add}}</p>
              <p>较昨日+3</p>
            </td>
            <td>
              <p class="bold">{{value.now}}</p>
              <p></p>
            </td>
            <td>
              <p class="bold">{{value.quantity}}</p>
              <p></p>
            </td>
            <td>
              <p class="bold">{{value.worth}}</p>
              <p></p>
            </td>
            <td class="detail">
              <p @click="goDetail">详情</p>
              <p></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supplierList: [
        {
          name: "Ridi",
          add: "134",
          now: "12122",
          quantity: "2090",
          worth: "12121"
        },
        {
          name: "Brg",
          add: "45",
          now: "23211",
          quantity: "1223",
          worth: "343211"
        },
        {
          name: "Theclutcher",
          add: "333",
          now: "23234",
          quantity: "44443",
          worth: "23343"
        }
      ]
    };
  },
  methods: {
    goDetail() {
      this.$router.push({
        name: 'SupplierData',
        query: {
          'supplier_id': 1009
        }
      })
    }
  }
};
</script>

<style lang="scss">
@import './table.scss';
</style>