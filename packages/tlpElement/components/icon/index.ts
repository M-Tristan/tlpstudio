import { withInstall } from "@element-plus/utils";
import Icon from "./src/icon.vue";
import "@element-plus/theme-chalk/dist/base.css";
import "@element-plus/theme-chalk/dist/el-icon.css";

export const ElIcon = withInstall(Icon);
export default ElIcon;

export * from "./src/icon";
