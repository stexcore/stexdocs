import Joi from "joi";

const parameterSchema = Joi.object({
  name: Joi.string().required(),
  in: Joi.string().valid("headers", "cookie", "query", "path").required(),
  schema: Joi.object().required(),
  required: Joi.boolean(),
  description: Joi.string(),
});

export default parameterSchema;
