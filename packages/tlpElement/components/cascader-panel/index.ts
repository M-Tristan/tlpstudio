import CascaderPanel from "./src/index.vue";
import type { App } from "vue";
import type { SFCWithInstall } from "@element-plus/utils";
import "@element-plus/theme-chalk/dist/base.css";
import "@element-plus/theme-chalk/dist/el-cascader-panel.css";

CascaderPanel.install = (app: App): void => {
    app.component(CascaderPanel.name, CascaderPanel);
};

const _CascaderPanel = CascaderPanel as SFCWithInstall<typeof CascaderPanel>;

export default _CascaderPanel;
export const ElCascaderPanel = _CascaderPanel;
export * from "./src/types";
export * from "./src/config";
