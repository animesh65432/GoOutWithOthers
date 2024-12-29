

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

export interface ApiResponseone {
    response: {
        data: {
            message: string;
        };
    };
}

export interface ApiResponsetwo {
    data: {
        message: string;
    };
}

export type eventstypes = {
    name: string
    loacation: string
    time: Date
    photourl: string
    madeby: string
    id: number
}

export type DateOptionType = 'today' | 'tomorrow' | 'thisWeek' | 'custom';

export interface DateOptions {
    today: Date;
    tomorrow: Date;
    weekEnd: Date;
}