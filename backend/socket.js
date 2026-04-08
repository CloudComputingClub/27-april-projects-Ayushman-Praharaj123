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
            if (role === 'captain') {
                socket.join('captains')
            }
        })

        socket.on('join-ride', ({ rideId }) => {
            socket.join(`ride-${rideId}`)
        })

        socket.on('update-location', ({ location, rideId }) => {
            if (rideId) {
                io.to(`ride-${rideId}`).emit('captain-location', location)
            }
        })

        socket.on('disconnect', () => {})
    })
}

export const sendToSocket = (roomOrId, { event, data }) => {
    if (io) {
        io.to(roomOrId).emit(event, data)
    }
}

export { io }
