"use client";
import React, { ChangeEvent, ReactNode ,useState} from 'react'
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import Update from './Update';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

interface item {
    id :         string
    Description: string
    Name :       string
    Price :      number
    Release :    boolean
    Stock :      number
    Type :       string
    images :     string[]
}
interface Props {
    children?: ReactNode,
    className?: string,
    Reset: Function,
    setItems: React.Dispatch<React.SetStateAction<item[]>>,
    items:item[]
    // any props that come into the component
}
const Menu = ({stateC,Reset,setItems,items}: {stateC:React.Dispatch<React.SetStateAction<boolean>>,Reset:Function,setItems: React.Dispatch<React.SetStateAction<item[]>>,items:item[]}) => {
    const cookies = parseCookies()
    const [sort,setSort] = useState(cookies)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCookie(null,name, value)
        setSort((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleChangeE = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setCookie(null,name, value);
        setSort((prevData) => ({ ...prevData, [name]: value }));
    };
    return (
      <form
      action={Update}
      onSubmit={()=>{stateC(false);} } 
      className='absolute w-[75%] px-32 left-[12.5%] top-[20%] items-center justify-center py-[60%] font-medium text-light bg-dark'>
  
          <div className="absolute top-12 text-3xl left-[50%] translate-x-[-50%] text-center flex flex-col">
            <h2>Price</h2>
            <div className="text-xl flex my-4">
                <div className='w-[75px] h-[35px] rounded-lg flex text-center outline outline-2'>
                    <h6 className="relative top-1 ml-2">$</h6>
                    <div>
                    <input name="min" type="number"  value={sort.min} onChange={handleChange} className="w-[75px] ml-1 h-[35px] bg-transparent text-light border-none outline-none placeholder-light relative " placeholder='Min'/>
                    </div>
                </div>
                <h1 className="mx-3">To</h1>
                <div className='w-[75px] h-[35px] rounded-lg flex text-center outline outline-2'>
                    <h6 className="relative top-1 ml-2">$</h6>
                    <div>
                    <input name="max" type="number" value={sort.max}  onChange={handleChange} className="w-[75px] ml-1 h-[35px] bg-transparent text-light border-none outline-none placeholder-light relative " placeholder='Max'/>
                    </div>
                </div>
            </div>
            <h2>Sort by</h2>
            <div>
                <select name="Sort" value={sort.Sort} onChange={handleChangeE} className='bg-transparent outline outline-2 rounded-lg my-6 py-1 text-center text-xl'>
                    <option value="Featured" className='bg-transparent text-sm text-dark' >Featured</option>
                    <option value="ABC" className='bg-transparent text-sm text-dark'>Alphabetically, A-Z</option>
                    <option value="CBA" className='bg-transparent text-sm text-dark' >Alphabetically, Z-A</option>
                    <option value="PriceL" className='bg-transparent text-sm text-dark' >Price, low to high</option>
                    <option value="PriceH" className='bg-transparent text-sm text-dark' >Price, high to low</option>
                    <option value="DateO" className='bg-transparent text-sm text-dark' >Date, old to new</option>
                    <option value="DateN" className='bg-transparent text-sm text-dark' >Date, new to old</option>
                </select>
            </div>
            <h2>Filter</h2>
            <div>
                <select name="Filter" value={sort.Filter} onChange={handleChangeE} className='bg-transparent outline outline-2 rounded-lg my-6 py-1 px-2 text-center text-xl'>
                    <option value="None" className='bg-transparent text-sm text-dark' >None</option>
                    <option value="T-Shirt" className='bg-transparent text-sm text-dark' >T-Shirt</option>
                    <option value="Shoes" className='bg-transparent text-sm text-dark' >Shoes</option>
                </select>
            </div>
          </div>
          <button onClick={()=>{stateC(false);} } className="absolute top-5 left-[10%] translate-x-[-50%]">
              <CloseIcon fontSize="large"/>
          </button>
          <button type="submit" onClick={()=>{setItems(Reset(items))}} className="absolute bottom-5 -right-7 translate-x-[-50%] outline outline-1 px-7 py-1">
              Apply
          </button>
          <button onClick={()=>{stateC(false);} } className="absolute bottom-5 left-[70px] translate-x-[-50%] underline px-7 py-1">
              Remove All
          </button>
      </form>
    )
  }
  
export default function Button({children,Reset,setItems,items,...props}:Props) {
    const [isSidebar, setSideBar] = useState(false);
    
  return (
    <>
    <button {...props} onClick={()=>{setSideBar(true)}}>
        {children}
    </button>
    {isSidebar && createPortal(
        <Menu Reset={Reset} stateC={setSideBar} setItems={setItems} items={items}/>,
        document.body
    )}
    </>
  )
}
