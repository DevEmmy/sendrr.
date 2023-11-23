import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SplashScreen from './components/SplashScreen'
import CollectUsername from './components/CollectUsername'
import { io } from "socket.io-client";
import { getData, saveData } from './utils/saveData'
import Main from './components/Main'
import Connect from './components/Connect'
import { toastError, toastMessage, toastSuccess } from './utils/toaster'
import { Toaster } from 'react-hot-toast'

export let socket = io("https://sendrr-backend.onrender.com");
export let socketId;

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  socketId = socket.id
});

socket.on("error", message=> {
  console.log(message)
  toastError(message)
})

socket.on("success", (payload)=> {
  toastSuccess(payload.message);
  saveData(payload.data)
  // setComponent(<Main />)

  socket.emit("deviceConnected", payload.data)
  window.location.reload()
})

socket.on("joined", (data)=> {
  let myData = getData()
  let myDevices = myData.devices ? [...myData.devices, data] : [data];
  console.log("Connected")
  toastSuccess(`${data} connected!`)
  
  myData.devices = myDevices;
  saveData(myData)
  window.location.reload()
  // setData(myData)
})

socket.on("receive", (data)=>{
  toastMessage("New Message")
  // console.log(payload)
})


function App() {
  const [showNext, setShowNext] = useState(false)
  const [component, setComponent] = useState(null)

  useEffect(()=>{
    

    // localStorage.clear()
    let data = getData()

    if(data?.code && !data?.devices){
      data.devices = []
      saveData(data)
    }

    if(data?.code){
      socket.emit("saveUsername", data)
      setComponent(<Main />)
    }
    else if(data?.username){
      socket.emit("saveUsername", data)
      setComponent(<Connect setComponent={setComponent}/>)
    }
  }, [socket])

  
  

  return (
    <>
    {
      !component ? 
      <SplashScreen setShowNext={setShowNext} setComponent={setComponent}/>
      :
      component
    }
      <Toaster />
    </>
  )
}

export default App
