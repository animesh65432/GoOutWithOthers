"use client"
import React from 'react'
import { UpdatePasswordSchema } from "@/Schema"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
type UpdatePasswordvalues = z.infer<typeof UpdatePasswordSchema>
const UpdatePassword: React.FC = () => {
    const form = useForm<UpdatePasswordvalues>({
        resolver: zodResolver(UpdatePasswordSchema)
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <div className='bg-slate-200 flex items-center justify-center h-dvh w-full'>
            <div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-lg p-4 lg:w-[500px] md:w-[390px] sm:w-[350px] w-[300px] bg-white rounded-md">

                        <FormField
                            control={form.control}
                            name="password"
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
                            name="confirmPassword"
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
                        <Button type="submit" className='bg-blue-700 hover:bg-blue-900'>update password</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default UpdatePassword