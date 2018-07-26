import $ from 'zepto'
import global from './global'

import Toast from '../utils/toast'

function ajax (params = {}, config) {
  params = Object.assign({}, params, { code: global.code, openid: global.openid })
  $.ajax({
    type: config.method,
    url: `http://${global.baseUrl}:${global.port}/${config.url}`,
    data: params,
    success: function (data) {
      config.success && config.success(data)
    },
    error: function (xhr, type) {
      Toast('出错了, 请重试')
    }
  })
}

export default {
  login: function (params = {}, callback) {
    ajax(params, {
      url: 'login/index/userInfo',
      method: 'POST',
      success: function (data) {
        try {
          data = JSON.parse(data)
          if (data.code === 1000) {
            callback && callback(data)
          } else {
            Toast('出错了, 请重试')
          }
        } catch (err) {
          Toast('出错了, 请重试')
        }
      }
    })
  },

  start: function (params = {}, callback) {
    ajax(params, {
      url: 'login/index/startGame',
      method: 'POST',
      success: function (data) {
        try {
          data = JSON.parse(data)
          if ($.inArray(data.code, [1000, 2000, 3000]) !== -1) {
            callback && callback(data)
          } else {
            Toast('出错了, 请重试')
          }
        } catch (err) {
          Toast('出错了, 请重试')
        }
      }
    })
  },

  addHp: function (params = {}, callback) {
    ajax(params, {
      url: 'login/index/addHp',
      method: 'POST',
      success: function (data) {
        try {
          data = JSON.parse(data)
          if ($.inArray(data.code, [1000, 2000]) !== -1) {
            callback && callback(data)
          } else {
            Toast('出错了, 请重试')
          }
        } catch (err) {
          Toast('出错了, 请重试')
        }
      }
    })
  },

  upPost: function (params = {}, callback) {
    ajax(params, {
      url: 'login/index/upPost',
      method: 'POST',
      success: function (data) {
        try {
          data = JSON.parse(data)
          if ($.inArray(data.code, [1000, 2000]) !== -1) {
            callback && callback(data)
          } else {
            Toast('出错了, 请重试')
          }
        } catch (err) {
          Toast('出错了, 请重试')
        }
      }
    })
  }

  // hpinfo: function (params = {}, callback) {
  //   ajax(params, {
  //     url: 'hpinfo',
  //     method: 'POST',
  //     success: function (data) {
  //       if (data.ret === -1000) {
  //         Toast(data.msg)
  //       } else {
  //         callback && callback(data)
  //       }
  //     }
  //   })
  // },

  // gameinfo: function (params = {}, callback) {
  //   ajax(params, {
  //     url: 'gameinfo',
  //     method: 'POST',
  //     success: function (data) {
  //       if (data.ret === -1000 &&
  //         data.ret === -1001 &&
  //         data.ret === -1002 &&
  //         data.ret === -1000) {
  //         Toast(data.msg)
  //       } else {
  //         callback && callback(data)
  //       }
  //     }
  //   })
  // }
}
