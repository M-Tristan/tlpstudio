/* eslint-disable @typescript-eslint/ban-types */

import EventBus from "eventBus"
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import { node, position } from "../type";
export interface line {
    id: string,
    active:boolean,
    startPosition: {
        left: number,
        top: number,
        id: string
    },
    endPosition: {
        left: number,
        top: number,
        id: string
    }
}
class EditStore {
    node = [] as Array<node>
    nodeMap = {} as { [key: string]: node }
    event: EventBus

    constructor() {
        this.event = new EventBus()
    }
    get lines() {
        const res: any[] = []
        this.node.forEach(item => {
            if (item.links && item.links.length > 0) {
                item.links = item.links.filter(link => {
                    const endNode = this.nodeMap[link.id]

                    if (endNode === undefined) {
                        return false
                    } else {
                        const socketPosition = this.getSocketPositionByNodeID(endNode.id)
                        const line = {
                            id: item.id + endNode.id,
                            active:link.active,
                            startPosition: {
                                left: item.position.left + item.size.width,
                                top: item.position.top + item.size.height / 2,
                                id: item.id
                            },
                            endPosition: {
                                left: socketPosition.left,
                                top: socketPosition.top,
                                id: endNode.id
                            }
                        }
                        res.push(line)
                        return true
                    }

                })

            }
        })
        return res
    }
    getSocketPositionByNodeID(id: string) {
        const node = this.nodeMap[id]
        return this.getSocketPositionByNode(node)

    }
    getAllNodeSocketPositons() {
        const res = this.node.map(item => {
            return this.getSocketPositionByNode(item)
        })
        return res
    }
    getSocketPositionByNode(node: node) {
        const positon = {
            top: 0,
            left: 0,
            id: node.id
        }
        positon.top = node.position.top + node.size.height / 2
        positon.left = node.position.left
        return positon
    }
    createNode(nodeinfo: { [key: string]: any }) {
        const node: node = {
            id: uuidv4(),
            position: {
                left: 90,
                top: 90,
            },
            size: {
                width: 100,
                height: 100
            },
            ...nodeinfo
        }
        this.addNode(node)
    }
    setNode(node: node) {
        if (node != this.nodeMap[node.id]) {
            Object.assign(this.nodeMap[node.id], node)
        }
        this.event.emit("onNodeChange")
    }
    editNode(node: node) {
        this.event.emit('onEditNode', node)
    }
    editNodeById(id: string) {
        const node = this.nodeMap[id]
        this.event.emit('onEditNode', node)
    }
    quitEditNode() {
        this.event.emit('onQuitEitNode')
    }

    addNode(node: node): void {
        this.node.push(node)
        this.nodeMap[node.id] = node
        this.event.emit("onNodeChange")
    }
    copyNode(id: string): void {
        const node = this.nodeMap[id]
        const newNode = _.cloneDeep(node)
        delete newNode['links']
        newNode.id = uuidv4()
        newNode.position.left += 20
        newNode.position.top += 20
        this.addNode(newNode)
    }
    addLine(startId: string, endId: string) {
        const startNode = this.getNodeById(startId)
        if (startNode.links != undefined && startNode.links.findIndex(item => item.id == endId) != -1) {
            return
        }
        const endNode = this.getNodeById(endId)
        if (startNode.links) {
            startNode.links.push({ id: endNode.id, active: true })
        } else {
            startNode.links = [{ id: endNode.id, active: true }]
        }
        this.event.emit("onLineChange")
    }
    removeLine(line: line) {
        const node = this.nodeMap[line.startPosition.id]
        const links = node.links

        node.links = links?.filter(link => {
            return link.id != line.endPosition.id
        })
        this.event.emit("onLineChange")

    }

    onQuitEitNode(func: Function) {
        this.event.on('onQuitEitNode', func)
    }
    removeQuitEitNode(func: Function) {
        this.event.off('onQuitEitNode', func)
    }
    onEditNode(func: Function) {
        this.event.on('onEditNode', func)
    }
    removeEditNode(func: Function) {
        this.event.off('onEditNode', func)
    }
    onNodeChange(func: Function) {
        this.event.on('onNodeChange', func)
    }
    removeNodeChange(func?: Function) {
        this.event.off('onNodeChange', func)
    }
    onLineChange(func: Function) {
        this.event.on('onLineChange', func)
    }
    removeLineChange(func?: Function) {
        this.event.off('onLineChange', func)
    }
    deleteNode(id: string) {
        this.node = this.node.filter(node => {
            node.links = node.links?.filter(link => {
                return link.id != id
            })
            return node.id != id
        })
        delete this.nodeMap[id]
        this.event.emit("onNodeChange")
        this.event.emit("onLineChange")
    }
    getNodeById(id: string) {
        return this.nodeMap[id]
    }
    // initSocketPosition(node: node) {
    //     this.socketMap[node.id].top = node.position.top + node.size.height / 2
    //     this.socketMap[node.id].left = node.position.left
    // }
    changeNodePosition(position: position, id: string) {
        const node = this.getNodeById(id)
        if (node) {
            node.position = position
        }
        this.event.emit("onLineChange")
    }

    getJson() {
        console.log(JSON.stringify(this.node))
    }
}


export { EditStore }
export default EditStore

