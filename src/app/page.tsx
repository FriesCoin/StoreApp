import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import SetCookie from "./cookie";
import { ObjectId } from 'bson';
const prisma = new PrismaClient()
;

export default async function Home() {

  const items = await prisma.items.findMany({
    where: {
      Release: true,
    },
  }) 
  const item = await prisma.release.findFirst()
  return (
    <main>
        <div className="text-light top-[17.5%] left-[20%] absolute bg-lcream w-[225px] h-[266px] flex justify-center">
          
          <h1 className="text-3xl mx-7 relative -left-[90px] font-semibold">NEW RELEASE</h1>
          
        </div>
        <Image alt="" width={180} height={340} className="my-4 top-[17.5%] mx-4 absolute right-[0] " src={item!.images || ""} />
        <div className="text-light top-[62%] absolute">
          <h1 className="text-4xl mx-6 font-semibold">SHOP NOW!</h1>
          <h1 className="text-3xl mx-6 font-semibold">Or Sell.</h1>
        </div>
        <div>
        <ul 
        className="text-light top-[75%] grid grid-cols-2 absolute left-[50%] translate-x-[-50%] gap-[16px] w-[300px]"
        >
          {items.map((item)=>(
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
    </main>
  )
}
