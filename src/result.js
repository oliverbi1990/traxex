import './result.less'

import $ from 'zepto'
import qrCode from './assets/qr-code.png'
import defaultPoster from './assets/default-poster.png'

import global from './module/global'
import Ajax from './module/ajax'
import Toast from './utils/toast'
import Tool from './utils/tool'

let userName = 'ALLEN'
let userHeartRate = 80

let colorCName = '松石绿'
let colorEName = '15-5519<br/>Turquoise'
let colorId = '#6CB9B2'
let colorWriting = '迷人共振的色调<br/>是大胆而精致的<br/>透漏着你的外向<br/>自信和富有感染力的气质'
let colorBgUrl = defaultPoster

function render (data) {
  userHeartRate = data.msg.heart
  colorCName = data.msg.colorName
  colorEName = data.msg.ptsh + '<br/>' + data.msg.ywa
  colorId = data.msg.ys
  colorWriting = data.msg.wa
  colorBgUrl = data.msg.bgurl

  // 设置用户名
  $('.poster-name').text(userName)
  // 设置用户心率
  $('.heart-rate__num').text(userHeartRate)
  // 设置用户颜色描述
  $('.poster-paragraph').html(colorWriting)
  // 设置用户颜色背景图
  $('.poster-wrapper').css('backgroundImage', 'url(' + colorBgUrl + ')')

  // 设置色卡中文和英文名
  $('.card-info__cname').html(colorCName)
  $('.card-info__ename').html(colorEName)

  // 设置色卡颜色值
  $('.pantone-card').css('borderColor', colorId)
  $('.pantone-card .card-color').css('backgroundColor', colorId)
  $('.pantone-card .card-info').css('color', colorId)

  // 判断背景图是否加载完成
  let colorBgImg = new Image()
  colorBgImg.src = colorBgUrl
  colorBgImg.onload = function () {
    $('.result-container').css('visibility', 'visible').addClass('fadeIn')
    $('.loading-container').remove()
  }
}

// 设置二维码
$('.qrcode-pic').attr('src', qrCode)

// 获取用户信息
global.openid = Tool.queryUrl('openid')
global.code = Tool.queryUrl('code')

if (global.openid && global.code) {
  Ajax.login({}, function (data) {
    userName = data.msg.nickname || ''
    userName = userName.toUpperCase()
    Ajax.upPost({}, function (data) {
      if (data.code === 1000) {
        render(data)
      } else if (data.code === 2000) {
        Toast('暂无游戏信息')
      }
    })
  })
}
