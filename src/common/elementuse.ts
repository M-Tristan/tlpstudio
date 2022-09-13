import { ElDrawer ,ElButton} from 'element-plus'
function elementuse(app: any) {
    app.component(ElDrawer.name, ElDrawer)
    app.component(ElButton.name, ElButton)
}

export default elementuse