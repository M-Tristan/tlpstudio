/* eslint-disable @typescript-eslint/ban-types */
import { node, position } from "../editType"
import { EventBus } from "./eventBus"
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
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

class EditStore {
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
                item.links = item.links.filter(link => {
                    const endNode = this.nodeMap[link.id]
                    if(endNode===undefined){
                        return false
                    }else{
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
                        return true
                    }
                    
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
    setNode(node:node){
        if(node != this.nodeMap[node.id]){
            Object.assign(this.nodeMap[node.id],node)
        }
        this.event.emit("onNodeChange")
    }
    editNode(node: node) {
        this.event.emit('onEditNode', node)
    }
    editNodeById(id:string){
        const node = this.nodeMap[id]
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
    copyNode(id:string):void{
        const node = this.nodeMap[id]
        const newNode = _.cloneDeep(node)
        delete newNode['links']
        newNode.id = uuidv4()
        newNode.position.left +=20
        newNode.position.top +=20
        this.addNode(newNode)
    }
    addLine(startId: string, endId: string) {
        const startNode = this.getNodeById(startId)
        if (startNode.links != undefined && startNode.links.findIndex(item => item.id == endId) != -1) {
            return
        }
        const endNode = this.getNodeById(endId)
        if (startNode.links) {
            startNode.links.push({ id: endNode.id, active: false })
        } else {
            startNode.links = [{ id: endNode.id, active: false }]
        }
        this.event.emit("onLineChange")
    }
    removeLine(line: line) {
       const links = this.nodeMap[ line.startPosition.id].links
       const node = this.nodeMap[ line.startPosition.id]
       node.links = links?.filter(link=>{
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
    deleteNode(id:string){
        this.node = this.node.filter(node=>{
            return node.id != id
        })
       delete this.nodeMap[id]
      
       delete this.socketMap[id]
       this.event.emit("onNodeChange")
       this.event.emit("onLineChange")

       
    }
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
const edit = new EditStore()

export { edit as EditStore }
export default edit

