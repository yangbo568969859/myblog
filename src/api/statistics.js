import axios from './fetch-api';

export default {
  trade: {
    get: params => axios.get('statistics-trade.trade.get', {params}),
    line: {
      report: {
        get: params => axios.get('statistics-trade.trade.line.report.get', { params })
      }
    },
    report: {
      get: params => axios.get('statistics-trade.trade.report.get', { params })
    }
  },
  purchase: {
    get: params => axios.get('statistics-trade.purchase.get', {params}),
    line: {
      report: {
        get: params => axios.get('statistics-trade.purchase.line.report.get', { params })
      }
    },
    report: {
      get: params => axios.get('statistics-trade.purchase.report.get', { params })
    }
  },
  shop: {
    local: {
      order:{
        get: params => axios.get('statistics-trade.shop.local.order.get', { params })
      }
    }
  }
}