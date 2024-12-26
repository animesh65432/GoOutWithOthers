import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server"

interface ErrorResponse {
    message: string
}


export const PUT = async (req: NextRequest) => {
    try {

        const { password } = await req.json()
        const id = req.nextUrl.searchParams.get("id");

        console.log(`${process.env.BACKEND_URL}/user/updatepassword/${id}`)

        await axios.post(`${process.env.BACKEND_URL}/user/updatepassword/${id}`, { password })

        return NextResponse.json({
            message: "update password sucessfully"
        }, {
            status: StatusCodes.OK
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
                    message: message || "interval server errors"
                }, {
                    status: axiosError.status || StatusCodes.INTERNAL_SERVER_ERROR
                })
            }

        }



    }
}