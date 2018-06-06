import $ from 'zepto'
import global from './global'
import Device from '../utils/device'

function selectItem (event, valueMap) {
  let $target = $(event.target)
  let $siblings = $target.siblings()
  let $slider = $target.parent().find('.form-item__select-slider')
  let value = $target.data('value')
  $siblings.removeClass('form-item__select-item--select')
  $target.addClass('form-item__select-item--select')
  $slider.css('left', valueMap[value])
}

$('.form-item-name input').on('focus', function () {
  if (global.swiper) {
    global.swiper.allowTouchMove = false
  }
})

$('.form-item-name input').on('blur', function () {
  if (global.swiper) {
    global.swiper.allowTouchMove = true
  }
  // IOS键盘问题
  if (Device.iOS()) {
    setTimeout(function () {
      document.body.scrollTop = 0
    }, 200)
  }
})

$('.form-item-gender .form-item__select-item').on('click', function (event) {
  let valueMap = {
    'male': '0',
    'female': '50%'
  }
  selectItem(event, valueMap)
})

$('.form-item-age .form-item__select-item').on('click', function (event) {
  let valueMap = {
    '2000': '0',
    '1990': '25%',
    '1980': '50%',
    '1970': '75%'
  }
  selectItem(event, valueMap)
})
