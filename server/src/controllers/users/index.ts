import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import handlerResponse from "../../handlerresponse"
import db from "../../db"
import bycrpt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import nodemailer from "nodemailer"



const createuser = async (req: Request, res: Response) => {

    try {

        const { email, password, username } = req.body

        const hashpassword = await bycrpt.hash(password, 10)
        const chechkuser = await db.user.findFirst({
            where: {
                email,
            }
        })

        if (chechkuser) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "User already exists", false)
            return
        }

        await db.user.create({
            data: {
                email,
                password: hashpassword,
                username
            }
        })

        handlerResponse(res, StatusCodes.OK, "User created successfully", true)
        return
    } catch (error) {
        console.log(error, "Errors in createuser controller")
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)
        return
    }

}

const loginuser = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body

        const user = await db.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "User not found", false)
            return
        }

        const isvalid = await bycrpt.compare(password, user.password)

        if (!isvalid) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "Invalid password", false)
            return
        }

        const token = jsonwebtoken.sign({ email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "24h" })


        res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        handlerResponse(res, StatusCodes.OK, "Login success", true, { token })
        return

    } catch (error) {
        console.log(error, "Errors in loginuser controller")
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)
        return

    }
}


const forgetpassword = async (req: Request, res: Response) => {
    try {

        const { email } = req.body

        const user = await db.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "User not found", false)
            return
        }

        const forgetpassword = await db.forgerPassword.create({
            data: {
                userId: user.id,
                active: true,
            }
        })

        const transpoter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })

        console.log(forgetpassword)

        const mailoption = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "Reset password",
            text: `please reset your password by clicking on the link below http://localhost:4000/resetpassword/${forgetpassword.id}`
        }

        const sendMailtouser = await transpoter.sendMail(mailoption)


        handlerResponse(res, StatusCodes.OK, "Email sent successfully", true)
        return
    } catch (error) {
        console.log(error, "Errors in forgetpassword controller")
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)
        return

    }
}


const updatepassword = async (req: Request, res: Response) => {
    try {
        const { password } = req.body

        if (!req.params.id) handlerResponse(res, StatusCodes.BAD_REQUEST, "id did not provided", false)



        const forgetpassword = await db.forgerPassword.findUnique({
            where: { id: req.params.id }
        })
        console.log(req.params.id)

        if (!forgetpassword || forgetpassword.active === false) {
            handlerResponse(res, StatusCodes.BAD_REQUEST, "Invalid link or link has experied", false)
            return
        }

        const hashpassword = await bycrpt.hash(password, 10)

        const user = await db.user.update({
            where: {
                id: forgetpassword.userId
            },
            data: {
                password: hashpassword
            }
        })

        await db.forgerPassword.update({
            where: {
                id: forgetpassword.id
            },
            data: {
                active: false
            }
        })

        const transpoter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })

        const mailoption = {
            from: process.env.NODEMAILER_EMAIL,
            to: user.email,
            subject: "Password updated",
            text: `Your password has been updated successfully`
        }

        await transpoter.sendMail(mailoption)

        handlerResponse(res, StatusCodes.OK, "Password updated successfully", true)
        return
    } catch (error) {
        console.log(error, "Errors in updatepassword controller")
        handlerResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error", false)
        return
    }
}

export { createuser, loginuser, forgetpassword, updatepassword }