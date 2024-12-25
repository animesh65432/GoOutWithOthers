import * as z from "zod"

const SignupSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(256, { message: "Username must be less than 256 characters" }),
    email: z.string()
        .email({ message: "Invalid email" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(256, { message: "Password must be less than 256 characters" }),
    confirmPassword: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(256, { message: "Password must be less than 256 characters" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default SignupSchema;