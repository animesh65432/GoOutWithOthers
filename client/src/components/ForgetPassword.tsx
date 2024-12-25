"use client"
import React from 'react'
import { ForgetPasswordSchema } from "../Schema"
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link';
type ForgetPasswordValues = z.TypeOf<typeof ForgetPasswordSchema>;

const ForgetPassword: React.FC = () => {
    const form = useForm<ForgetPasswordValues>({
        resolver: zodResolver(ForgetPasswordSchema)
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <div className='bg-slate-200 h-dvh flex items-center justify-center w-full'>
            <div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-lg p-4  bg-white rounded-md lg:w-[500px] md:w-[390px] sm:w-[350px] w-[300px]">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <div className='flex justify-center gap-2'>
                            <Button type="submit" className='bg-blue-700 hover:bg-blue-900 '>forgetpassword</Button>
                            <Link href="/singin"><Button type="button" className='bg-slate-300 text-slate-800 hover:bg-slate-400 hover:text-slate-900'>cancel</Button></Link>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ForgetPassword