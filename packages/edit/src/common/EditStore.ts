/* eslint-disable @typescript-eslint/ban-types */

import EventBus from "eventBus";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { node, position } from "../type";
import config from "./config";
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
    historys = [] as Array<string>;
    nexts = [] as Array<string>;
    nodes = [] as Array<node>;
    event: EventBus;
    get nodeMap() {
        const nodeMap = {} as { [key: string]: node };
        this.nodes.forEach(node => {
            nodeMap[node.id] = node;
        });
        return nodeMap;
    }
    get lines() {
        const res: any[] = [];
        this.nodes.forEach(item => {
            if (item.links && item.links.length > 0) {
                const nodeMap = this.nodeMap;
                item.links = item.links.filter(link => {
                    const endNode = nodeMap[link.id];
                    if (endNode === undefined) {
                        return false;
                    } else {
                        const socketPositions =
                            this.getSocketPositionsByNode(endNode);
                        let socketPosition = null;
                        if (link.socketIndex) {
                            socketPosition =
                                socketPositions[link.socketIndex - 1];
                        } else {
                            socketPosition = socketPositions[0];
                        }
                        const line = {
                            id: item.id + endNode.id,
                            active: link.active,
                            startPosition: {
                                left: item.position.left + item.size.width,
                                top:
                                    item.position.top +
                                    (item.size.height / (item.plugNum! + 1)) *
                                        link.plugIndex!,
                                id: item.id,
                                plugIndex: link.plugIndex,
                            },
                            endPosition: {
                                left: socketPosition.left,
                                top: socketPosition.top,
                                id: endNode.id,
                                socketIndex: link.socketIndex,
                            },
                        };
                        res.push(line);
                        return true;
                    }
                });
            }
        });
        return res;
    }
    get canBack() {
        return this.historys.length > 1;
    }
    get canRedo() {
        return this.nexts.length > 0;
    }
    constructor() {
        this.event = new EventBus();
        this.pushHistory();
    }
    pushHistory() {
        this.historys.push(JSON.stringify(this.nodes));
        this.nexts = [];
    }
    clearHistory() {
        const history = this.historys.pop()!;
        this.historys = [history];
        this.nexts = [];
    }
    back() {
        const history = this.historys.pop()!;
        this.nexts.push(history);
        const nodes = JSON.parse(this.historys[this.historys.length - 1]);
        this.reSetNodes(nodes);
    }
    redo() {
        const history = this.nexts.pop()!;
        this.historys.push(history);
        const nodes = JSON.parse(history);
        this.reSetNodes(nodes);
    }

    reSetNodes(nodes: Array<node>) {
        this.nodes = nodes;
        this.render();
    }

    getSocketPositionsByNodeID(id: string) {
        const node = this.nodeMap[id];
        return this.getSocketPositionsByNode(node);
    }
    getAllNodeSocketPositions() {
        let res: any[] = [];
        this.nodes.forEach(item => {
            const positions = this.getSocketPositionsByNode(item);
            res = [...res, ...positions];
        });
        return res;
    }
    getSocketPositionsByNode(node: node) {
        const num = node.socketNum !== undefined ? node.socketNum : 1;
        const positions: any[] = [];
        for (let index = 0; index < num; index++) {
            const position = {
                top: 0,
                left: 0,
                id: node.id,
                socketIndex: index + 1,
            };
            position.top =
                node.position.top +
                (node.size.height / (num + 1)) * (index + 1);
            position.left = node.position.left;
            positions.push(position);
        }

        return positions;
    }
    formatNode(node: node) {
        node.plugNum = node.plugNum === undefined ? 1 : node.plugNum;
        node.socketNum = node.socketNum === undefined ? 1 : node.socketNum;
    }
    render() {
        this.event.emit("onNodeChange");
        this.event.emit("onLineChange");
    }
    getPosition(left: number, top: number) {
        const positionQueue: Array<{ left: number; top: number }> = [];
        positionQueue.push({ left, top });
        const nodePositions: { [key: string]: boolean } = {};
        const testedPositions: { [key: string]: boolean } = {};
        const gridSize = config.grid.size;
        let result = { left: 0, top: 0 };
        this.nodes.forEach(item => {
            nodePositions[`${item.position.left}-${item.position.top}`] = true;
        });
        while (positionQueue.length != 0) {
            const position = positionQueue.shift()!;
            if (!nodePositions[`${position.left}-${position.top}`]) {
                result = position;
                break;
            }
            testedPositions[`${position.left}-${position.top}`] = true;
            if (
                !testedPositions[
                    `${position.left + gridSize}-${position.top + gridSize}`
                ]
            ) {
                positionQueue.push({
                    left: position.left + gridSize,
                    top: position.top + gridSize,
                });
            }
            if (
                !testedPositions[`${position.left}-${position.top + gridSize}`]
            ) {
                positionQueue.push({
                    left: position.left,
                    top: position.top + gridSize,
                });
            }
            if (
                !testedPositions[`${position.left + gridSize}-${position.top}`]
            ) {
                positionQueue.push({
                    left: position.left + gridSize,
                    top: position.top,
                });
            }
            if (
                !testedPositions[
                    `${position.left + gridSize}-${position.top - gridSize}`
                ]
            ) {
                positionQueue.push({
                    left: position.left + gridSize,
                    top: position.top - gridSize,
                });
            }
            if (
                !testedPositions[`${position.left}-${position.top - gridSize}`]
            ) {
                positionQueue.push({
                    left: position.left,
                    top: position.top - gridSize,
                });
            }
            if (
                !testedPositions[`${position.left - gridSize}-${position.top}`]
            ) {
                positionQueue.push({
                    left: position.left - gridSize,
                    top: position.top,
                });
            }
            if (
                !testedPositions[
                    `${position.left - gridSize}-${position.top + gridSize}`
                ]
            ) {
                positionQueue.push({
                    left: position.left - gridSize,
                    top: position.top + gridSize,
                });
            }
            if (
                !testedPositions[
                    `${position.left - gridSize}-${position.top - gridSize}`
                ]
            ) {
                positionQueue.push({
                    left: position.left - gridSize,
                    top: position.top - gridSize,
                });
            }
        }
        return result;
    }
    createNode(nodeinfo: { [key: string]: any }) {
        const node: node = {
            id: uuidv4(),
            position: this.getPosition(80, 80),
            size: {
                width: 100,
                height: 100,
            },
            ...nodeinfo,
        };
        this.formatNode(node);
        this.addNode(node);
    }
    setNode(node: node) {
        if (node != this.nodeMap[node.id]) {
            Object.assign(this.nodeMap[node.id], node);
        }
        this.event.emit("onNodeChange");
    }
    editNode(node: node) {
        this.event.emit("onEditNode", node);
    }
    editNodeById(id: string) {
        const node = this.nodeMap[id];
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
        this.nodes.push(node);
        this.render();
        this.event.emit("onAddNode");
    }
    copyNode(id: string): void {
        const node = this.nodeMap[id];
        const newNode = _.cloneDeep(node);
        delete newNode["links"];
        newNode.id = uuidv4();
        newNode.position = this.getPosition(
            newNode.position.left,
            newNode.position.top
        );
        this.addNode(newNode);
    }
    addLine(plug: any, socket: any) {
        const startNode = this.getNodeById(plug.id);
        const links = startNode.links;
        if (links) {
            const linkIndex = links.findIndex(link => {
                return (
                    link.id === socket.id &&
                    link.socketIndex === socket.socketIndex &&
                    link.plugIndex === plug.plugIndex
                );
            });
            if (linkIndex == -1) {
                startNode.links?.push({
                    id: socket.id,
                    active: false,
                    socketIndex: socket.socketIndex,
                    plugIndex: plug.plugIndex,
                });
            }
        } else {
            startNode.links = [
                {
                    id: socket.id,
                    active: false,
                    socketIndex: socket.socketIndex,
                    plugIndex: plug.plugIndex,
                },
            ];
        }
        this.render();
        this.event.emit("onAddLine");
    }
    removeLine(line: line) {
        const node = this.nodeMap[line.startPosition.id];
        const links = node.links;

        node.links = links?.filter(link => {
            return (
                link.id != line.endPosition.id ||
                link.socketIndex != line.endPosition.socketIndex ||
                link.plugIndex != line.startPosition.plugIndex
            );
        });
        this.render();
        this.event.emit("onRemoveLine");
    }

    deleteNode(id: string) {
        this.nodes = this.nodes.filter(node => {
            node.links = node.links?.filter(link => {
                return link.id != id;
            });
            return node.id != id;
        });
        this.render();
        this.event.emit("onDeleteNode");
    }
    getNodeById(id: string) {
        return this.nodeMap[id];
    }
    changeNodePosition(position: position, id: string) {
        const node = this.getNodeById(id);
        if (node) {
            node.position = position;
        }
        this.render();
    }

    getJson() {
        console.log(JSON.stringify(this.nodes));
    }
}

export { EditStore };
export default EditStore;
