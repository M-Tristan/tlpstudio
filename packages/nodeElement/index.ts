/* eslint-disable @typescript-eslint/ban-types */

import start from "./src/components/start";
import end from "./src/components/end";
import twoSocketTest from "./src/components/twoSocketTest";
import twoPlugTest from "./src/components/twoPlugTest";

import { nodeBox } from "edit";
import EditStore from "edit/src/common/editStore";

const nodeCreateMap: { [key: string]: Function } = {
    start: start.create,
    end: end.create,
    twoSocketTest: twoSocketTest.create,
    twoPlugTest: twoPlugTest.create,
};

const useElement = (app: any) => {
    app.component(start.index.name, start.index);
    app.component(start.edit.name, start.edit);
    app.component(end.index.name, end.index);
    app.component(end.edit.name, end.edit);
    app.component(twoSocketTest.index.name, twoSocketTest.index);
    app.component(twoSocketTest.edit.name, twoSocketTest.edit);
    app.component(twoPlugTest.index.name, twoPlugTest.index);
    app.component(twoPlugTest.edit.name, twoPlugTest.edit);
    app.component(nodeBox.name, nodeBox);
};

const create = (name: string, store: EditStore) => {
    nodeCreateMap[name](store);
};

export { create, useElement };

export default { create, useElement };
