import type { IStexDocsConfig } from "src/types/stexdocs.type";
import { RequestHandler } from "express";
import { renderToPipeableStream } from "react-dom/server";
import templateSchema from "./schemas/template.schema";
import ErrorPage from "./error";
import App from "./App";
import { serveStatic } from "src/utils/static.util";
import staticAssetsConstant from "src/constants/static-assets.constant";

/**
 * StexDocs middleware factory.
 * Validates the provided configuration and returns an Express-compatible request handler.
 *
 * @param config Configuration object for StexDoc
 * @returns Express middleware to serve documentation
 */
export default function stexdocs(config: IStexDocsConfig): RequestHandler {

  // Validate the template configuration using Joi schema
  const validation = templateSchema.validate(config.template, { abortEarly: false });

  // If validation fails, throw immediately to prevent misconfigured runtime
  if (validation.error) {
    throw validation.error;
  }

  /**
   * Middleware to handle incoming requests.
   * Serves static assets if `file` query param is present,
   * otherwise renders the documentation app via React SSR.
   *
   * @param req Incoming HTTP request
   * @param res Express response object
   * @param next Next middleware in the chain
   */
  const middleware: RequestHandler = (req, res, next) => {
    try {
      const file = req.query.file;

      // If a file is requested via query param, serve it as a static asset
      if (typeof file === "string") {
        switch (file) {
          default:
            // Serve from configured public static directory
            serveStatic([staticAssetsConstant.publicStatic], file, res, next);
        }
      } else {
        // No file requested — proceed to SSR documentation rendering

        // Construct full URL to determine base path for routing and assets
        const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        const url = new URL(fullUrl);
        const baseUrl = `${url.origin}${url.pathname}`;

        // Create React app instance with injected template and base URL
        const app = <App template={config.template} baseUrl={baseUrl} />;

        // Stream the React app to the client using React 18's pipeable stream
        const { pipe } = renderToPipeableStream(app, {
          bootstrapScripts: [], // Optional: preload client-side scripts
          onShellReady() {
            res.setHeader("Content-Type", "text/html");
            pipe(res); // Pipe HTML directly to response
          },
          onError(err) {
            // If SSR fails, render fallback error page
            console.error(err);

            const errorApp = (
              <ErrorPage
                baseUrl={baseUrl}
              />
            );

            const { pipe } = renderToPipeableStream(errorApp, {
              onShellReady() {
                console.log("Rendering!!");
                res.status(500);
                res.setHeader("Content-Type", "text/html");
                pipe(res);
              },
              onError(err) {
                // Final fallback: plain HTML error message
                res.status(500).send("<h1>Error</h1><p>No se pudo renderizar la página.</p>");
              }
            });
          },
        });
      }
    } catch (err) {
      // Forward unexpected errors to Express error handler
      next(err);
    }
  };

  return middleware;
}
