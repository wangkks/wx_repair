var barcode = require('./barcode.js');
var qrcode = require('./qrcode.js');

function convert_length(length) {
  return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function barc(id, code, width, height, that) {
  barcode.code128(wx.createCanvasContext(id, that), code, convert_length(width), convert_length(height))
}

function qrc(id, code, width, height, that) {
  qrcode.api.draw(code, {ctx: wx.createCanvasContext(id, that),width: convert_length(width),height: convert_length(height)
  })
}

module.exports = {
  barcode: barc,
  qrcode: qrc,
}