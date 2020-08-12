import axios from './fetch-api';

export default {
  list: {
    get: params => axios.get('shop.list.get', {params}),
  },
  search: {
    page: params => axios.get('shop.search.page', {params}),
  },
  by: {
    org: {
      page: params => axios.get('shop.by.org.page', {params})
    }
  }
}