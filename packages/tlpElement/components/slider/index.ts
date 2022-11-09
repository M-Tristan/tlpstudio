import { withInstall } from '@element-plus/utils'
import Slider from './src/slider.vue'
import "@element-plus/theme-chalk/dist/base.css"
import "@element-plus/theme-chalk/dist/el-slider.css"

export const ElSlider = withInstall(Slider)
export default ElSlider

export * from './src/slider'
