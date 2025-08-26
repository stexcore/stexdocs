import { ITemplateMethod, ITemplateRoute } from "../../../types/template.type";
import RouteHeader from "./partials/RouteHeader";
import RouteSummary from "./partials/RouteSummary";
import RouteTags from "./partials/RouteTags";
import RouteParameters from "./partials/RouteParameters";
import RouteRequestBody from "./partials/RouteRequestBody";
import RouteResponses from "./partials/RouteResponses";

/**
 * RouteDocs — renders a single API endpoint's documentation.
 * It composes multiple partials to display metadata, parameters, request body, and responses.
 *
 * @param route The API route (e.g. "/users/{id}")
 * @param method The HTTP method (e.g. "GET", "POST")
 * @param endpoint The parsed endpoint object containing summary, tags, parameters, etc.
 */
export default function RouteDocs({
  route,
  method,
  endpoint,
}: {
  route: string;
  method: ITemplateMethod;
  endpoint: ITemplateRoute;
}) {
  return (
    <div className="stx-route-doc">
      {/* Header with route and method (e.g. GET /users/{id}) */}
      <RouteHeader route={route} method={method} />

      {/* Optional summary description of the endpoint */}
      <RouteSummary summary={endpoint.summary} />

      {/* Optional tags for categorization (e.g. ["auth", "user"]) */}
      {endpoint.tags?.length && <RouteTags tags={endpoint.tags} />}

      {/* Optional query/path/header parameters */}
      {endpoint.parameters?.length && <RouteParameters parameters={endpoint.parameters} />}

      {/* Optional request body schema and examples */}
      {endpoint.body && <RouteRequestBody body={endpoint.body} />}

      {/* Optional response definitions (status codes, schemas, examples) */}
      {endpoint.responses && <RouteResponses responses={endpoint.responses} />}
    </div>
  );
}