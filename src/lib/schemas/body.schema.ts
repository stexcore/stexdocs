import Joi from "joi";

const bodySchema = Joi.object({
  type: Joi.string().required(),
  required: Joi.boolean(),
  content: Joi.any().required(),
});

export default bodySchema;
