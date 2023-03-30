const express = require('express');
// const app = express();
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();
const cors = require("cors");
const { dbConection } = require('./database/config');
const Item = require("./models/ItemModel");


const app = express();
const server = http.createServer(app,{
    pingTimeout: 60000
  });
const io = new Server(server,{
    cors:{
        origin:'*',
        credentials:true,
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        allowedHeaders:'*'
    }, 
    transports: ['websocket', 'polling', 'flashsocket'],
    
});

dbConection();

app.use(express.static('public'));
app.use(cors());
// server.

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/brand', require('./routes/brand'));


app.get('/', (req,res)=>{
    res.send('Init Page');
});

io.on('connection',(socket)=>{
    socket.on("Figures", () => {
        console.log('Figures',socket.id); // undefined
        Item.find().exec().then(
                    x =>{
                        
                        x.sort(function (a, b) {
                            if (a.name < b.name) {
                              return -1;
                            }
                            if (a.name > b.name) {
                              return 1;
                            }
                            return 0;
                          });
                        //   console.log(x);
                        socket.broadcast.emit("list",x);
                    } 
                );
    });

    socket.on("disconnect", () => {
        // console.log('disconnect',socket.id);
    });
})


server.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
});