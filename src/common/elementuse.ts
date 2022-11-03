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
    ElTreeV2,
    ElTree,
    ElIcon,
} from "element-plus";
import { ArrowRightBold, EditPen, DeleteFilled } from "@element-plus/icons-vue";

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
    app.component(ElIcon.name, ElIcon);
    app.component(ElPopover.name, ElPopover);
    app.component(ElInput.name, ElInput);
    app.component(ElTreeV2.name, ElTreeV2);
    app.component(ElTree.name, ElTree);
    app.component(ArrowRightBold.name, ArrowRightBold);
    app.component(EditPen.name, EditPen);
    app.component(DeleteFilled.name, DeleteFilled);
}

export default elementuse;
