import { Router } from "express";
import controllers from "../../controllers";
import { loginvalidation, usercreatevalidation, updatepasswordvalidation, resetpasswordvalidation } from "../../vaildation/user";
import expressJoiValidation from "express-joi-validation";

const validator = expressJoiValidation.createValidator({});

const userrouter = Router();

userrouter.post("/create", validator.body(usercreatevalidation.body), controllers.user.createuser)
    .post("/login", validator.body(loginvalidation.body), controllers.user.loginuser)
    .post("/forgetpassword", validator.body(resetpasswordvalidation.body), controllers.user.forgetpassword)
    .post("/updatepassword/:id", validator.body(updatepasswordvalidation.body), controllers.user.updatepassword)
export default userrouter;