import React from 'react'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers';
import UpdateSortS from './Setup';
import Manager from './Manager';
const prisma = new PrismaClient()
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
    if(element.Type == (cookies().get("Filter"))?.value){
      listedItems.push(element)
    }
  }
  return listedItems;
}
export default async function Browse() {
  const items = await prisma.items.findMany()
  const name = cookies().get("user")
  const user = await prisma.users.findUnique({
    where: {
      id: name?.value,
    }
  })
  return (
    <div >
      <UpdateSortS sorting={user!.sorting}/>
      <Manager items={items}/>
    </div>
  )
}
