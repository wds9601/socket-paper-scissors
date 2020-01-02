console.log('Hello world')
const socket = io()

let btn
let choices = []
let game
let login
let submitted = false
let username

document.addEventListener('DOMContentLoaded', () => {
    btn = document.getElementById('btn').addEventListener('click', submitLogin)
    choices = document.querySelectorAll('.game-choice')
    choices.forEach(choices => {
        choices.addEventListener('click', submitChoice)
    })
    game = document.getElementById('game')
    login = document.getElementById('login')
    username = document.getElementById('username')
})

const submitLogin = () => {
    socket.emit('add player', username.value, data => {
        if (data) {
            login.style.display = 'none'
            game.style.display = 'flex'
        } else {
            alert(`${username.value} is already in use!`)
        }
    })
}

const submitChoice = e => {
    let choice = e.target.id
    console.log(username.value, choice)
    if (!submitted) {
        submitted = true
        socket.emit('player choice', username.value, choice)
    } else {
        console.log('You have already made your choice!')
    }
}

socket.on('get players', data => {
    console.log(data)
})