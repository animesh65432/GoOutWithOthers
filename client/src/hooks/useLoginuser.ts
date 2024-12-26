'use client'
import { useState } from 'react'
import { SigninTypes } from "../types"
import axios from 'axios'
import { ApiResponseone, ApiResponsetwo } from "@/types"

const useLoginuser = () => {
    const [loading, setloading] = useState<boolean>(false)
    const [flg, setflg] = useState<boolean>(false)

    const loginuserfun = async (data: SigninTypes): Promise<ApiResponseone | ApiResponsetwo> => {
        setloading(true)
        try {

            const response = await axios.post(`/api/singin`, data)
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

    return { flg, loading, loginuserfun }
}

export default useLoginuser