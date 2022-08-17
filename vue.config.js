const MiniProgramTailwindWebpackPlugin = require('@dcasia/mini-program-tailwind-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new MiniProgramTailwindWebpackPlugin({
        designWidth: 375,
      }),
    ],
  },
}
