const express = require("express")

const app = express();

//web socket server
const socketServer = require("http").createServer(app)

//created socket using socket.io and wrapped with socket server and handled cors policy
const soc = require("socket.io")(socketServer, {cors:{
    origin:"*"
}})

const port =3008
socketServer.listen(port,()=>{
    console.log("server started at port ", port)
})


app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/views/index.html")
})

//created connection and hanled the data from index.html 
soc.on("connection",(socket)=>{
    console.log("socket connected  ", socket.id)
    //data received from server
    socket.on("chat", data=>{
        console.log(data)
        //send back to client
        socket.broadcast.emit("chat", data)
    })
})