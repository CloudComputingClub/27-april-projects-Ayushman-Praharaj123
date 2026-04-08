import { Server } from 'socket.io'

let io

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {

        socket.on('join', ({ userId, role }) => {
            socket.join(userId)
            socket.data.userId = userId
            socket.data.role = role
        })

        socket.on('update-location', ({ captainId, location }) => {
            io.to(captainId).emit('captain-location', location)
        })

        socket.on('disconnect', () => {})
    })
}

export const sendToSocket = (socketId, { event, data }) => {
    if (io) {
        io.to(socketId).emit(event, data)
    }
}

export { io }
