const fs = require('fs')

// 复制vant组件到wxcomponents目录
fs.cp('./node_modules/@vant', './src/wxcomponents/@vant', {
  recursive: true,
  dereference: true,
}, (err) => {
  if (err) console.error(err)
})
