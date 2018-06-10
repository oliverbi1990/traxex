import $ from 'zepto'
import global from './global'

import Toast from '../utils/toast'

function ajax (params = {}, config) {
  params = Object.assign({}, params, { ver: global.ver, lang: global.lang, wxId: global.wxId })
  $.ajax({
    type: config.method,
    url: `${global.baseUrl}:${global.port}/${config.url}`,
    data: params,
    success: function (data) {
      config.success && config.success(data)
    },
    error: function (xhr, type) {
      Toast('出错了')
    }
  })
}

export default {
  start: function (params = {}, callback) {
    ajax(params, {
      url: 'start',
      method: 'POST',
      success: function (data) {
        if (data.ret === -1000 || data.ret === -1001) {
          Toast(data.msg)
        } else {
          callback && callback(data)
        }
      }
    })
  },

  hpinfo: function (params = {}, callback) {
    ajax(params, {
      url: 'hpinfo',
      method: 'POST',
      success: function (data) {
        if (data.ret === -1000) {
          Toast(data.msg)
        } else {
          callback && callback(data)
        }
      }
    })
  },

  gameinfo: function (params = {}, callback) {
    ajax(params, {
      url: 'gameinfo',
      method: 'POST',
      success: function (data) {
        if (data.ret === -1000 &&
          data.ret === -1001 &&
          data.ret === -1002 &&
          data.ret === -1000) {
          Toast(data.msg)
        } else {
          callback && callback(data)
        }
      }
    })
  },

  addHp: function (params = {}, callback) {
    ajax(params, {
      url: 'addHp',
      method: 'POST',
      success: function (data) {
        if (data.ret === -1000) {
          Toast(data.msg)
        } else {
          callback && callback(data)
        }
      }
    })
  }
}
