const express = require('express')
const router = require('./router/router.js')
const handlebars = require("express-handlebars")
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const moment = require('moment');
const options = require('./db/ecommerce.js')
const DB = require('./db-controller.js')
const msj = new DB(options,'msj')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))


//ejs
// app.set('views', './view-ejs');
// app.set('view engine', 'ejs');

// handlebars
app.engine('hbs', handlebars.engine(
     { 
        extname: '.hbs', 
        layoutsDir: __dirname + '/views-handlebars/layouts/',
        defaultLayout: __dirname + '/views-handlebars/layouts/index.hbs', 
        partialsDir: __dirname + '/views-handlebars/partials/'
      } 
));
app.set('view engine', 'handlebars');
app.set('views', './views-handlebars');


// Pug
// app.set('views', './views');
// app.set('view engine', 'pug');
app.use(function(req,res,next){
    req.io = io;
    next();
})

app.use('' , router)


io.on('connection', async  (socket) => {
    let mensajes = await msj.getAll()
    formatDate(mensajes)
    io.sockets.emit("mensajes", mensajes);
    
    socket.on("mensajes", async function (data) {
        data.fecha = new Date()
        console.log(data)
        await msj.save(data)
        mensajes = await msj.getAll()
        formatDate(mensajes)
        io.sockets.emit("mensajes", mensajes);
    });
})
function formatDate(mensajes){
    mensajes = mensajes.map((m)=>{
        m.fecha = moment(m.fecha).format("MMMM Do YYYY, h:mm:ss a")
        return m
    })
}
const conn = server.listen(8080,()=>{
    console.log(`Servidor corriendo en el puerto ${conn.address().port}`)
})
app.on("error",(error)=>{
    console.log(`Error ${error}`)
})