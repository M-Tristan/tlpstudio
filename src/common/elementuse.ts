import {
    ElDrawer,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
} from "element-plus";
function elementuse(app: any) {
    app.component(ElDrawer.name, ElDrawer);
    app.component(ElButton.name, ElButton);
    app.component(ElMenu.name, ElMenu);
    app.component(ElMenuItem.name, ElMenuItem);
    app.component(ElSubMenu.name, ElSubMenu);
}

export default elementuse;
