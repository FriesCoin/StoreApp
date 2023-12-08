import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { cookies } from 'next/headers'
import { AddButton, SubButton } from '../Button';
import Refresh from './Refresh';

const prisma = new PrismaClient()
const itemType = {
  name:"",
  quantity:0,
  price: 0,
}
function getTotal(cart=[itemType]){
  var total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price*cart[i].quantity;
  }

  return total
}
async function Items({item=itemType}){
  const itemp = (await prisma.items.findMany({
    where: {
      id:item.name,
    }
  }))[0]
  return (
    <div
            key={item.name}
            className='h-[130px] bg-lcream w-[300px] flex my-4 text-center relative'
            >
              
              <Image className="m-2" alt="" width={900/8} height={1200/8} src={itemp.images[0]}/>
              <div  className="text-center font-medium  h-[25px] text-light      absolute top-3  left-[42.5%] w-[160px]">
                <Link href={"Products/"+itemp.Name.replaceAll(' ', '-')}>{itemp.Name}</Link>
              <span className='inline-block w-full'>&nbsp;</span>
              </div>
              <h1   className='text-left mt-2 text-sm   h-[30px] text-[#efeae2] absolute top-6     right-[3px]'>${itemp.Price}.00</h1>
              <div className=' text-center    text-xs   h-[30px] text-light     absolute bottom-4  right-4 '>
                <div className='w-[120px] h-[30px] outline outline-2 items-center text-sm font-medium text-center'>
                  <SubButton className='relative -left-[30%] top-[7%]' name={item.name}><RemoveIcon/></SubButton>
                  <h1 className='w-5 text-center relative left-[43%] -top-6 text-xl'>{item.quantity}</h1>
                  <AddButton className='relative -right-[30%] bottom-[165%]' name={item.name}><AddIcon/></AddButton>
                </div>
              </div>
    </div>
  )
}
export default async function Cart({searchParams} :{
  searchParams: {itemid:string}
}) {
  const name = cookies().get("user")
  const user = await prisma.users.findUnique({
    where: {
      id: name?.value,
    }
  })
  if(searchParams.itemid){

    const item = (await prisma.items.findMany({
      where: {
        id:searchParams.itemid,
      }
    }))[0]
    if(user?.cart.some(e => e.name == searchParams?.itemid)){
      for(var i in user?.cart){
        
        if(user?.cart[i].name == searchParams?.itemid && user?.cart[i].quantity < item.Stock){
          user.cart[i].quantity+=1
          await prisma.users.update({
            where: {
              id: name?.value,
            },
            data: {
              cart:user?.cart,
            },
          })
        }
      }
    }
    else {
      if(user!.cart.length < 3){
        user?.cart.push({name:searchParams?.itemid,quantity:1,price:item?.Price})
        await prisma.users.update({
          where: {
            id: name?.value,
          },
          data: {
            cart:user?.cart,
          },
        })
      } 
    }
  }
  const items = await prisma.items.findMany({
    where: {
      Release: true,
    },
  })
  if (user?.cart.length==0){
    return (
      <main>
          <div className=' text-light absolute top-[25%]'>
            <div>
              <h1 className='text-center font-semibold text-4xl my-10'>
                  YOUR SHOPPING CART IS EMPTY
              </h1>
              <div className=" text-center font-semibold text-4xl mt-20">
                <Link className="bg-dark py-5 px-5" href="/Browse">Browse All</Link>
              </div>
              <h1 className=' text-center font-semibold text-4xl mt-20'>
                Recomended
              </h1>
            </div>
              <ul 
          className="text-light grid grid-cols-2 absolute left-[50%] translate-x-[-50%] gap-[16px] w-[300px]">
  
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
          
      <Refresh searchParams={searchParams}/>
      </main>
    )
  }
  return (
    <main className=' text-light w-full'>
      <h1 className='text-2xl w-[120px] top-[25%] text-dark font-semibold align-bottom absolute left-7 '>Your Cart </h1>
      <div>
        <div className="text-[#d5c7b3] absolute top-[35%] w-full">
          <div>
            <h1 className='text-xs absolute left-5' >PRODUCTS</h1>
            <h1 className="text-xs absolute right-7">
                  Total
            </h1>
            <span className="h-[2px] inline-block bg-[#af9670] absolute left-[50%] translate-x-[-50%] -bottom-[20px] w-[90%]">&nbsp;</span>
          </div>
        </div>
        <div className="text-[#d5c7b3] absolute top-[40%] left-[50%] -translate-x-[50%]">
          {user?.cart.map((item)=>(
            <Items key={item.name} item={item}/>
          ))}
        </div>
        <span className="h-[2px] inline-block bg-[#af9670] absolute left-[50%] translate-x-[-50%] -bottom-[70px] w-[90%]">&nbsp;</span>
        <div className='absolute -bottom-[200px] left-[50%] -translate-x-[50%]'>
          <div className='w-[350px] text-center'>
            <h1>Estimated Total ${getTotal(user?.cart)}.00 USD</h1>
            <small className="text-xs">Taxes, discounts and shipping calculated at checkout</small>
          </div>
          <div className="w-[343px] h-[50px] mt-5 bg-dark text-center align-middle items-center justify-center">

            <Link href="/" className='relative top-3'>Check Out</Link>
          </div>
        </div>
        
        <div className='absolute -bottom-[200px] h-1 left-[50%] -translate-x-[50%]'>&nbsp;</div>
        
      </div>
      <Refresh searchParams={searchParams}/>
    </main>
  )
}
