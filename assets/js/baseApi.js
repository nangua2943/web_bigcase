// 每次发起ajax请求时，会先调用这个函数，拼接请求路径
$.ajaxPrefilter (function(options) {
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
})