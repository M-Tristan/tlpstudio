import { withInstall } from "@element-plus/utils";
import Dialog from "./src/dialog.vue";
import "@element-plus/theme-chalk/dist/base.css";
import "@element-plus/theme-chalk/dist/el-dialog.css";
export const ElDialog = withInstall(Dialog);
export default ElDialog;

export * from "./src/use-dialog";
export * from "./src/dialog";
