import './result.less'

import $ from 'zepto'
import qrCode from './assets/qr-code.png'
import defaultPoster from './assets/default-poster.png'

let userName = 'ALLEN'
let userHeartRate = 80

let colorCName = '松石绿'
let colorEName = '15-5519<br/>Turquoise'
let colorId = '#6CB9B2'
let colorWriting = '迷人共振的色调<br/>是大胆而精致的<br/>透漏着你的外向<br/>自信和富有感染力的气质'
let colorBgUrl = defaultPoster

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

// 设置二维码
$('.qrcode-pic').attr('src', qrCode)

// 显示页面
setTimeout(() => {
  $('.result-container').css('visibility', 'visible').addClass('fadeIn')
  $('.loading-container').remove()
}, 500)
