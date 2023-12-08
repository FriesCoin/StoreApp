"use client";
import React, { useState } from "react";
import Link from "next/link";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { createPortal } from "react-dom";
import Menu from "./Menu";

const NavBar = ()=>{
    const [isSidebar, setSideBar] = useState(false);
    return (
        <>
        <header className="w-full px-32 py-10 font-medium flex text-light items-center justify-between bg-dark shadow-2xl fixed z-50">
            <nav className="absolute right-[80%] top-5 translate-x-[-50%]">
                <button onClick={()=>{setSideBar(true);console.log(isSidebar)}}>
                <MenuIcon fontSize="large"/>
                </button>
            </nav>
            <nav className="absolute left-[50%] top-5 translate-x-[-50%]">
                <Link href="/" className="text-2xl">Home</Link>
            </nav>
            <div className="absolute left-[88%] top-5 translate-x-[-50%]">   
                <Link href="/Cart">
                <LocalMallOutlinedIcon fontSize="large"/>
                </Link>
            </div>
        </header>
        {isSidebar && createPortal(
        <Menu stateC={setSideBar}/>,
        document.body
        )}
        </>
    )
}
export default NavBar;