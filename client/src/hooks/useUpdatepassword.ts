'use client'
import axios from "axios";
import { useState } from "react";
import { ResetPasswordTypes } from "@/types"
import { ApiResponseone, ApiResponsetwo } from "@/types"

const useupdatepassword = () => {
    const [loading, setloading] = useState<boolean>(false)
    const [flg, setflg] = useState<boolean>(false)

    const updatepasswordfunc = async (data: ResetPasswordTypes): Promise<ApiResponseone | ApiResponsetwo> => {
        setloading(true)
        try {
            const response = await axios.put(`/api/updatepassword?id=${data.id}`, data)
            setflg(false)
            setloading(false)
            return response
        } catch (error) {
            console.log(error)
            setflg(true)
            setloading(false)
            return error as ApiResponsetwo
        }
    }

    return { loading, flg, updatepasswordfunc }
}

export default useupdatepassword