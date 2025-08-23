import Joi from "joi";

const responseSchema = Joi.object({
  description: Joi.string().required(),
  content: Joi.any().required(),
});

export default responseSchema;
