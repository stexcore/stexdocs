export type ITemplateMethod =
    | "get"
    | "post"
    | "info"
    | "put"
    | "delete"
    | "patch";

export interface ITemplatePage {
    summary: string,
    tags?: string[],
    parameters?: {
        name: string,
        in: "headers" | "cookie" | "query" | "path",
        schema: {

        },
        required?: boolean,
        description?: string
    }[],
    body?: {
        type: string,
        required?: boolean,
        content: any
    },
    responses?: {
        [status: string | number]: {
            description: string,
            content: any
        }
    }
}

export interface ITemplate {
    metadata: {
        title: string,
        description: string,
        version: string,
        author?: string,
        icon?: string,
    },
    paths: {
        [route: string]: {
            [method in ITemplateMethod]: ITemplatePage
        }
    }
}