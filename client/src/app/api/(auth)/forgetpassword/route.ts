import { NextResponse, NextRequest } from "next/server"
import axios, { AxiosError } from "axios"
import { StatusCodes } from "http-status-codes"

interface ErrorResponse {
    message: string;
}

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json() as { email: string }

        const response = await axios.post(`${process.env.BACKEND_URL}/user/forgetpassword`, { email })

        console.log(response)

        return NextResponse.json({
            message: "Sucessfully sent it"
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
                    message: message || "internal errors"
                }, {
                    status: axiosError.status || StatusCodes.INTERNAL_SERVER_ERROR
                })
            }

        }


    }
}