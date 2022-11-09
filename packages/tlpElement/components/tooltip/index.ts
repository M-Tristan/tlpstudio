import { withInstall } from '@element-plus/utils'
import Tooltip from './src/tooltip.vue'
import "@element-plus/theme-chalk/dist/base.css"
import "@element-plus/theme-chalk/dist/el-tooltip.css"

export const ElTooltip = withInstall(Tooltip)
export * from './src/tooltip'
export * from './src/trigger'
export * from './src/content'
export default ElTooltip
