import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"
import { NextRequest, NextResponse } from "next/server"
interface ErrorResponse {
    message: string;
}


export const POST = async (req: NextRequest) => {
    try {
        const { username, email, password } = await req.json()

        await axios.post(`${process.env.BACKEND_URL}/user/create`, {
            username,
            email,
            password
        })


        return NextResponse.json({
            message: "sucessfully create user"
        }, {
            status: StatusCodes.CREATED
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>
            const message = axiosError.response?.data?.message
            console.log(axiosError.response?.status, message)

            if (axiosError.response?.status === StatusCodes.BAD_REQUEST) {
                return NextResponse.json({
                    message: message || "Bad Request"
                }, {
                    status: StatusCodes.BAD_REQUEST
                })
            }
            else {

                return NextResponse.json({
                    message: message || "internal errors"
                }, {
                    status: axiosError.status || StatusCodes.INTERNAL_SERVER_ERROR
                })
            }


        }



    }
}