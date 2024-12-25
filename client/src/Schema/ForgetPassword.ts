import z from "zod"

const ForgetPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
})

export default ForgetPasswordSchema