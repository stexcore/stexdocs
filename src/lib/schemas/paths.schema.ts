import Joi from "joi";
import templatePageSchema from "./template-page.schema";

const methods = ["get", "post", "info", "put", "delete", "patch"] as const;

const pathsSchema = Joi.object().pattern(
  Joi.string(),
  Joi.object(
    methods.reduce((acc, method) => {
      acc[method] = templatePageSchema;
      return acc;
    }, {} as Record<typeof methods[number], Joi.Schema>)
  )
);

export default pathsSchema;
