"use client"
import React from 'react'
import { useRouter,usePathname } from "next/navigation";

export default function Refresh({searchParams} :{
  searchParams: {itemid:string}
}) {
    
  const router = useRouter();
  const pathname = usePathname()
  if(searchParams.itemid){
    router.replace(pathname,undefined)
    router.refresh()
  }
  return (
    <></>
  )
}
