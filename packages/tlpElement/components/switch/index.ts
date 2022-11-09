import { withInstall } from '@element-plus/utils'
import Switch from './src/switch.vue'
import "@element-plus/theme-chalk/dist/base.css"
import "@element-plus/theme-chalk/dist/el-switch.css"
export const ElSwitch = withInstall(Switch)
export default ElSwitch

export * from './src/switch'
