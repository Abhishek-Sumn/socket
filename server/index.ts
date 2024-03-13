import { drawLine } from './../socketscribbl/utils/drawLine';
declare var require: any

const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)

import { Server } from 'socket.io'

const io = new Server(server, {
    cors: {
        origin: 'https://socketscribbl.vercel.app/'
    }
})

type Point = { x: Number, y: number }

type DrawLine = {
    prevPoint: Point | null
    currentPoint: Point
    color: string
}

io.on('connection', (socket) => {


    socket.on('client-ready',()=>{
        socket.broadcast.emit('get-canvas-state')
    })

    socket.on('canvas-state',(state)=>{
        socket.broadcast.emit('canvas-state-from-server',state)
    })

    socket.on('draw-line', ({ prevPoint, currentPoint, color }: DrawLine) => {
        socket.broadcast.emit('draw-line', { prevPoint, currentPoint, color })
    })

    socket.on('clear',() => io.emit('clear'))


})

server.listen(3001,() =>{
    console.log('Listening 3001')
})
