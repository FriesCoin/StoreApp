"use client";
import React from 'react'
import { useCookies } from 'react-cookie';

export default function SetCookie({name="",value=""}) {
    const [cookies, setCookie, removeCookie] = useCookies([name]);
    setCookie(name,value)
  return (
    <></>
  )
}
