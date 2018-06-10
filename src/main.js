import './main.less'

import $ from 'zepto'

import Swiper from 'swiper'
import global from './module/global'

import './module/form'
import './module/submit'

const firstPage = 0
const secondPage = 1

// 初始化swiper
global.swiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  loop: false,
  speed: 1500,
  parallax: true,
  followFinger: false,
  on: {
    slideChangeTransitionStart: function () {
      if (global.swiper.realIndex === secondPage) {
        $('.first-step').removeClass('first-step--end').addClass('first-step--start')
        $('.second-step').addClass('second-step--start').removeClass('second-step--end')
      } else if (global.swiper.realIndex === firstPage) {
        $('.first-step').removeClass('first-step--start').addClass('first-step--end')
        $('.second-step').addClass('second-step--start').removeClass('second-step--end')
      }
    },
    slideChangeTransitionEnd: function () {
    }
  }
})

// 显示页面
setTimeout(() => {
  $('.swiper-container').css('visibility', 'visible').addClass('fadeIn')
  $('.loading-container').remove()
}, 500)
