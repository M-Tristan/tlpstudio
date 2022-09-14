/* eslint-disable @typescript-eslint/ban-types */

import start from './start'

import nodeBox from '../nodeBox.vue'

const nodeCreateMap:{[key:string]:Function} = {
    start:start.create
}

const useElement = (app: any) => {
    app.component(start.index.name, start.index)
    app.component(start.edit.name, start.edit)
    app.component(nodeBox.name, nodeBox)
}

const create = (name:string) =>{
    nodeCreateMap[name]()
}

export { create, useElement }

export default { create, useElement }