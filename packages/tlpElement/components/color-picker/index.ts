import { withInstall } from '@element-plus/utils'

import ColorPicker from './src/color-picker.vue'
import "@element-plus/theme-chalk/dist/base.css"
import "@element-plus/theme-chalk/dist/el-color-picker.css"
export const ElColorPicker = withInstall(ColorPicker)
export default ElColorPicker

export * from './src/color-picker'
