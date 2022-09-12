
import _ from 'lodash'
import editConfig from '../../common/editConfig'
import start from './start'

import nodeBox from '../nodeBox.vue'
const createStart = () => {
    let nodeinfo = _.cloneDeep(start.config)
    editConfig.createNode(nodeinfo)
}

const useElement = (app: any) => {
    console.log(start.edit)
    app.component(start.index.name, start.index)
    app.component(start.edit.name, start.edit)
    app.component(nodeBox.name, nodeBox)
}


export { createStart, useElement }

export default { createStart, useElement }