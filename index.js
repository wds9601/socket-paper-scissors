const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const layout = require('express-ejs-layouts')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(layout)

//SOCKET VARIABLES
let connections = []
let players = []
//SOCKET FUN
io.sockets.on('connection', socket => {
    connections.push(socket)
    console.log(`Connection made: ${connections.length} sockets connected`)

    socket.on('disconnect', data => {
        players.splice(players.indexOf(socket.username), 1)
        updateUsernames()
        console.log(data)
        connections.splice(connections.indexOf(socket), 1)
        io.emit('disconnected', socket.username)
        console.log(`Disconnected: ${connections.length} sockets disconnected`)
    })

    const updateUsernames = () => {
        io.sockets.emit('get players', players)
    }
})

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(3000, () => {
    console.log('keeping it 3000')
})