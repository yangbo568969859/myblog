import App from '../api/log.js';
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout.vue'

const OrderData = () => import(/* webpackChunkName: "SupplierData" */ '../views/order/OrderData.vue')
const OrderDetails = () => import(/* webpackChunkName: "SupplierData" */ '../views/order/OrderDetails.vue')
const ProductData = () => import(/* webpackChunkName: "SupplierData" */ '../views/product/ProductData.vue')
const SupplierData = () => import(/* webpackChunkName: "SupplierData" */ '../views/supplier/SupplierData.vue')
const SupplierDetails = () => import(/* webpackChunkName: "SupplierData" */ '../views/supplier/SupplierDetails.vue')
const ShopitemData = () => import(/* webpackChunkName: "SupplierData" */ '../views/shopItem/ShopitemData.vue')
const PurchaseData = () => import(/* webpackChunkName: "SupplierData" */ '../views/purchase/PurchaseData.vue')
const SettleData = () => import(/* webpackChunkName: "SupplierData" */ '../views/settle/SettleData.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        component: OrderData,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/supplier-data',
        name: 'SupplierData',
        component: SupplierData,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/product-data',
        name: 'ProductData',
        component: ProductData,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/shopitem-data',
        name: 'ShopItemData',
        component: ShopitemData,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/order-data',
        name: 'OrderData',
        component: OrderData,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/purchase-data',
        name: 'PurchaseData',
        component: PurchaseData,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/settle-data',
        name: 'SettleData',
        component: SettleData,
        meta: {
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/supplier-details',
    name: 'SupplierDetails',
    component: SupplierDetails,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/order-details',
    name: 'OrderDetails',
    component: OrderDetails,
    meta: {
      keepAlive: false
    }
  },
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name !== from.name) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0}
      }
    }
  }
})
router.beforeEach((to, from, next) => {
  App.logEvent({
    type: 'visit',
    name: to.name,
    time: new Date().valueOf(),
    params: {
      from: {
        name: from.name,
        path: from.path,
        query: from.query
      },
      to: {
        name: to.name,
        path: to.path,
        query: to.query
      }
    }
  })
  next();
})

export default router
