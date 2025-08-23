import { ITemplate } from "../types/template";
import Docs from "./components/docs/Docs";

export default function App({
    template,
    baseUrl
}: {
    template: ITemplate,
    baseUrl: string
}) {
    return (
        <html>
            <head>
                <base href={baseUrl.replace(/\/$/, "") + "/"}/>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={template.metadata.description} />
                <link rel="icon" href={"?file=" + encodeURIComponent(template.metadata.icon || "favicon.png")} />
                <link rel="stylesheet" href="?file=styles.css"></link>
                <title>{template.metadata.title}</title>
                <script
                  defer
                  src="?file=scripts.js"
                ></script>
            </head>
            <body style={{ whiteSpace: "pre" }}>
                <div id="root">
                    <Docs template={template}></Docs>
                </div>
            </body>
        </html>
    );
}