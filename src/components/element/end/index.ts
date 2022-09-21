import index from './index.vue'
import edit from './edit.vue'
import config from './config'
import _ from 'lodash'
import editConfig from  "@common/EditStore";

const create = () => {
    const nodeinfo = _.cloneDeep(config)
    editConfig.createNode(nodeinfo)
}
export { index, edit, config ,create}
export default { index, edit, config ,create}