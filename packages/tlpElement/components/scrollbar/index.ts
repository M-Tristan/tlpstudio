import { withInstall } from '@element-plus/utils'

import Scrollbar from './src/scrollbar.vue'
import "@element-plus/theme-chalk/dist/base.css"
import "@element-plus/theme-chalk/dist/el-scrollbar.css"

export const ElScrollbar = withInstall(Scrollbar)
export default ElScrollbar

export * from './src/util'
export * from './src/scrollbar'
export * from './src/thumb'
