
import Joi from "joi";

const usercreatevalidation = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required().min(6).max(20).messages({
            "string.empty": "Password is required.",
            "any.required": "Password is a required field.",
            "string.min": "Password must be at least 6 characters long.",
            "string.max": "Password cannot exceed 20 characters."
        }),
        email: Joi.string().required().email().messages({
            "string.empty": "Email is required.",
            "any.required": "Email is a required field.",
            "string.email": "Please provide a valid email address."
        })

    })
}


const loginvalidation = {
    body: Joi.object({
        email: Joi.string()
            .required()
            .email()
            .messages({
                "string.empty": "Email is required.",
                "any.required": "Email is a required field.",
                "string.email": "Please provide a valid email address."
            }),
        password: Joi.string()
            .required()
            .min(6)
            .max(30)
            .messages({
                "string.empty": "Password is required.",
                "any.required": "Password is a required field.",
                "string.min": "Password must be at least 6 characters long.",
                "string.max": "Password cannot exceed 30 characters."
            })
    })
};

const resetpasswordvalidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
    })
}

const updatepasswordvalidation = {
    body: Joi.object({
        password: Joi.string().required().min(6).max(20).messages(
            {
                "string.empty": "Password is required.",
                "any.required": "Password is a required field.",
                "string.min": "Password must be at least 6 characters long.",
                "string.max": "Password cannot exceed 20 characters."
            }
        )
    })
}
export { usercreatevalidation, loginvalidation, resetpasswordvalidation, updatepasswordvalidation }