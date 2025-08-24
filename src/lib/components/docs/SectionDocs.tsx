import { ITemplateMethod, ITemplateSection } from "../../../types/template.type";
import SectionHeader from "./partials/SectionHeader";
import SectionSummary from "./partials/SectionSummary";
import SectionTags from "./partials/SectionTags";
import SectionParameters from "./partials/SectionParameters";
import SectionRequestBody from "./partials/SectionRequestBody";
import SectionResponses from "./partials/SectionResponses";

/**
 * SectionDocs — renders a single API endpoint's documentation.
 * It composes multiple partials to display metadata, parameters, request body, and responses.
 *
 * @param route The API route (e.g. "/users/{id}")
 * @param method The HTTP method (e.g. "GET", "POST")
 * @param section The parsed section object containing summary, tags, parameters, etc.
 */
export default function SectionDocs({
  route,
  method,
  section,
}: {
  route: string;
  method: ITemplateMethod;
  section: ITemplateSection;
}) {
  return (
    <div className="page-doc">
      {/* Header with route and method (e.g. GET /users/{id}) */}
      <SectionHeader route={route} method={method} />

      {/* Optional summary description of the endpoint */}
      <SectionSummary summary={section.summary} />

      {/* Optional tags for categorization (e.g. ["auth", "user"]) */}
      {section.tags?.length && <SectionTags tags={section.tags} />}

      {/* Optional query/path/header parameters */}
      {section.parameters?.length && <SectionParameters parameters={section.parameters} />}

      {/* Optional request body schema and examples */}
      {section.body && <SectionRequestBody body={section.body} />}

      {/* Optional response definitions (status codes, schemas, examples) */}
      {section.responses && <SectionResponses responses={section.responses} />}
    </div>
  );
}