import { Response } from "express";

const handlerResponse = (res: Response, status: number, message: string, success: boolean, data?: any) => {
    res.status(status).json({ message, data, success });
    return;
};

export default handlerResponse;