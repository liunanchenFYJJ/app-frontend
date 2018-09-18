'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"//192.168.0.119:8080/power/"' // 开发接口
  API_ROOT: '"//power.szunipower.com.cn/"' // 开发接口
})
