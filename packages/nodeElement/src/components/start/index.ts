import index from './index.vue'
import edit from './edit.vue'
import config from './config'
import _ from 'lodash'
import EditStore from 'edit/src/common/EditStore'



const create = (store:EditStore) => {
    const nodeinfo = _.cloneDeep(config)
    store.createNode(nodeinfo)
}
export { index, edit, config ,create}
export default { index, edit, config ,create}