import { userTypes } from "./types/index";
declare global {
    namespace Express {
        export interface Request {
            user: userTypes;
        }
    }
}

