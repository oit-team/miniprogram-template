import { warn } from '@/utils/warning'

let containerCache = null

function checkContainer() {
  const container = this.$children[0]

  if (containerCache === container) return

  containerCache = container

  if (container?.$options?.name.toLowerCase() !== 'container') warn(`首个元素必须是 <container> 页面 ${this.__route__}`)
}

const noop = () => {}

export default {
  mounted() {
    if (this.mpType === 'page') {
      checkContainer.call(this)
    }
  },
  // 初始化onShow,onHide事件，以便container组件能正常添加挂载
  onShow: noop,
  onHide: noop,
  methods: {
    /**
     * 兼容vant组件v-model
     * @param {string | string[]} dataKeys
     */
    useVantModel(dataKeys) {
      dataKeys = Array.isArray(dataKeys) ? dataKeys : [dataKeys]

      dataKeys.forEach((key) => {
        this.$watch(key, (value) => {
          if (value?.currentTarget?.dataset?.comType === 'wx') {
            this[key] = value.detail
          }
        })
      })
    },
  },
}
