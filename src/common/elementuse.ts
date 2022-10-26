import {
    ElDrawer,
    ElButton,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElTooltip,
    ElDialog,
    ElRow,
    ElCol,
    ElInput,
    ElPopover,
} from "element-plus";
function elementuse(app: any) {
    app.component(ElDrawer.name, ElDrawer);
    app.component(ElButton.name, ElButton);
    app.component(ElMenu.name, ElMenu);
    app.component(ElMenuItem.name, ElMenuItem);
    app.component(ElSubMenu.name, ElSubMenu);
    app.component(ElTooltip.name, ElTooltip);
    app.component(ElDialog.name, ElDialog);
    app.component(ElRow.name, ElRow);
    app.component(ElCol.name, ElCol);
    app.component(ElPopover.name, ElPopover);
    app.component(ElInput.name, ElInput);
}

export default elementuse;
