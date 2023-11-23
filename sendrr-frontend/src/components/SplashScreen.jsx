import React from 'react'
import { infinity } from 'ldrs'
import {motion} from "framer-motion"
import { HiArrowRight } from "react-icons/hi"
import CollectUsername from './CollectUsername'

infinity.register()

const SplashScreen = ({setShowNext, setComponent}) => {
  return (
    <div className='bg-[rgb(20,20,20)] text-white flex h-[100vh] flex-col items-center justify-center px-xPadding'>
        <motion.p

        initial= {{
            y: -50, opacity: 0.2
        }}
        animate = {{
            y: 0, opacity: 1
        }}

        transition={{
            // delay: 0.5,
            type: "spring",
             stiffness: "100",
            duration: 0.5,
            stiffness: 200
        }}
        className='text-[2.5em] font-extrabold'>
            sendrr<span className='text-primary1'>.</span>
        </motion.p>
    
        <l-infinity
        size="55"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3" 
        color="#741786" 
        ></l-infinity>

        <p className='text-center text-[0.8em] py-6 w-4/5'>Empowering Connectivity: Seamlessly Share Across <span className='font-semibold text-primary1'>Devices</span>.</p>

        <button className='absolute bottom-12 bg-white text-black py-4 left-xPadding right-xPadding rounded-lg font-bold flex  items-center justify-center gap-2'
            onClick={()=> {setShowNext(true); setComponent(<CollectUsername setComponent={setComponent}/>)}}
        >
            Continue <HiArrowRight />
        </button>
        <p className='absolute bottom-0 text-white text-[0.8em] py-4 left-xPadding right-xPadding text-center'>
            sendrr v1.0
        </p>
    </div>
  )
}

export default SplashScreen