"use server"
import React from 'react'
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
type UsersSorting = {
    "Filter": string
    "Sort":   string
    "max":    string
    "min":    string
}
export default async function Update(formData: FormData){
    const data = Object.fromEntries(formData.entries()) as unknown as UsersSorting;
    const name = cookies().get("user")
    const user = await prisma.users.findUnique({
        where: {
        id: name?.value,
        }
    })
    user!.sorting = data;
    await prisma.users.update({
        where: {
          id: name?.value,
        },
        data: {
          sorting: user?.sorting,
        },
    })
}
export async function UpdateSort(){
    const name = cookies().get("user")
    const user = await prisma.users.findUnique({
        where: {
        id: name?.value,
        }
    })
    return user!.sorting
}