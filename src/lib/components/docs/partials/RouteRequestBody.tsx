import { ITemplateBody } from "../../../../types/template.type";

/**
 * RouteRequestBody — renders the request body section of an API endpoint.
 * Displays metadata (type, required) and a formatted JSON preview of the content.
 *
 * @param body The request body definition including type, required flag, and content schema
 */
export default function RouteRequestBody({
  body,
}: {
  body: ITemplateBody;
}) {
  return (
    <section className="stx-route-doc__body">
      {/* Section title */}
      <h2>Request Body</h2>

      {/* Display body type (e.g. application/json) */}
      <p>
        <strong>Type:</strong> {body.type}
      </p>

      {/* Display whether the body is required */}
      <p>
        <strong>Required:</strong> {body.required ? "Yes" : "No"}
      </p>

      {/* JSON preview block with copy button */}
      <div className="stx-pre-wrapper">
        <button className="stx-copy-btn">Copy</button>
        <pre>{JSON.stringify(body.content, null, 2)}</pre>
      </div>
    </section>
  );
}