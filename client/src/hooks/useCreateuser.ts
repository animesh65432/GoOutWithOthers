'use client';

import axios from 'axios';
import { useState } from 'react';
import { SingupTypes } from "../types";
import { ApiResponseone, ApiResponsetwo } from "@/types"

interface useCreateusertypes {
    loading: boolean;
    flg: boolean;
    createuserfun(data: SingupTypes): Promise<ApiResponseone | ApiResponsetwo>;
}

const useCreateuser = (): useCreateusertypes => {
    const [loading, setLoading] = useState<boolean>(false);
    const [flg, setFlg] = useState<boolean>(false);

    const isApiResponseone = (data: any): data is ApiResponseone => {
        return data && typeof data.response === 'object' && data.response?.data?.message;
    };

    const createuserfun = async (data: SingupTypes): Promise<ApiResponseone | ApiResponsetwo> => {
        setLoading(true);

        try {
            const response = await axios.post<ApiResponseone>('/api/singup', data);
            setFlg(false);
            return response.data;
        } catch (error: any) {
            setFlg(true);
            if (isApiResponseone(error)) {
                return error as ApiResponseone;
            }
            return error as ApiResponsetwo;
        } finally {
            setLoading(false);
        }
    };

    return { flg, loading, createuserfun };
};

export default useCreateuser;
