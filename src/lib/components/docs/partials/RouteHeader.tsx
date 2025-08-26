/**
 * RouteHeader — renders the top header for an API endpoint section.
 * Displays the HTTP method and route, with optional UI affordance (e.g. toggle icon).
 *
 * @param route The API route (e.g. "/users/{id}")
 * @param method The HTTP method (e.g. "GET", "POST")
 */
export default function RouteHeader({
  route,
  method,
}: {
  route: string;
  method: string;
}) {
  return (
    <button className="stx-route-doc__header">
      <div className="stx-route">
        {/* Method badge with dynamic class for styling (e.g. method--GET) */}
        <span className={`stx-method stx-method--${method}`}>
          {method.toUpperCase()}
        </span>

        {/* Route path displayed in monospaced font */}
        <code className="stx-route-doc__route">{route}</code>
      </div>

      {/* Optional toggle icon for collapsible sections (future UX hook) */}
      <span className="stx-toggle-icon" style={{ float: "right" }}>
        ▶
      </span>
    </button>
  );
}