
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
import { useupdatepassword } from "@/hooks"
import { toast } from '@/hooks/use-toast'
import { ToastAction } from './ui/toast'
type UpdatePasswordvalues = z.infer<typeof UpdatePasswordSchema>
type props = {
    id: string
}
const UpdatePassword: React.FC<props> = ({ id }) => {
    const form = useForm<UpdatePasswordvalues>({
        resolver: zodResolver(UpdatePasswordSchema)
    })
    const { loading, updatepasswordfunc, flg } = useupdatepassword()


    const onSubmit = async (data: UpdatePasswordvalues) => {
        try {
            const response = await updatepasswordfunc({ password: data.password, id });


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
                                "Update Password"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default UpdatePassword