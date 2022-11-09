import { withInstall } from '@element-plus/utils'
import InputNumber from './src/input-number.vue'
import "@element-plus/theme-chalk/dist/base.css"
import "@element-plus/theme-chalk/dist/el-input-number.css"
export const ElInputNumber = withInstall(InputNumber)

export default ElInputNumber
export * from './src/input-number'
