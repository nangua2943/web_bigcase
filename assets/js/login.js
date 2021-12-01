$(function () {
  // 点击“去注册帐号”的链接
  $('#link-reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  });

  // 点击去登陆帐号的链接
  $('#link-login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  });

  // 从layui中获取form对象
  var form = layui.form; // 只要导入layui就能使用layui对象
  var layer = layui.layer;
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中内容
      var pwd = $('.reg-box [name=password]').val();
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  });

  // 监听注册表单提交事件
  $('#form-reg').on('submit', function (e) {
    // 阻止表单默认提交事件
    e.preventDefault();
    var data = {
      username: $('#form-reg[name="username"]').val(),
      password: $('#form-reg[name="password"]').val()
    };
    // 发起ajax 的 post请求
    $.post('/api/reguser', data, function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      };
      layer.msg('注册成功，请登录');
      // 手动调用点击
      $('#link-login').click();
    })
  });

  // 监听登录表单的提交事件
  $('#form-login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单数据
      data: $(this).serialize(),
      success: function (e) {
        if (res.status !== 0) {
          return layer.msg('登录失败');
        }
        layer.msg('登录成功');
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token);
        // 跳转到后台主页
        location.href = 'index.html';
      }
    })
  })
})