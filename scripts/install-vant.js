const fs = require('fs/promises')
const path = require('path')

const vantDir = path.join(process.env.INIT_CWD, './node_modules/@vant/weapp/dist')
const targetDir = path.join(process.env.INIT_CWD, './src/wxcomponents/vant')

async function setup() {
  // 清空目录
  await fs.rm(targetDir, {
    recursive: true,
    force: true,
  })

  // 复制vant组件到wxcomponents目录
  await fs.cp(vantDir, targetDir, {
    recursive: true,
    dereference: true,
  })

  // 忽略目录
  await fs.writeFile(path.join(targetDir, '.gitignore'), '*')
}

setup().catch(console.error)
