import React from 'react'
import { signupschema } from "../Schema"
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link'
import { useCreateUser } from "../hooks"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"


type SignupFormValues = z.infer<typeof signupschema>;
const Singup: React.FC = () => {
    const form = useForm<SignupFormValues>({ resolver: zodResolver(signupschema) })
    const { loading, createuserfun, flg } = useCreateUser()
    const { toast } = useToast()
    const onSubmit = async (data: SignupFormValues) => {
        try {
            const response = await createuserfun({ email: data.email, username: data.username, password: data.password });


            if ("response" in response && flg) {
                const errorMessage = response.response?.data?.message || "An error occurred";
                console.log(errorMessage, flg);

                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: errorMessage,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            } else if ("data" in response) {

                const successMessage = response.data.message || "Signup successful";
                toast({
                    description: successMessage,
                });
            } else {

                console.error("Unexpected response format", response);
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    };


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
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ConfirmPassword</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <Button
                            type="submit"
                            className={`bg-blue-700 hover:bg-blue-900 flex items-center justify-center`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                "Singup"
                            )}
                        </Button>

                        <div className='flex justify-center text-blue-700 '>
                            <div>
                                <Link href="/singin"><p>Already have an account? </p></Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Singup