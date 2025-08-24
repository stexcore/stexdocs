/**
 * Supported HTTP methods for documentation pages.
 * Includes standard verbs plus "info" for non-operational metadata routes.
 */
export type ITemplateMethod =
  | "get"
  | "post"
  | "info"
  | "put"
  | "delete"
  | "patch";

export type ITemplateTheme =
  | "default"
  | "hacker-green"
  | "tokyo-night"
  | "vscode-dark"
  | "night-owl"
  | "solarized-light"
  | "cyberpunk-neon"
  | "paper-white"
  | "terminal-classic"
  | "dracula"
  | "nord";

/**
 * Parameter definition for an endpoint.
 */
export interface ITemplateParameter {
  /** Parameter name */
  name: string;

  /** Location of the parameter in the request */
  in: "headers" | "cookie" | "query" | "path";

  /** Schema definition for the parameter */
  schema: Record<string, unknown>;

  /** Whether the parameter is required */
  required?: boolean;

  /** Optional description for documentation */
  description?: string;
}

/**
 * Request body definition.
 */
export interface ITemplateBody {
  /** MIME type or format of the body (e.g. application/json) */
  type: string;

  /** Whether the body is required */
  required?: boolean;

  /** Content payload (can be JSON schema, example, etc.) */
  content: any;
}

/**
 * Response definition for a specific status code.
 */
export interface ITemplateResponse {
  /** Description of the response */
  description: string;

  /** Response content (schema, example, etc.) */
  content: any;
}

/**
 * Represents a single documentation page for a given route and method.
 */
export interface ITemplateSection {
  /** Short summary or title of the endpoint */
  summary: string;

  /** Optional tags for grouping or filtering */
  tags?: string[];

  /** Optional list of parameters accepted by the endpoint */
  parameters?: ITemplateParameter[];

  /** Optional request body definition */
  body?: ITemplateBody;

  /** Optional response definitions keyed by status code */
  responses?: {
    [status: string | number]: ITemplateResponse;
  };
}

/**
 * Global metadata for the documentation.
 */
export interface ITemplateMetadata {
  /** Theme */
  theme: ITemplateTheme

  /** Title of the documentation */
  title: string;

  /** Short description or tagline */
  description: string;

  /** Version of the API or spec */
  version: string;

  /** Optional author name or organization */
  author?: string;

  /** Optional icon filename (used for favicon) */
  icon?: string;
}

/**
 * Root template structure for StexDoc.
 * Defines metadata and all documented paths grouped by route and method.
 */
export interface ITemplate {
  metadata: ITemplateMetadata;

  paths: {
    [route: string]: {
      [method in ITemplateMethod]: ITemplateSection;
    };
  };
}
