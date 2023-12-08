'use server'
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
const prisma = new PrismaClient()

export async function Add(formData: FormData) {
    
    const name = Object.fromEntries(formData.entries())["text"] as string;
    const username = cookies().get("user")
    const user = await prisma.users.findUnique({
        where: {
        id: username?.value,
        }
    })
    const item = (await prisma.items.findMany({
        where: {
          id:name,
        }
    }))[0]
    if(user){
        for (let i = 0; i < user.cart.length; i++) {
            if(user?.cart[i].name == name && user.cart[i].quantity < item.Stock){
                user.cart[i].quantity+=1
                await prisma.users.update({
                    where: {
                        id: username?.value,
                    },
                    data: {
                        cart:user?.cart,
                    },
                })
            }
            

        }
    }
    return;
}
export async function Sub(formData: FormData) {
    const name = Object.fromEntries(formData.entries())["text"] as string;
    const username = cookies().get("user")
    const user = await prisma.users.findUnique({
        where: {
        id: username?.value,
        }
    })
    if(user){
        for (let i = 0; i < user.cart.length; i++) {
            if(user?.cart[i].name == name){
                
                user.cart[i].quantity-=1
                await prisma.users.update({
                    where: {
                        id: username?.value,
                    },
                    data: {
                        cart:user?.cart,
                    },
                })
                if(user.cart[i].quantity==0){
                    user.cart.splice(i,1)
                    await prisma.users.update({
                        where: {
                            id: username?.value,
                        },
                        data: {
                            cart:user?.cart,
                        },
                    })
                    return;
                }
            }

        }
    }
    return;
}