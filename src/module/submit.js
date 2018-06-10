import $ from 'zepto'
import global from './global'

import Toast from '../utils/toast'
import Device from '../utils/device'

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

  // TODO: ajax请求保存
  console.log(name)
  console.log(gender)
  console.log(age)

  let type = 0 // 1-兑换成功 2-缺少游戏次数，可用积分兑换 3-缺少积分
  let score = 200
  let tmplMap = [
    ``,
    `
    <div class="dialog-mask fadeIn"></div>
    <div class="dialog-container fadeInUp">
      <div class="dialog-avatar"></div>
      <div class="dialog-content">
        <div class="dialog-icon dialog-icon--smile"></div>
        <p>兑换成功</p>
        <p>剩余互动积分: ${score}</p>
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
      <div class="dialog-content dialog-content--exchange">
        <p>剩余游戏次数不足，请用互动积分兑换</p>
        <p>剩余互动积分: ${score}</p>
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
        <div class="dialog-icon dialog-icon--cry"></div>
        <p>剩余互动积分: ${score}</p>
        <p>分享个人作品海报可得积分</p>
      </div>
      <div class="dialog-bottom">
        <button class="dialog-button dialog-button--close">关闭</button>
      </div>
    </div>
    `
  ]

  if (type !== 0) {
    $('.dialog-wrapper').html(tmplMap[type]).addClass('active')

    let closeInterval = null
    let time = 3
    if (type === 1 || type === 3) {
      closeInterval = setInterval(function () {
        if (time > 0) {
          time--
          $('.dialog-wrapper .dialog-button--close').text(`关闭(${time}s)`)
        } else {
          clearInterval(closeInterval)
          $('.dialog-wrapper .dialog-button--close').click()
        }
      }, 1000)
    }

    $('.dialog-wrapper').on('click', '.dialog-button--cancel', function () {
      hideAlertDialog()
    })

    $('.dialog-wrapper').on('click', '.dialog-button--close', function () {
      hideAlertDialog()
      clearInterval(closeInterval)
    })
  } else {
    showResultPage()
  }
})
