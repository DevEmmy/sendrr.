import React, { useEffect, useState } from 'react'
import { generateRandomString } from '../utils/generateConnectionCode,js';
import { HiArrowRight, HiChevronLeft } from 'react-icons/hi';
import { socket } from '../App';
import Main from './Main';
import { getData, saveData } from '../utils/saveData';
import { toastSuccess } from '../utils/toaster';

const Connect = ({setComponent}) => {

    const [select, setSelect] = useState(false);
    const [component, setCom] = useState()

    
  return (
    <div className='bg-[rgb(20,20,20)] text-white flex h-[100vh] gap-6 flex-col items-center justify-center px-xPadding'>
        {
            component &&
            <div className="return absolute top-6 left-xPadding text-white" onClick={()=> setCom(null)}>
                <HiChevronLeft size={30}/>
            </div>
        }

        {
            !component ?
            <>
                <div className='p-4 bg-white w-full rounded-lg text-black text-center font-bold' onClick={()=> setCom(<Create setComponent={setComponent}/>)}>
                    Create Connection
                </div>

                <div className='p-4 bg-white w-full rounded-lg text-black text-center font-bold' onClick={()=> setCom(<Join setComponent={setComponent}/>)}>
                    Join a Connection
                </div>
            </>
            :
            component
        }
    </div>
  )
}

const Create = ({setComponent})=>{
    let [code, setCode] = useState(generateRandomString())
    const [devices, setDevices] = useState([])

    socket.on("joined", (data)=> {
        let myDevices = [...devices, data]
        setDevices(myDevices)

        // toastSuccess(`${data} connected!`)
        let myData = getData()
        myData.devices = myDevices;
        saveData(myData)
    })

    socket.on("established", (data)=> {
        let toSave = {
            username: data.username,
            code: data.code,
            codeCreator: data.codeCreator
        }
        saveData(toSave);
    })

    useEffect(()=>{
        socket.emit("createConnection", code)

    }, [])

    return(
        <div className='w-full flex flex-col gap-5 '>
            <p className='font-bold text-center'>Connection Code</p>
            <p className='text-center border-2 border-gray-200 w-[100%] p-3 rounded-lg text-[1.5em] font-bold'>{code}</p>

            <div>
                {
                    devices.length > 0 ?
                    <p className='text-green-500 font-bold'>Connected Devices:</p>
                    :
                    <p className='text-red-500 font-bold'>No Device Connected</p>
                }

                {
                    devices?.map((d, i)=>{
                        return (
                            <p className='text-[0.8em]' key={i}>{d}</p>
                        )
                    })
                }
            </div>

            <button className=' bg-white text-black py-4 mt-6  rounded-lg font-bold flex w-full items-center justify-center gap-2'
            onClick={()=> {
                // handleSubmit()    
                if(devices.length == 0){
                    let myData = getData()
                    myData.devices = []
                    saveData(myData)
                }
                setComponent(<Main />)
            }}
        >
                {
                     devices.length > 0 ?
                     "Continue"
                     :
                     "Skip"
                }
             <HiArrowRight />
            </button>
        </div>
    )
}

const Join = ({setComponent})=>{

    const [code, setCode] = useState()
    const username = getData().username

    const handleCode= (e)=>{
        setCode(e.target.value)
    }

    const handleSubmit = ()=>{
        socket.emit("join", {code, username})
    }

    return(
        <div className='w-full flex flex-col gap-1 '>
            <p className='font-bold text-center'>Enter Connection Code</p>
            <input type="text" placeholder="xxxxxx" className='p-4 rounded-md my-2 w-full bg-transparent border-gray-500 text-center border-[1px] text-white text-[1.5em] font-bold' value={code} onChange={handleCode}/>
            <button className=' bg-white text-black py-4 mt-6  rounded-lg font-bold flex w-full items-center justify-center gap-2'
            onClick={()=> {
                handleSubmit()    
                // setComponent(<Connect setComponent={setComponent}/>)
            }}
        >
            Join
            </button>
        </div>
    )
}

export default Connect