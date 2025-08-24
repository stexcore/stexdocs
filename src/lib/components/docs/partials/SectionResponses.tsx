import { ITemplateResponse } from "../../../../types/template.type";

/**
 * SectionResponses — renders the response section for an API endpoint.
 * Displays status codes as tabs and shows corresponding response details.
 *
 * @param responses A map of status codes to response definitions
 */
export default function SectionResponses({
  responses,
}: {
  responses: Record<string | number, ITemplateResponse>;
}) {
  // Extract all status codes (e.g. "200", "404", "500")
  const statusCodes = Object.keys(responses);

  return (
    <section className="page-doc__responses">
      {/* Section title */}
      <h2>Responses</h2>

      {/* Tabs for each status code */}
      <div className="response-tabs">
        {statusCodes.map((status, i) => (
          <button
            key={status}
            className={`response-tab ${i === 0 ? "active" : ""}`}
            data-status={status}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Response content blocks for each status code */}
      <div className="response-contents">
        {statusCodes.map((status, i) => (
          <div
            key={status}
            className={`response-content ${i === 0 ? "active" : ""}`}
            data-status={status}
          >
            <h3>Status {status}</h3>

            {/* Optional description of the response */}
            <p>{responses[status].description}</p>

            {/* JSON preview of the response content */}
            <div className="pre-wrapper">
              <button className="copy-btn">Copy</button>
              <pre>{JSON.stringify(responses[status].content, null, 2)}</pre>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}