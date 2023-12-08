"use server"
import { PrismaClient } from '@prisma/client'
import Image from 'next/image';
import Link from 'next/link';
const prisma = new PrismaClient()

export default async function Page({params} :{
    params: {id:string}
}){
    await prisma
    const id = params.id.replaceAll('-', ' ');
    const item = (await prisma.items.findMany({
        where: {
            "Name": id,
        },
      }))[0]
    const itemid = item.id
    return (
        <main>
            <div className='bg-ldcream top-[17.5%] left-[50%] absolute w-[260px] h-[420px] translate-x-[-50%] text-center'>
                <div className="text-light bg-lcream w-[225px] h-[266px] flex justify-center relative left-[7%] my-2">
                  <div className='overflow-auto whitespace-nowrap flex'>
                  {item.images.map((src)=>(
                    <Image key="src" alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="my-2 padding-[10px]" src={src} />
                  ))}
          
                  </div>
                </div>
                <h1 className="font-medium text-lg">{item.Name}</h1>
                <h2 className="font-medium text-lg" >${item.Price}.00</h2>
                <div className="font-semibold text-2xl mt-20 absolute bottom-1 left-[50%] flex flex-col translate-x-[-50%] text-center justify-center">
                    <Link className="bg-ldcream text-dark outline outline-[2px] p-3 my-4 mt-7 w-[200px] relative left-[50%] translate-x-[-50%] " href={{pathname:"/Cart",query: {itemid}}}>Add To Cart</Link>
                </div>
            </div>
            <div className="font-semibold text-2xl mt-20 absolute bottom-7 left-[50%] flex flex-col translate-x-[-50%] text-center justify-center">
                <Link className="bg-dark outline outline-[2px] p-3 w-[250px]" href="/Buy">Buy Now</Link>
            </div>
            
        </main>
    )
}