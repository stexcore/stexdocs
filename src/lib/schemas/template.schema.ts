import joi from "joi";
import metadataSchema from "./metadata.schema";
import pathsSchema from "./paths.schema";

export default joi.object({
    metadata: metadataSchema.required(),
    paths: pathsSchema.required(),
}).required();