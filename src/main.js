import './main.less'

import $ from 'zepto'

import Swiper from 'swiper'
import global from './module/global'

import Ajax from './module/ajax'
import './module/form'
import './module/submit'

import Tool from './utils/tool'

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

// 获取用户信息
global.openid = Tool.queryUrl('openid')
global.code = Tool.queryUrl('code')

if (global.openid && global.code) {
  Ajax.login({}, function (data) {
    $('.user-avatar img').attr('src', data.msg.headimgurl)
    $('.user-info').html('当日剩余游戏次数<br/>&hearts;X' + data.msg.life)
    $('.user-container').show()
  })
}
