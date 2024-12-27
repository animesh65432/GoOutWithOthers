import { NextFunction, Request, Response } from "express"
import handlerResponse from "./handlerresponse"
import { StatusCodes } from "http-status-codes"
import jsonwentoken from "jsonwebtoken"
import db from "./db"


type verifybody = {
    email: string
}


const middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.body

        if (!token) {
            handlerResponse(res, StatusCodes.UNAUTHORIZED, "Unauthorized", false)
            return
        }

        const verify = jsonwentoken.verify(token, process.env.JWT_SECRET as string) as verifybody

        if (!verify) {
            handlerResponse(res, StatusCodes.UNAUTHORIZED, "Unauthorized", false)
            return
        }
        const checkuser = await db.user.findUnique({
            where: {
                email: verify.email
            }
        })

        if (!checkuser) {
            handlerResponse(res, StatusCodes.UNAUTHORIZED, "Unauthorized", false)
            return
        }

        req.user = checkuser
        next()
    } catch (error) {
        console.log(error, "Errors in middleware ")

        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)
        return

    }
}


export default middleware