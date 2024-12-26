import axios, { AxiosError } from "axios"
import { NextRequest, NextResponse } from "next/server"
import { StatusCodes } from "http-status-codes"
interface ErrorResponse {
    message: string;
}
export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json()


        const response = await axios.post(`${process.env.BACKEND_URL}/user/login`, { email, password })

        const token = response?.data?.data?.token

        const res = NextResponse.json(
            { message: "Sign-in successful" },
            { status: StatusCodes.OK }
        );


        res.cookies.set('authToken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
        });

        return res;
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

