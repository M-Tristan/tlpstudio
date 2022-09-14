/* eslint-disable @typescript-eslint/ban-types */
import { node, position } from "../editType"
import { EventBus } from "./eventBus"
import { v4 as uuidv4 } from 'uuid';
interface socketPosition extends position {
    id: string

}
export interface line {
    id: string,
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

class EditConfig {
    node = [] as Array<node>
    socketPositions = [] as Array<socketPosition>
    socketMap = {} as { [key: string]: socketPosition }
    nodeMap = {} as { [key: string]: node }
    lineMap = {} as { [key: string]: Array<line> }
    event: EventBus
    constructor() {
        this.event = new EventBus()
    }
    get lines() {
        const res: any[] = []
        this.node.forEach(item => {
            if (item.links && item.links.length > 0) {
                item.links.forEach(link => {
                    const endNode = this.nodeMap[link.id]
                    const line = {
                        id: item.id + endNode.id,
                        startPosition: {
                            left: item.position.left + item.size.width,
                            top: item.position.top + item.size.height / 2,
                            id: item.id
                        },
                        endPosition: {
                            ...this.socketMap[endNode.id]
                        }
                    }
                    res.push(line)
                })

            }
        })
        return res
    }
    createNode(nodeinfo: { [key: string]: any }) {
        const node: node = {
            id: uuidv4(),
            position: {
                left: 100,
                top: 100,
            },
            size: {
                width: 100,
                height: 100
            },
            ...nodeinfo
        }
        this.addNode(node)
    }
    editNode(node: node) {
        this.event.emit('onEditNode', node)
    }
    quitEditNode() {
        this.event.emit('onQuitEitNode')
    }

    addNode(node: node): void {
        this.node.push(node)
        const socket = {
            left: node.position.left,
            top: node.position.top + node.size.height / 2,
            id: node.id
        }
        this.socketPositions.push(
            socket
        )
        this.socketMap[node.id] = socket
        this.nodeMap[node.id] = node
        this.event.emit("onNodeChange")
    }
    // getLineByLineId(id: string) {
    //     for (let index = 0; index < this.lines.length; index++) {
    //         const line = this.lines[index]
    //         if (line.id == id) {
    //             return line
    //         }
    //     }
    //     return null
    // }
    addLine(startId: string, endId: string) {
        // if (this.getLineByLineId(startId + endId)) {
        //     return
        // }
        const startNode = this.getNodeById(startId)
        if (startNode.links != undefined && startNode.links.findIndex(item => item.id == endId) != -1) {
            console.log(131232)
            return
        }
        const endNode = this.getNodeById(endId)
        if (startNode.links) {
            startNode.links.push({ id: endNode.id, active: false })
        } else {
            startNode.links = [{ id: endNode.id, active: false }]
        }
        // const line = {
        //     id: startId + endId,
        //     startPosition: {
        //         left: startNode.position.left + startNode.size.width,
        //         top: startNode.position.top + startNode.size.height / 2,
        //         id: startId
        //     },
        //     endPosition: {
        //         ...this.socketMap[endId]
        //     }
        // }
        // this.lines.push(
        //     line
        // )
        // if (this.lineMap[startId]) {
        //     this.lineMap[startId].push(line)
        // } else {
        //     this.lineMap[startId] = [line]
        // }
        // if (this.lineMap[endId]) {
        //     this.lineMap[endId].push(line)
        // } else {
        //     this.lineMap[endId] = [line]
        // }
        this.event.emit("onLineChange")
    }
    removeLine(line: line) {
        // this.lines = this.lines.filter(item=>{
        //     return item.id != line.id
        // })
        // console.log(this.lines)
        // delete this.lineMap[line.endPosition.id]
        // delete this.lineMap[line.startPosition.id]
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
    // changeLineByNode(node: node) {
    //     const lines = this.lineMap[node.id]
    //     if (lines && lines.length != 0) {
    //         lines.forEach(item => {
    //             this.initLine(item)
    //         })
    //     }

    // }
    // initLine(line: line) {
    //     const startNode = this.getNodeById(line.startPosition.id)
    //     const endNode = this.getNodeById(line.endPosition.id)
    //     line.startPosition = {
    //         left: startNode.position.left + startNode.size.width,
    //         top: startNode.position.top + startNode.size.height / 2,
    //         id: startNode.id
    //     }
    //     line.endPosition = {
    //         ...this.socketMap[endNode.id]
    //     }
    //     this.event.emit("onLineChange")

    // }
    getNodeById(id: string) {
        return this.nodeMap[id]
    }
    initSocketPosition(node: node) {
        this.socketMap[node.id].top = node.position.top + node.size.height / 2
        this.socketMap[node.id].left = node.position.left
    }
    changeNodePosition(position: position, id: string) {
        const node = this.getNodeById(id)
        if (node) {
            node.position = position
        }
        this.initSocketPosition(node)
        this.event.emit("onLineChange")
        // this.changeLineByNode(node)
    }

    getNodeBySocketPosition(position: position): node | null {
        for (let index = 0, length = this.socketPositions.length; index < length; index++) {
            const socketPosition = this.socketPositions[index]
            if (Math.abs((position.left - socketPosition.left)) < 10 && Math.abs((position.top - socketPosition.top)) < 15) {
                return this.getNodeById(socketPosition.id)
            }
        }
        return null
    }
    getJson() {
        console.log(JSON.stringify(this.node))
    }
}
const edit = new EditConfig()

export { edit as EditConfig }
export default edit

