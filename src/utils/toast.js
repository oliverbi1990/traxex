/**
 * 页面Toast
 */
import './toast.less'
import $ from 'zepto'

var Toast = function (opts) {
  if (typeof opts === 'string') {
    opts = {
      message: opts
    }
  }

  opts.duration = opts.duration || 2000

  var $body = $('body')
  var $toast = $('<div class="toast-wrap toast-fadein">' + opts.message + '</div>')

  $body.append($toast)

  setTimeout(function () {
    $toast.removeClass('toast-fadein').addClass('toast-fadeout')

    setTimeout(function () {
      $toast.remove()
    }, 3000)
  }, opts.duration)
}

export default Toast
