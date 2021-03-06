// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    "eol-last": 0,
    "comma-dangle": [2, "never"], //最后不加逗号
    "max-len": 0, //忽略每行最大长度
    "arrow-body-style": ["error", "always"], // 箭头函数强制使用大括号
    "camelcase": 0, // 忽略驼峰命名
    "func-names": ["error", "never"], // 允许匿名函数
    "no-console": 0, // 允许console.log,开发完成要去掉
    // "arrow-body-style": ["error", "never"],
    // "no-param-reassign": ["error", { "props": false }], // 可以操作先参数属性
    // "no-param-reassign": 0, // 允许给参数重新赋值
    // "consistent-return": 0, //忽略每个判断分支都要有return
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    'linebreak-style': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

