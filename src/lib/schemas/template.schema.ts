import Joi from "joi";
import { ITemplate } from "../../types/template.type";

/**
 * ─────────────────────────────────────────────────────────────
 * StexDoc Template Schema — Unified Joi validation for template
 * ─────────────────────────────────────────────────────────────
 */

// Supported HTTP methods
const methods = ["get", "post", "info", "put", "delete", "patch"] as const;

/**
 * Metadata block — general info about the documentation
 */
const metadataSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  version: Joi.alternatives(Joi.string(), Joi.number()).required(),
  author: Joi.string(),
  icon: Joi.string(),

  // Optional theme name for rendering
  theme: Joi.string().valid(
    "default",
    "hacker-green",
    "tokyo-night",
    "vscode-dark",
    "night-owl",
    "solarized-light",
    "cyberpunk-neon",
    "paper-white",
    "terminal-classic",
    "dracula",
    "nord"
  ).required(),
});

/**
 * Parameter definition — for headers, query, path, etc.
 */
const parameterSchema = Joi.object({
  name: Joi.string().required(),
  in: Joi.string().valid("headers", "cookie", "query", "path").required(),
  schema: Joi.object().required(),
  required: Joi.boolean(),
  description: Joi.string(),
});

/**
 * Request body definition
 */
const bodySchema = Joi.object({
  type: Joi.string().required(),
  required: Joi.boolean(),
  content: Joi.any().required(),
});

/**
 * Response block — keyed by status code
 */
const responseSchema = Joi.object({
  description: Joi.string().required(),
  content: Joi.any().required(),
});

/**
 * Template page — represents a single method on a route
 */
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

/**
 * Paths block — routes and their supported methods
 */
const pathsSchema = Joi.object().pattern(
  Joi.string(), // route path
  Joi.object(
    methods.reduce((acc, method) => {
      acc[method] = templatePageSchema;
      return acc;
    }, {} as Record<typeof methods[number], Joi.Schema>)
  )
);

/**
 * Section block - group of paths
 */
const sectionSchema = Joi.object().pattern(
  Joi.string(), // section name
  pathsSchema
);

/**
 * Final template schema — root object
 */
const templateSchema = Joi.object<ITemplate>({
  metadata: metadataSchema.required(),
  sections: sectionSchema.required(),
}).required();

export default templateSchema;