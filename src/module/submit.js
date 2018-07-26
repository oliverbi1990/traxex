import $ from 'zepto'
import global from './global'

import Toast from '../utils/toast'
import Device from '../utils/device'
import Ajax from './ajax'

function hideAlertDialog () {
  $('.dialog-wrapper .dialog-mask').removeClass('fadeIn').addClass('fadeOut')
  $('.dialog-wrapper .dialog-container').removeClass('fadeInUp').addClass('fadeOutDown')
  setTimeout(function () {
    $('.dialog-wrapper').removeClass('active')
  }, 200)
}

function showResultPage () {
  if (global.swiper) {
    global.swiper.allowTouchMove = false
  }

  let time = 10
  let closeInterval = setInterval(function () {
    if (time > 0) {
      time--
      $('.result-bottom__content').text(`关闭(${time}s)`)
    } else {
      clearInterval(closeInterval)
      $('.result-bottom').click()
    }
  }, 1000)

  $('.result-wrapper').addClass('active fadeInUp')

  $('.result-bottom').on('click', function () {
    clearInterval(closeInterval)
    /* eslint-disable */
    Device.WX() && WeixinJSBridge && WeixinJSBridge.call('closeWindow')
    /* eslint-enable */
  })
}

let closeInterval = null
let tmplMap = [
  `
  <div class="dialog-mask fadeIn"></div>
  <div class="dialog-container fadeInUp">
    <div class="dialog-avatar"></div>
    <div class="dialog-content dialog-content--exchange">
      <p>剩余游戏次数不足，请用互动积分兑换</p>
      <p>剩余互动积分: </p>
      <div class="dialog-icon dialog-icon--heart"></div>
      <p class="time-tip">游戏次数+1</p>
    </div>
    <div class="dialog-bottom">
      <button class="dialog-button dialog-button--cancel">取消</button><button class="dialog-button dialog-button--exchange">兑换(-100互动积分)</button>
    </div>
  </div>
  `,
  `
  <div class="dialog-mask fadeIn"></div>
  <div class="dialog-container fadeInUp">
    <div class="dialog-avatar"></div>
    <div class="dialog-content">
      <div class="dialog-icon dialog-icon--smile"></div>
      <p>兑换成功</p>
      <p>剩余互动积分: $$$score$$$</p>
    </div>
    <div class="dialog-bottom">
      <button class="dialog-button dialog-button--close">关闭(3s)</button>
    </div>
  </div>
  `,
  `
  <div class="dialog-mask fadeIn"></div>
  <div class="dialog-container fadeInUp">
    <div class="dialog-avatar"></div>
    <div class="dialog-content">
      <div class="dialog-icon dialog-icon--cry"></div>
      <p>剩余互动积分: $$$score$$$</p>
      <p>分享个人作品海报可得积分</p>
    </div>
    <div class="dialog-bottom">
      <button class="dialog-button dialog-button--close">关闭</button>
    </div>
  </div>
  `
]

$('#confirm-button').on('click', function (event) {
  let name = ''
  let gender = ''
  let age = ''

  name = $('.form-item-name input').val()
  if (name.length === 0) {
    Toast('请输入姓名')
    return
  }

  gender = $('.form-item-gender .form-item__select-item--select').data('value')
  age = $('.form-item-age .form-item__select-item--select').data('value')

  Ajax.start({
    nickname: name,
    age: age,
    sex: gender === 'male' ? '男' : '女'
  }, function (data) {
    if (data.code === 1000) {
      Toast('正在游戏，无法开始')
    } else if (data.code === 2000) {
      showResultPage()
    } else if (data.code === 3000) {
      $('.dialog-wrapper').html(tmplMap[0]).addClass('active')
    }
  })
})

$('.dialog-wrapper').on('click', '.dialog-button--exchange', function () {
  Ajax.addHp({}, function (data) {
    let tmpl = ''
    if (data.code === 1000) {
      tmpl = tmplMap[1].replace(/\$\$\$score\$\$\$/, data.msg.score)
    } else if (data.code === 2000) {
      tmpl = tmplMap[2].replace(/\$\$\$score\$\$\$/, data.msg.score)
    }
    $('.dialog-wrapper').html(tmpl).addClass('active')

    let time = 3
    if (closeInterval) {
      clearInterval(closeInterval)
      closeInterval = null
    }

    closeInterval = setInterval(function () {
      if (time > 0) {
        time--
        $('.dialog-wrapper .dialog-button--close').text(`关闭(${time}s)`)
      } else {
        clearInterval(closeInterval)
        $('.dialog-wrapper .dialog-button--close').click()
      }
    }, 1000)
  })
})

$('.dialog-wrapper').on('click', '.dialog-button--close', function () {
  hideAlertDialog()
  if (closeInterval) {
    clearInterval(closeInterval)
    closeInterval = null
  }
})

$('.dialog-wrapper').on('click', '.dialog-button--cancel', function () {
  hideAlertDialog()
})
