import EventBus from "eventBus";
import { node, position } from "../type";
interface socketPosition extends position {
    id: string;
}
export interface line {
    id: string;
    startPosition: {
        left: number;
        top: number;
        id: string;
    };
    endPosition: {
        left: number;
        top: number;
        id: string;
    };
}
declare class EditStore {
    node: node[];
    socketPositions: socketPosition[];
    socketMap: {
        [key: string]: socketPosition;
    };
    nodeMap: {
        [key: string]: node;
    };
    lineMap: {
        [key: string]: line[];
    };
    event: EventBus;
    constructor();
    get lines(): any[];
    createNode(nodeinfo: {
        [key: string]: any;
    }): void;
    setNode(node: node): void;
    editNode(node: node): void;
    editNodeById(id: string): void;
    quitEditNode(): void;
    addNode(node: node): void;
    copyNode(id: string): void;
    addLine(startId: string, endId: string): void;
    removeLine(line: line): void;
    onQuitEitNode(func: Function): void;
    removeQuitEitNode(func: Function): void;
    onEditNode(func: Function): void;
    removeEditNode(func: Function): void;
    onNodeChange(func: Function): void;
    removeNodeChange(func?: Function): void;
    onLineChange(func: Function): void;
    removeLineChange(func?: Function): void;
    deleteNode(id: string): void;
    getNodeById(id: string): node;
    initSocketPosition(node: node): void;
    changeNodePosition(position: position, id: string): void;
    getNodeBySocketPosition(position: position): node | null;
    getJson(): void;
}
export { EditStore };
export default EditStore;
