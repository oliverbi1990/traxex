/**
 * 设备判断
 */
export default {
  iOS: function () {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
  },
  Android: function () {
    return /Android/i.test(navigator.userAgent)
  },
  WX: function () {
    return /MicroMessenger/i.test(navigator.userAgent)
  }
}
