const express = require("express")

const app = express();
const socketServer = require("http").createServer(app)

const soc = require("socket.io")(socketServer, {cors:{
    origin:"*"
}})

const port =3008
socketServer.listen(port,()=>{
    console.log("server started at port ", port)
})


app.use(express.json())

app.get("/hello",(req, res)=>{
    res.send("hello world")
})

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/views/index.html")
})

soc.on("conn",(socket)=>{
    console.log("socket connected  ", socket.id)
    soc.on("chat", data=>{
        console.log(data)
    })
})