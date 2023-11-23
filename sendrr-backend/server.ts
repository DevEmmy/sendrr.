import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import corsOptions from './src/config/cors';
require("dotenv").config()
import * as http from "http";
import { Socket } from 'socket.io';
import { Sendrr, SocketData } from './src/interfaces/socketInterface';
import Container from 'typedi';
import DeviceService from './src/services/DeviceService';


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

const port = String(process.env.PORT) || 3030;
      
// Set up your routes and middleware here
app.use(cors({
  origin: "*"
}));
express.urlencoded({limit:"50mb", extended: false})
express.json({limit:"50mb"})
     
// Run MongoDB
// mongoose.connect(process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/sendrr-backend`)
// const connection = mongoose.connection
// connection.once('open', ()=>{console.log('Database running Successfully')});
      
//render the html file
app.get('/', (req, res) => {
res.sendFile(__dirname + '/public/index.html');
});

// Socket Controllers

const deviceServices = Container.get(DeviceService)

let clientAddresses: SocketData[] = []

io.on("connection", (socket:  any)=>{
  // console.log("A User is connected")

  socket.on("disconnect", ()=>{
    // clientAddresses = clientAddresses.filter(i => i.socketId == socket.id)
    console.log(clientAddresses)
    console.log("A User disconnected!")
  })


    socket.on("saveUsername", (data: SocketData)=> {
      data.ip = socket.handshake.address
      data.socketId = socket.id
      // console.log(socket.request.connection.remoteAddress)
      // deviceServices.save(da
      clientAddresses.push(data);
      console.log(clientAddresses)

      socket.to(data.socketId).emit("saved", {message: "Saved"})
    })

    socket.on("createConnection", (code: string)=> {
      let device : SocketData = getDeviceBySocketId(socket.id, clientAddresses);
      device.code = code;
      device.codeCreator = true

      console.log(clientAddresses)

      // console.log(device)
      io.to(device.socketId).emit("established", device)
    })

    socket.on("join", (data: any)=>{
      let device : SocketData = getDeviceByUsername(data.username, clientAddresses);
      
        console.log(device)
        device.code = data.code;

        console.log(clientAddresses)

        let creator: any = clientAddresses.find((i)=> i.code == data.code && i.codeCreator == true)
        if(creator){
          device.codeCreator = false;

          device.devices = [creator?.username]

          console.log(creator)
          
          io.to(socket.id).emit("success", {
            message: `Connected to ${creator?.username}`,
            data: device
          })
        }
       else{ 
          console.log("error")
          io.to(socket.id).emit("error", "Connection not found")
      }
    })

    socket.on("deviceConnected", (device: any)=>{
      let code = device.code;
      let creatorLists = clientAddresses.filter((i)=> i.code == code && i.codeCreator == true)

      let creator = creatorLists[creatorLists.length - 1]
      
      console.log(creator)
      io.to(creator?.socketId).emit("joined", device.username)
    })

   // Custom logic to check if clients are on the same network
   socket.on('checkNetwork', (data: SocketData) => {
    const clientIp = data.ip; // Get IP address from the client

    // Check if clients share the same network
    const connectedItems = checkIfOnSameNetwork(data, clientAddresses);

    for(let i=0; i <= connectedItems.length; i++){
        const device = connectedItems[i]
        socket.to(device.socketId).emit("networkStatus", {status: "Connected", devices: connectedItems})
    }

    // Respond to the client
    // socket.emit('networkStatus', { areOnSameNetwork });
  });

  socket.on("send", (content: Sendrr)=> {
    let sendrrContent = content.content;
    let device = getDeviceByUsername(content.receiverUsername, clientAddresses)
    if(device){
      let socketId = device.socketId
    // let device = 
    console.log(socketId)

    io.to(socketId).emit("receive", {content})
    }
    
    else{ 
      console.log("error")
      io.to(socket.id).emit("error", "Device Not Connected")
  }
  })
})
      
const checkIfOnSameNetwork= (data: SocketData, clientAddresses: SocketData[])=> {
  return clientAddresses.filter((i)=> i.ip === data.ip)
}

const getDevice = (username: string, connectedItems: SocketData[])=> {
  return connectedItems.find((i)=> i.username === username)
}

const getDeviceByUsername = (username: string, connectedItems: SocketData[]): SocketData | any => {
  let items = connectedItems.filter((i)=> i.username === username)
  return items[items.length - 1];
}

const getDeviceBySocketId = (socketId: string, connectedItems: SocketData[]): SocketData | any => {
  return connectedItems.find((i)=> i.socketId === socketId)
}

const getDeviceByCode = (code: string, connectedItems: SocketData[]): SocketData | any => {
  return connectedItems.find((i)=> i.code === code )
}

// Run Server
server.listen(port, () => {
console.log(`Server running on port ${port}`);
      
  });
        