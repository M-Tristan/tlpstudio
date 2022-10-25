/* eslint-disable @typescript-eslint/ban-types */

import EventBus from "eventBus";
import _ from "lodash";
import { node, position } from "../type";
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

    get selectedLine(){
        return this.scene?.selectedLine
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
    createScene(){
        return new Scene()
    } 
    addScene(scene:Scene){
        
        this.scenes.push(scene)
        this.scene=scene
        this.render()
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
        return this.scene!.getAllNodeSocketPositions();
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
        this.event.emit("onNodeChange");
        this.event.emit("onLineChange");
    }
    getPosition(left: number, top: number) {
        return this.scene?.getPosition(left, top);
    }
    createNode(nodeinfo: { [key: string]: any }) {
       
        this.scene?.createNode(nodeinfo);
        this.render()
    }
    setNode(node: node) {
        this.scene?.setNode(node);
        this.event.emit("onNodeChange");
    }
    editNode(node: node) {
        this.event.emit("onEditNode", node);
    }
    editNodeById(id: string) {
        const node = this.scene?.editNodeById(id);
        this.event.emit("onEditNode", node);
    }
    quitEditNode() {
        this.render();
    }

    onQuitEitNode(func: Function) {
        this.event.on("onQuitEitNode", func);
    }
    removeQuitEitNode(func: Function) {
        this.event.off("onQuitEitNode", func);
    }
    onEditNode(func: Function) {
        this.event.on("onEditNode", func);
    }
    removeEditNode(func: Function) {
        this.event.off("onEditNode", func);
    }
    onNodeChange(func: Function) {
        this.event.on("onNodeChange", func);
    }
    removeNodeChange(func?: Function) {
        this.event.off("onNodeChange", func);
    }
    onLineChange(func: Function) {
        this.event.on("onLineChange", func);
    }
    removeLineChange(func?: Function) {
        this.event.off("onLineChange", func);
    }
    onAddNode(func: Function) {
        this.event.on("onAddNode", func);
    }
    removeAddNode(func?: Function) {
        this.event.off("onAddNode", func);
    }
    onNodeMoveEnd(func: Function) {
        this.event.on("onNodeMoveEnd", func);
    }
    removeNodeMoveEnd(func?: Function) {
        this.event.off("onNodeMoveEnd", func);
    }
    emitNodeMoveEnd() {
        this.event.emit("onNodeMoveEnd");
    }
    onDeleteNode(func: Function) {
        this.event.on("onDeleteNode", func);
    }
    removeDeleteNode(func?: Function) {
        this.event.off("onDeleteNode", func);
    }
    onAddLine(func: Function) {
        this.event.on("onAddLine", func);
    }
    removeAddLine(func?: Function) {
        this.event.off("onAddLine", func);
    }
    onRemoveLine(func: Function) {
        this.event.on("onRemoveLine", func);
    }
    removeRemoveLine(func?: Function) {
        this.event.off("onRemoveLine", func);
    }

    addNode(node: node): void {
        this.scene?.addNode(node);
        this.render();
        this.event.emit("onAddNode");
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
        this.event.emit("onAddLine");
    }
    /**
     * 移除线
     * @returns
     */
    removeLine() {
        if (this.scene?.removeLine()) {
            this.render();
            this.event.emit("onRemoveLine");
        }
    }

    deleteNode(id: string) {
        this.scene?.deleteNode(id);
        this.render();
        this.event.emit("onDeleteNode");
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
