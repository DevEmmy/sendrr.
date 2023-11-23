import React, { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import Wait from './Wait'
import { socket, socketId } from '../App'
import Connect from './Connect'
import { saveData } from '../utils/saveData'



const CollectUsername = ({setComponent}) => {
    const [username, setUsername] = useState()

    const handleUsername = (e)=>{
        setUsername(e.target.value)
    }

    const handleSubmit = ()=>{
        const data = {socketId, username}
        saveData(data)
        socket.emit("saveUsername", data)
    }

  return (
    <div className='bg-[rgb(20,20,20)] text-white flex h-[100vh] flex-col items-center justify-center px-xPadding'>
        <p className='font-bold'>Let's Get Personal: Drop Your Username Charm Here!</p>
        <input type="text" placeholder="Emmy's phone/pc" className='p-4 rounded-md my-2 w-full bg-transparent border-gray-500 text-[0.8em] border-[1px] text-white' value={username} onChange={handleUsername}/>

        <button className=' bg-white text-black py-4 mt-6  rounded-lg font-bold flex w-full items-center justify-center gap-2'
            onClick={()=> {
                handleSubmit()    
                setComponent(<Connect setComponent={setComponent}/>)
            }}
        >
            Continue <HiArrowRight />
        </button>
        
    </div>
  )
}

export default CollectUsername