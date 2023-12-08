"use client";
import React, {useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import Button from './Button';
import SortIcon from '@mui/icons-material/Sort';
import { parseCookies } from 'nookies'
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
function Reset(items:item[]){
    var listedItems = [] as unknown as [item]
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      const filter = (parseCookies()["Filter"])
      const min = Number(parseCookies()["min"])
      const max = Number(parseCookies()["max"]) 

      if(element.Type == filter && element.Price >= min && (element.Price <= max || max == 0)){
        listedItems.push(element)
      }
      else if(filter == "None" && element.Price >= min && (element.Price <= max || max == 0)){
        listedItems.push(element)
      }
    }
    const filter = (parseCookies()["Sort"])
    if(filter == "PriceL"){
        listedItems.sort(function(a, b) {
            return a.Price - b.Price;
        })
    }
    if(filter == "PriceH"){
        listedItems.sort(function(a, b) {
            return a.Price - b.Price;
        }).reverse()
    }
    if(filter == "ABC"){
        listedItems.sort()
    }
    if(filter == "CBA"){
        listedItems.sort().reverse()
    }
    if(filter == "Featured"){
        listedItems.reverse()
    }
    return listedItems;
}
export default function Manager({items}:{items:item[]}) {
    const [listedItems,setItems] = useState(items)

  return (
    <div>
        <div className="text-light top-[20%] absolute left-[30%] translate-x-[-50%]">
        <Button className='flex' Reset={Reset} setItems={setItems} items={items}>
          <>
            <SortIcon/>
            <h1 className='underline'>Filter and sort</h1>
          </>
        </Button>
      </div>
      <ul 
        className="text-light top-[25%] grid grid-cols-2 absolute left-[50%] translate-x-[-50%] gap-[16px] w-[300px]">
        {listedItems.map((item)=>(
            <li
            key={item.Name}
            className="inline-block my-[6px] text-light group w-[142px] h-[180px] hover:shadow-2xl"
            >
            <Link href={"Products/"+item.Name.replaceAll(' ', '-')}>
              <div className="bg-lcream group-hover:brightness-75 items-center">
                <Image alt="" width={132} height={230} className="my-2 mx-1 relative top-1" src={item.images[0]} />
                <h1 className="relative left-[4%] font-medium text-sm">{item.Name}</h1>
                <h2 className="relative left-[7%] font-medium" >${item.Price}.00</h2>
              </div>
            </Link>
              
              
            </li>
          ))}
          
      </ul>
    </div>
  )
}
