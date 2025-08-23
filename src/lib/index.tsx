import { ITemplate } from "../types/template";
import { NextFunction, RequestHandler, Response } from "express";
import templateSchema from "./schemas/template.schema";
import { renderToPipeableStream } from "react-dom/server"
import path from "path";
import App from "./App";
import fs from "fs";
import mime from "mime-types";
import ErrorPage from "./error";

export interface IStexdocConfig {
  template: ITemplate
}

const publicStatic = path.join(__dirname, "../../public");

const serveStatic = (roots: string[], file: string, res: Response, next: NextFunction) => {
  const tryNextRoot = (index: number) => {
    if (index >= roots.length) return next();

    const root = roots[index];
    const filePath = path.join(root, file);

    // Seguridad: evitar path traversal
    if (!filePath.startsWith(path.resolve(root))) {
      res.status(403).send('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return tryNextRoot(index + 1); // Intenta el siguiente root
      }

      const contentType = mime.lookup(filePath) || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);

      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });
  };

  tryNextRoot(0);
};


/**
 * Stexdoc
 * @param config Settings JSON
 * @returns Request handler
 */
export default function stexdoc(config: IStexdocConfig): RequestHandler {

  // Load template
  const validation = templateSchema.validate(config.template, { abortEarly: false });

  // Validate error
  if (validation.error) {
    throw validation.error;
  }

  /**
   * Render Docs
   * @param req Request Incomming
   * @param res Request utils
   * @param next Next middleware
   */
  const middleware: RequestHandler = (req, res, next) => {
    try {
      const file = req.query.file;

      if (typeof file === "string") {
        switch (file) {
          default:
            serveStatic([publicStatic], file, res, next);
        }
      }
      else {
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        const url = new URL(fullUrl);
        const baseUrl = `${url.origin}${url.pathname}`

        const app = <App template={config.template} baseUrl={baseUrl} />;

        const { pipe } = renderToPipeableStream(app, {
          bootstrapScripts: [],
          onShellReady() {
            res.setHeader("Content-Type", "text/html")
            pipe(res);
          },
          onError(err) {
            const errorApp = <ErrorPage message="No se pudo renderizar la documentación. Intenta más tarde." baseUrl={baseUrl}  />;

            console.error(err);

            const { pipe} = renderToPipeableStream(errorApp, {
              onShellReady() {
                console.log("Rendering!!");
                res.status(500);
                res.setHeader("Content-Type", "text/html");
                pipe(res);
              },
              onError(err) {
                // Fallback ultra básico si todo falla
                res.status(500).send("<h1>Error</h1><p>No se pudo renderizar la página.</p>");
              }
            });
          },
        });
      }
    }
    catch (err) {
      next(err);
    };
  };

  return middleware;
}
