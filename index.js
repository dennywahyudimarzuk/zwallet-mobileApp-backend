const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routeNav = require('./src/')
const routeAdmin = require('./src/admin')
var admin = require("firebase-admin");
require('dotenv').config()

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const db = require('./src/config/mysql')

var serviceAccount = require("./src/services/zwallet-mobileapp-firebase-adminsdk-in2t3-9792d46a99.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zwallet-mobileapp.firebaseio.com",
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

io.on('connection', (socket) => {
  socket.on('initial-data', (id) => {
    console.log(id)
    console.log('id')
    socket.join(id)
    db.query(`SELECT balance from users WHERE id=${id}`, (err, res) => {
      io.to(id).emit("get-data", res[0].balance)
      console.log(res[0].balance)
    })
  })
})

app.use('/api/v1', routeNav)
app.use('/admin/api/v1', routeAdmin)

app.use(express.static('public'))

server.listen(process.env.PORT || 8000, () => { 
    console.log('Server running')
})