"use client"
import React from 'react'

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
import { useForm } from "react-hook-form"
import { signinSchema } from "../Schema"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link'

type SigninFormValues = z.infer<typeof signinSchema>;
const Singin: React.FC = () => {
    const form = useForm<SigninFormValues>({ resolver: zodResolver(signinSchema) })

    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <div className='h-screen bg-slate-200 grid md:grid-cols-2 grid-cols-1 lg:gap-12 md:gap-9 sm:gap-7 gap-2 lg:p-[150px] md:p-[100px] sm:p-[60px] p-[20px]'>
            <div>
                <p className='text-blue-700 font-bold text-[50px]'>GoOut</p>
                <p className=' lg:text-[20px] md:[14px] sm:[8px]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-lg p-4 bg-white rounded-md">
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <Button type="submit" className='bg-blue-700 hover:bg-blue-900'>login</Button>

                        <div className='flex justify-center gap-2'>
                            <div>
                                <Link href='/forgetpassword'>
                                    <p className='text-blue-700'>Forget Password ?</p>
                                </Link>
                            </div>
                            <div>
                                <Link href='/singup'>
                                    <p className='text-blue-700'>Did not have an account</p>
                                </Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Singin