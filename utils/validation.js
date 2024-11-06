import Joi from "joi";

// Custom validation messages
const customMessages = {
    "string.min": "{{key}} must be at least {{limit}} characters long",
    "string.max": "{{key}} must be at most {{limit}} characters long",
    "string.email": "{{key}} must be a valid email address",
    "any.required": "{{key}} is required",
};

// Registration validation schema
export const registerValidation = (data) => {
    const schema = Joi.object({
        fullname: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }).options({ messages: customMessages });
    return schema.validate(data);
};

// Login validation schema
export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }).options({ messages: customMessages });
    return schema.validate(data);
};