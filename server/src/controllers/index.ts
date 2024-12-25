import { createuser, loginuser, forgetpassword, updatepassword } from "./users"

const controllers = {
    user: { createuser, loginuser, forgetpassword, updatepassword }
}

export default controllers