import { createApp } from "vue";
import "./style.css";
import "./assets/iconfont/iconfont.css";
import "element-plus/dist/index.css";
import "./assets/css/dark-css-vars.css";
import App from "./App.vue";
import elementuse from "./common/elementuse";
import { useElement } from "nodeElement";

const app = createApp(App);
elementuse(app);
useElement(app);
app.mount("#app");
