"use client";
import Link from 'next/link'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import DropDown from './DropDown';


const Menu = ({stateC}: {stateC:React.Dispatch<React.SetStateAction<boolean>>}) => {
    
  return (
    <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
    }}
    
    className='outline outline-1 outline-light absolute w-[75%] px-32 left-[12.5%] top-[20%] items-center justify-center py-[60%] font-medium text-light bg-dark'>

        <div className="absolute top-10 text-3xl left-[50%] translate-x-[-50%] flex flex-col">
            <Link onClick={()=>{stateC(false);} } href="/" className='my-2 text-center'>
                Home
                <span className={'h-[1px] inline-block relative left-[50%] translate-x-[-50%] bg-light -bottom-4 w-[120%]'}>&nbsp;</span>
            </Link>
            <Link onClick={()=>{stateC(false);} } href="/Browse" className='my-2 text-center'>
                Browse
                <span className={'h-[1px] inline-block relative left-[50%] translate-x-[-50%] bg-light -bottom-4 w-[120%]'}>&nbsp;</span>
            </Link>
            <DropDown/>
            <Link onClick={()=>{stateC(false);} } href="/Sell" className='my-3 text-center py-2 outline outline-1 outline-light'>
                Sell
            </Link>
        
        </div>
        <button onClick={()=>{stateC(false);} } className="absolute top-5 left-[10%] translate-x-[-50%] outline outline-1 outline-light">
            <CloseIcon fontSize="large"/>
        </button>
    </motion.div>
  )
}

export default Menu