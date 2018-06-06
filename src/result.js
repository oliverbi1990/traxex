import './result.less'

import './lib/flexible.js'
import $ from 'zepto'
import qrCode from './assets/qr-code.png'
import poster from './assets/default-poster.png'

let userName = 'ALLEN'
let zhName = '松石绿'
let enName = '15-5519<br/>Turquoise'

let colorId = '#6CB9B2'
let colorWriting = '迷人共振的色调<br/>是大胆而精致的<br/>透漏着你的外向<br/>自信和富有感染力的气质'
let imageUrl = poster

let heartRate = 80

// set poster bg
$('.result-poster').css('backgroundImage', 'url(' + imageUrl + ')')
// set poster name
$('.poster-name').html(userName)
// set poster paragraph
$('.poster-paragraph').html(colorWriting)

// set heart rate
$('.heart-rate__num').html(heartRate)

// set color name
$('.card-info .card-info-cname').html(zhName)
$('.card-info .card-info-ename').html(enName)

// set color info
$('.result-pantone__card').css('borderColor', colorId)
$('.result-pantone__card .card-color').css('backgroundColor', colorId)
$('.result-pantone__card .card-info').css('color', colorId)

// set qrcode pic
$('.result-qrcode__pic').attr('src', qrCode)

// show page
$('.result-wrapper').css('visibility', 'visible')
