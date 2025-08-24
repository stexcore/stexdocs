import resourceUtil from "src/utils/resource.util";
import { ITemplate } from "../types/template.type";
import Docs from "./components/docs/Docs";

/**
 * App component — renders the full HTML document for SSR.
 * Injects metadata, styles, and client-side hydration script.
 *
 * @param template Parsed template configuration (title, description, icon, etc.)
 * @param baseUrl Base URL used for resolving relative paths
 */
export default function App({
  template,
  baseUrl
}: {
  template: ITemplate;
  baseUrl: string;
}) {
  return (
    <html lang="es" data-theme={template.metadata.theme}>
      <head>
        {/* Ensure relative paths resolve correctly */}
        <base href={baseUrl.replace(/\/$/, "") + "/"} />

        {/* Meta tags for encoding, responsiveness, and SEO */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={template.metadata.description} />

        {/* Favicon and global stylesheet */}
        <link
          rel="icon"
          href={resourceUtil.favicon(template.metadata.icon)}
        />
        <link rel="stylesheet" href="?file=styles.css" />

        {/* Page title from template */}
        <title>{template.metadata.title}</title>

        {/* Client-side hydration script */}
        <script defer src="?file=scripts.js"></script>
      </head>
      <body>
        {/* Root container for React hydration */}
        <div id="root">
          <Docs template={template} />
        </div>
      </body>
    </html>
  );
}