# StexDoc

SSR middleware for Express that generates interactive API docs from a JSON spec using React and SSR. Produces pure-HTML output with minimal client-side hydration for accordions, response tabs, and “Copy” buttons.

## Table of Contents

1. Introduction  
2. Installation  
3. Quick Start  
4. API Reference  
5. Template Configuration with Real Examples  
6. Extending & Overrides  
7. Contributing  
8. License  

---

## Introduction

StexDoc transforms a structured JSON file into a fully-featured, server-rendered docs site. Perfect for performance-critical or SEO-sensitive projects, with zero client-side rendering except for UI interactivity.

---

## Installation

```bash
npm install stexdoc
```

---

## Quick Start

```ts
import express from 'express'
import stexdoc from 'stexdoc'
import template from './template.json'

const app = express()
app.use('/docs', stexdoc({ template }))
app.listen(9000, () => {
  console.log('Docs available at http://localhost:9000/docs')
})
```

---

## API Reference

### stexdoc(config)

- **config.template**  
  A JSON object that defines your documentation structure (see below).

Returns an Express middleware handling:
- Rendering React to HTML on each request  
- Injecting a small hydration bundle for interactive components  
- “Copy” buttons on code blocks and tabs for multiple response schemas  

---

## Template Configuration with Real Examples

Below is a complete `template.json` example. Copy it, customize the values, and see how each part maps to the rendered docs.

```json
{
  "metadata": {
    "title": "My Shop API",
    "description": "Manage products, orders, and customers",
    "version": "2.3.1",
    "author": "Acme Co.",
    "icon": "/assets/logo.svg"
  },
  "paths": {
    "/api/products": {
      "get": {
        "summary": "List all products",
        "tags": ["Products"],
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "schema": { "type": "integer", "default": 1 },
            "description": "Page number to fetch",
            "required": false
          }
        ],
        "responses": {
          "200": {
            "description": "A page of product objects",
            "content": [
              { "id": "uuid", "name": "string", "price": "number" }
            ]
          }
        }
      },
      "post": {
        "summary": "Create a new product",
        "tags": ["Products"],
        "body": {
          "type": "application/json",
          "required": true,
          "content": { "name": "New T-Shirt", "price": 19.99 }
        },
        "responses": {
          "201": {
            "description": "Product created successfully",
            "content": { "id": "uuid", "name": "New T-Shirt", "price": 19.99 }
          },
          "400": {
            "description": "Invalid request body",
            "content": { "error": "Name and price are required" }
          }
        }
      }
    },
    "/api/orders/{orderId}": {
      "get": {
        "summary": "Get order by ID",
        "tags": ["Orders"],
        "parameters": [
          {
            "name": "orderId",
            "in": "path",
            "schema": { "type": "string" },
            "description": "Unique identifier of the order",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Order details",
            "content": {
              "orderId": "uuid",
              "items": [{ "productId": "uuid", "quantity": "number" }],
              "total": "number"
            }
          },
          "404": {
            "description": "Order not found",
            "content": { "error": "No order with that ID" }
          }
        }
      }
    }
  }
}
```

### What each section does

- **metadata**  
  - title: Header text at top of your docs  
  - description: Subtitle right under title  
  - version: Shown in header and footer  
  - author: Credits line below version  
  - icon: Displays next to title (SVG or PNG)

- **paths**  
  Each key is an endpoint path. Inside, map HTTP methods to:

  - **summary**: One-line description  
  - **tags**: Used to group endpoints in the sidebar  
  - **parameters**:  
    - name: parameter name  
    - in: location (“query”, “path”, “headers”, “cookie”)  
    - schema: JSON Schema type details  
    - required: boolean  
    - description: helper text  
  - **body** (for POST/PUT/PATCH):  
    - type: MIME type (e.g. application/json)  
    - required: boolean  
    - content: example payload  
  - **responses**: map status codes to  
    - description: short text  
    - content: example response payload  

---

🧠 VSCode Autocompletion for `.stx.json` Templates

To enable automatic validation, autocompletion, and inline documentation for your StexDocs templates, you can register the JSON schema in your VSCode settings:

{
  "json.schemas": [
    {
      "fileMatch": ["*.stx.json"],
      "url": "./node_modules/stexdocs/schemas/template.schema.json"
    }
  ]
}

This allows VSCode to validate your documentation files without needing to manually add `$schema` to each one.

💡 Tip: You can also copy the preconfigured `.vscode/settings.json` from `node_modules/stexdocs/examples` to get started instantly.

---

## Contributing

1. Fork the repository  
2. Install dependencies: `npm install`  
3. Run build & tests: `npm run build && npm run dev`  
4. Open a PR describing your changes

---

## License

MIT © StexCore 2025