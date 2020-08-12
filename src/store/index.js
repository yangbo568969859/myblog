import Vue from 'vue';
import { shop } from '@/api';

export const store = Vue.observable({
  userInfo: {},
  roleIds: [],
  shopList: [],
  supplierList: [],
  isMobile: true
})

export const mutations = {
  setUserInfo(userInfo) {
    store.userInfo = userInfo;
  },
  setRoleIds(roleIds) {
    store.roleIds = roleIds;
  },
  setMobile(mobile) {
    store.isMobile = mobile;
  },
  SET_SHOP(value) {
    store.shopList = value
  },
  SET_SUPPLIER(value) {
    store.supplierList = value
  }
}

export const actions = {
  async SetShopList() {
    if (!store.shopList.length) {
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
        const data = res.data.map(value => {
          return {...value, tabData: null}
        })
        mutations.SET_SHOP(data)
      }
    }
  },
  async SetSupplierList() {
    if (!store.supplierList.length) {
      const value = [
        {
          'company_name': "全部供应商",
          'create_time': "2020-06-22  10:20:40",
          'shop_id': 1,
          'shop_name': "全部供应商",
          'shop_type': 4,
          'status': 1,
          'support_platform': "京东,考拉",
          'support_platform_num': "2,12",
        },
        {
          'company_name': "Eraldo",
          'create_time': "2020-06-22  10:20:40",
          'shop_id': 71,
          'shop_name': "Eraldo",
          'shop_type': 4,
          'status': 1,
          'support_platform': "京东,考拉",
          'support_platform_num': "2,12",
        },
        {
          'company_name': "theclutcher",
          'create_time': "2020-04-08  10:52:00",
          'shop_id': 68,
          'shop_name': "thecluther",
          'shop_type': 4,
          'status': 1,
          'support_platform': "京东,考拉",
          'support_platform_num': "2,12",
        },
        {
          'company_name': "BRG",
          'create_time': "2019-10-21  11:09:59",
          'shop_id': 52,
          'shop_name': "BRG",
          'shop_type': 4,
          'status': 1,
          'support_platform': "京东,考拉",
          'support_platform_num': "2,12",
        }
      ]
      mutations.SET_SUPPLIER(value)
      // const res = await shop.by.org.page({
      //   'org_id': 35,
      // });
      // if (res.success === true && res.data.length) {
      //   mutations.SET_SHOP(res.data)
      // }
    }
  },
}