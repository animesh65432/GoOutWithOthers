export type SingupTypes = {
    username: string
    email: string
    password: string
}

export type SigninTypes = {
    email: string
    password: string
}

export type ForgetPasswordTypes = {
    email: string
}

export type ResetPasswordTypes = {
    password: string,
    id: string
}