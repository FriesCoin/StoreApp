"use client";
import React, { ReactNode , useState, useTransition} from 'react'
import { Add, Sub } from './cal'
import { useRouter } from 'next/navigation';
interface Props {
    children?: ReactNode,
    className?: string,
    name?: string
    // any props that come into the component
}
export function AddButton({children, className,name}:Props ) {
  const router = useRouter();
  async function Refresh(formData: FormData) {
    Add(formData)
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
    router.refresh();
  }
  return (
    <form action={Refresh} className={className} >
        <input name="text" type="hidden" className="" value={name} />
        <button type="submit" >{children}</button></form>
  )
}
export function SubButton({children, className,name}:Props ) {
  const router = useRouter();
    async function Refresh(formData: FormData) {
      
        Sub(formData)
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
    }
    return (
      <form action={Refresh} className={className}>
        <input name="text" type="hidden" className="" value={name} />
          <button type="submit" >{children}</button></form>
    )
  }
  
