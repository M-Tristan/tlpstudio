import { withInstall } from '@element-plus/utils'
import Tag from './src/tag.vue'
import "@element-plus/theme-chalk/dist/base.css"
import "@element-plus/theme-chalk/dist/el-tag.css"

export const ElTag = withInstall(Tag)
export default ElTag

export * from './src/tag'
