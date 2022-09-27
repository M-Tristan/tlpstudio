import {
    ElDrawer,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElTooltip,
} from "element-plus";
function elementuse(app: any) {
    app.component(ElDrawer.name, ElDrawer);
    app.component(ElButton.name, ElButton);
    app.component(ElMenu.name, ElMenu);
    app.component(ElMenuItem.name, ElMenuItem);
    app.component(ElSubMenu.name, ElSubMenu);
    app.component(ElTooltip.name, ElTooltip);
}

export default elementuse;
