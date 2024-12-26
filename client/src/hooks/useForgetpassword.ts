'use client'
import axios from "axios";
import { ForgetPasswordTypes } from "@/types"
import { useState } from "react"
import { ApiResponseone, ApiResponsetwo } from "@/types"


const useForgetpassword = () => {
    const [loading, setloading] = useState<boolean>(false)
    const [flg, setflg] = useState<boolean>(false)
    const forgetpasswordfunc = async (data: ForgetPasswordTypes): Promise<ApiResponseone | ApiResponsetwo> => {
        setloading(true)
        try {
            const response = await axios.post(`/api/forgetpassword`, data)
            setflg(false)
            return response

        } catch (error) {
            setflg(true)
            return error as ApiResponsetwo
        }
        finally {
            setloading(false)
        }
    }

    return { loading, flg, forgetpasswordfunc }
}

export default useForgetpassword