export default {
  preflight: false,
  prefixer: false,
  extract: {
    exclude: ['node_modules', '.git', 'dist', 'src/wxcomponents/@vant'],
  },
  corePlugins: {
    container: false,
  },
}
