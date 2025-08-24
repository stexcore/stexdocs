/**
 * SectionHeader — renders the top header for an API endpoint section.
 * Displays the HTTP method and route, with optional UI affordance (e.g. toggle icon).
 *
 * @param route The API route (e.g. "/users/{id}")
 * @param method The HTTP method (e.g. "GET", "POST")
 */
export default function SectionHeader({
  route,
  method,
}: {
  route: string;
  method: string;
}) {
  return (
    <header className="page-doc__header">
      <div className="route">
        {/* Method badge with dynamic class for styling (e.g. method--GET) */}
        <span className={`method method--${method}`}>
          {method.toUpperCase()}
        </span>

        {/* Route path displayed in monospaced font */}
        <code className="page-doc__route">{route}</code>
      </div>

      {/* Optional toggle icon for collapsible sections (future UX hook) */}
      <span className="toggle-icon" style={{ float: "right" }}>
        ▶
      </span>
    </header>
  );
}