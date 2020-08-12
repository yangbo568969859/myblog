import axios from 'axios'
import { Toast } from 'vant';

const conf = {
  timeout: 10000
};

const instance = axios.create(conf)
let url = ''
if (process.env.VUE_APP_API_ENV === 'dev-production') {
  url = `/pro`
} else if (process.env.VUE_APP_API_ENV === 'production') {
  url = `http://open.api.scm.aqsea.com`
} else if (process.env.VUE_APP_API_ENV === 'dev-staging') {
  url = `/dev`
} else if (process.env.VUE_APP_API_ENV === 'staging') {
  url = `http://119.3.61.254:9988`
} else {
  url = `http://119.3.61.254:9988`
}

instance.interceptors.request.use(async config => {
  // config.url = url+'/'+config.url
  config.url = url + '/router/rest?method=aqsea.' + config.url
  config.params = {
    v: 'v1',
    ...config.params
  }

  config.headers['Content-Type'] = 'application/json; charset=UTF-8'

  return config
})

instance.interceptors.response.use(res => {
  if (res.data.data) {
    if (res.data.data.is_success === false) {
      Toast.fail(res.data.data.msg || res.data.data.message);
    }
  }else if (res.data.result) {
    if (res.data.result.is_success === false) {
      Toast.fail(res.data.result.sub_msg);
    }
  }
  return res.data
}, err => {
  if (!err.response) {
    Toast.fail(err.message.indexOf('timeout') != -1 ? "服务器响应超时" : "请求被终止")
    return err
  }
  const link = err.response.request.responseURL.match(/aqsea\.([^?&]+)/)
  if (link) {
    console.log('接口' + link[1] + '的status为' + err.response.status)
  }
  if (err.response.status === 403 || err.response.status === 401) {
    Toast.fail(err.response.status+ ': 未授权')
  }
  if (err.response.status === 504) {
    Toast.fail(err.response.status+ ': 请求超时')
  }
  if (err.response.status === 404) {
    Toast.fail(err.response.status+ ': 数据获取失败')
  }
  if (err.response.status === 500) {
    Toast.fail(err.response.statusText)
  }

  return Promise.reject(err)
})

export default instance;