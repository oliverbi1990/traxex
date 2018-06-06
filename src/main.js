import './main.less'

import './lib/flexible.js'
import $ from 'zepto'

import Swiper from 'swiper'
import global from './module/global'

import './module/form'
import './module/submit'

// 初始化swiper
global.swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  loop: false
})

// 显示页面
$('.swiper-container').css('visibility', 'visible')
$('.loading-container').remove()
