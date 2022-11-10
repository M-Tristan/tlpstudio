/* eslint-disable @typescript-eslint/ban-types */

import EventBus from "eventBus";
import _ from "lodash";
import { node, position } from "../type";
import {
    ADD_LINE_EVENT,
    ADD_NODE_EVENT,
    DELETE_NODE_EVENT,
    EDIT_NODE_EVENT,
    LINE_CHANGE_EVENT,
    NODE_CHANGE_EVENT,
    NODE_MOVE_END_EVENT,
    QUIT_EDIT_NODE_EVENT,
    REMOVE_LINE_EVENT,
} from "./constants";
import Scene from "./scene";
export interface line {
    id: string;
    active: boolean;
    startPosition: {
        left: number;
        top: number;
        id: string;
        plugIndex?: number;
    };
    endPosition: {
        left: number;
        top: number;
        id: string;
        socketIndex?: number;
    };
}
class EditStore {
    scenes = [] as Array<Scene>;
    scene = null as Scene | null;
    event: EventBus;

    get selectedLine() {
        return this.scene?.selectedLine;
    }

    get nodeMap() {
        return this.scene?.nodeMap;
    }
    /**
     * 得到所有连线
     */
    get lines() {
        return this.scene?.lines;
    }
    get canBack() {
        return this.scene?.canBack;
    }
    get canRedo() {
        return this.scene?.canRedo;
    }
    get nodes() {
        return this.scene?.nodes;
    }
    constructor() {
        this.event = new EventBus();
        // this.pushHistory();
    }
    renderScene(param: string | Scene) {
        let id: string;
        if (param instanceof Scene) {
            id = param.id;
        } else {
            id = param;
        }
        const scene = this.scenes.find(item => {
            return item.id == id;
        });
        if (scene) {
            this.scene = scene;
        }
        this.render();
    }
    createScene(info: object) {
        return new Scene(info);
    }
    addScene(scene: Scene) {
        this.scenes.push(scene);
        this.scene = scene;
        this.render();
    }
    removeScene(scene: Scene) {
        this.scenes = this.scenes.filter((item: Scene) => {
            return scene.id != item.id;
        });
        if (this.scene == scene) {
            this.scene = null;
            this.render();
        }
    }
    pushHistory() {
        this.scene?.pushHistory();
    }
    clearHistory() {
        this.scene?.clearHistory();
    }
    back() {
        this.scene?.back();
        this.render();
    }
    redo() {
        this.scene?.redo();
        this.render();
    }

    setSelectedLine(line: line | null) {
        this.scene?.setSelectedLine(line);
    }

    getSocketPositionsByNodeID(id: string) {
        return this.scene?.getSocketPositionsByNodeID(id);
    }
    getAllNodeSocketPositions() {
        return this.scene?.getAllNodeSocketPositions();
    }
    /**
     * 获得节点插槽的位置
     * @param node
     * @returns
     */
    getSocketPositionsByNode(node: node) {
        return this.scene?.getSocketPositionsByNode(node);
    }

    render() {
        this.event.emit(NODE_CHANGE_EVENT);
        this.event.emit(LINE_CHANGE_EVENT);
    }
    getPosition(left: number, top: number) {
        return this.scene?.getPosition(left, top);
    }
    createNode(nodeinfo: { [key: string]: any }) {
        this.scene?.createNode(nodeinfo);
        this.render();
        this.pushHistory();
    }
    setNode(node: node) {
        this.scene?.setNode(node);
        this.event.emit(NODE_CHANGE_EVENT);
    }
    editNode(node: node) {
        this.event.emit(EDIT_NODE_EVENT, node);
    }
    editNodeById(id: string) {
        const node = this.scene?.editNodeById(id);
        this.event.emit(EDIT_NODE_EVENT, node);
    }
    quitEditNode() {
        this.event.emit(QUIT_EDIT_NODE_EVENT);
        this.render();
    }

    onQuitEitNode(func: Function) {
        this.event.on(QUIT_EDIT_NODE_EVENT, func);
    }
    removeQuitEitNode(func: Function) {
        this.event.off(QUIT_EDIT_NODE_EVENT, func);
    }
    onEditNode(func: Function) {
        this.event.on(EDIT_NODE_EVENT, func);
    }
    removeEditNode(func: Function) {
        this.event.off(EDIT_NODE_EVENT, func);
    }
    onNodeChange(func: Function) {
        this.event.on(NODE_CHANGE_EVENT, func);
    }
    removeNodeChange(func?: Function) {
        this.event.off(NODE_CHANGE_EVENT, func);
    }
    onLineChange(func: Function) {
        this.event.on(LINE_CHANGE_EVENT, func);
    }
    removeLineChange(func?: Function) {
        this.event.off(LINE_CHANGE_EVENT, func);
    }
    onAddNode(func: Function) {
        this.event.on(ADD_NODE_EVENT, func);
    }
    removeAddNode(func?: Function) {
        this.event.off(ADD_NODE_EVENT, func);
    }
    onNodeMoveEnd(func: Function) {
        this.event.on(NODE_MOVE_END_EVENT, func);
    }
    removeNodeMoveEnd(func?: Function) {
        this.event.off(NODE_MOVE_END_EVENT, func);
    }
    emitNodeMoveEnd() {
        this.event.emit(NODE_MOVE_END_EVENT);
    }
    onDeleteNode(func: Function) {
        this.event.on(DELETE_NODE_EVENT, func);
    }
    removeDeleteNode(func?: Function) {
        this.event.off(DELETE_NODE_EVENT, func);
    }
    onAddLine(func: Function) {
        this.event.on(ADD_LINE_EVENT, func);
    }
    removeAddLine(func?: Function) {
        this.event.off(ADD_LINE_EVENT, func);
    }
    onRemoveLine(func: Function) {
        this.event.on(REMOVE_LINE_EVENT, func);
    }
    removeRemoveLine(func?: Function) {
        this.event.off(REMOVE_LINE_EVENT, func);
    }

    addNode(node: node): void {
        this.scene?.addNode(node);
        this.render();
        this.event.emit(ADD_NODE_EVENT);
    }
    copyNode(id: string): void {
        this.scene?.copyNode(id);
        this.render();
    }
    /**
     * 连线
     * @param plug
     * @param socket
     */
    addLine(plug: any, socket: any) {
        this.scene?.addLine(plug, socket);
        this.render();
        this.event.emit(ADD_LINE_EVENT);
    }
    /**
     * 移除线
     * @returns
     */
    removeLine() {
        if (this.scene?.removeLine()) {
            this.render();
            this.event.emit(REMOVE_LINE_EVENT);
        }
    }

    deleteNode(id: string) {
        this.scene?.deleteNode(id);
        this.render();
        this.event.emit(DELETE_NODE_EVENT);
    }
    getNodeById(id: string) {
        return this.scene?.getNodeById(id);
    }
    changeNodePosition(position: position, id: string) {
        this.scene?.changeNodePosition(position, id);
        this.render();
    }

    getJson() {
        const json = this.scene?.getJson();
        console.log(JSON.stringify(json));
    }
}

export { EditStore };
export default EditStore;
