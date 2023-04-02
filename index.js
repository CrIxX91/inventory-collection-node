const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const { dbConection } = require('./database/config');
// const { pusher } = require('./puhser/pusherlib');

// const Item = require("./models/ItemModel");


// const app = express();

// const server = http.createServer(app,{
//     pingTimeout: 60000
//   });
// const io = new Server(server,{
//     cors:{
//         origin:'*',
//         methods: ["GET", "POST"],
//     }, 
//     // transports: ['websocket', 'polling', 'flashsocket'],
    
// });

// if (process.env.NODE_ENV === 'development') {
//     io.engine.on('initial_headers', (headers, req) => {
//         headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
//         headers['Access-Control-Allow-Credentials'] = true;
//     });

//     io.engine.on('headers', (headers, req) => {
//         headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
//         headers['Access-Control-Allow-Credentials'] = true;
//     });
// }

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
app.use('/api/test',require('./routes/test'))
// app.use('/api/pusher', require('./routes/pusher'));


// const res = await pusher.get({ path: "/channels/collection-inventory-production" });
// if (res.status === 200) {
//   const body = await res.json();
//   const channelInfo = body.channels;
// }

// app.router.get('/api/test',[], (req,res)=>{

//     setInterval(() => {
//         res.status(200).json({
//             success:true,
//             message:'Test'
//         });
//     }, 1000);
    
// });



// io.on('connection',(socket)=>{
//     socket.on("Figures", () => {
//         console.log('Figures',socket.id); // undefined
//         Item.find().exec().then(
//                     x =>{
                        
//                         x.sort(function (a, b) {
//                             if (a.name < b.name) {
//                               return -1;
//                             }
//                             if (a.name > b.name) {
//                               return 1;
//                             }
//                             return 0;
//                           });
//                         //   console.log(x);
//                         socket.broadcast.emit("list",x);
//                     } 
//                 );
//     });

//     socket.on("disconnect", () => {
//         // console.log('disconnect',socket.id);
//     });
// })

app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
});

// server.listen(process.env.PORT,()=>{
//     console.log(`servidor corriendo en puerto ${process.env.PORT}`)
// });