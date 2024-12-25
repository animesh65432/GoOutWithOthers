import zod from "zod"

const signinSchema = zod.object({
    email: zod.string().email({ message: "Invalid email" }),
    password: zod.string().min(6, { message: "Password must be at least 6 characters" }).max(256, { message: "Password must be less than 256 characters" }),
})

export default signinSchema