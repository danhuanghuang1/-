$('#link_reg').on('click', function () {
  $('.login-box').hide()
  $('.reg-box').show()
})
$('#link_login').on('click', function () {
  $('.reg-box').hide()
  $('.login-box').show()
})
const form = layui.form
// 获取 layui 弹窗
const layer = layui.layer
// 设置请求根路径
form.verify({
  repass: (value) => {
    const pwd = $('.reg-box [name=password]').val()
    if (pwd !== value) return '两次密码不一致'
  },
  pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
})

$('#form_reg').on('submit', function (e) {
  e.preventDefault()
  const data = $(this).serialize()
  $.ajax({
    type: 'POST',
    url:'/api/reguser',
    data,
    success: (res) => {
      const { message, status } = res
      if (status !== 0) return layer.msg(message)
      layer.msg('注册成功！')
      // 注册成功后跳转到登录界面
      $('#link_login').click()
    },
  })
})
// 监听登录表单，发送登录请求
// 监听登录表单，发送登录请求
$('#form_login').submit((e) => {
  e.preventDefault()
  $.ajax({
    type: 'POST',
    url:'/api/login',
    data: $('#form_login').serialize(),
    success: (res) => {
      console.log(res);
      const { message, status, token } = res
      if (status !== 0) return layer.msg(message)
      layer.msg('登录成功！')
      // 将登录成功得到的 token 字符串，保存到 localStorage 中
      localStorage.setItem('token', token)
      // 跳转到主页
      location.href = '/index.html'
    },
  })
})
