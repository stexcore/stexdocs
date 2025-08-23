import Joi from "joi";
import parameterSchema from "./parameter.schema";
import bodySchema from "./body.schema";
import responseSchema from "./response.schema";

const templatePageSchema = Joi.object({
  summary: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  parameters: Joi.array().items(parameterSchema),
  body: bodySchema,
  responses: Joi.object().pattern(
    Joi.alternatives(Joi.string(), Joi.number()),
    responseSchema.required()
  ),
});

export default templatePageSchema;
