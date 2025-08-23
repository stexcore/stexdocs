import joi from "joi";

export default joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    version: joi.alternatives(joi.string(), joi.number()).required(),
    author: joi.string(),
    icon: joi.string(),
});