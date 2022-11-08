/* eslint-disable @typescript-eslint/ban-types */

import registerNode from "./register";
import { nodeBox } from "edit";
import EditStore from "edit/src/common/editStore";
const nodeCreateMap: { [key: string]: Function } = {};
for (const key in registerNode) {
    const node = (registerNode as any)[key];
    nodeCreateMap[key] = node.create;
}
const useElement = (app: any) => {
    for (const key in registerNode) {
        const node = (registerNode as any)[key];
        app.component(node.index.name, node.index);
        app.component(node.edit.name, node.edit);
    }
    app.component(nodeBox.name, nodeBox);
};

const create = (name: string, store: EditStore) => {
    nodeCreateMap[name](store);
};

export { create, useElement };

export default { create, useElement };
