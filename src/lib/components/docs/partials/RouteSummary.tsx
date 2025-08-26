/**
 * RouteSummary — renders the summary title for an API endpoint.
 * Typically used as the main heading for the section.
 *
 * @param summary A short description or title of the endpoint
 */
export default function RouteSummary({
  summary,
}: {
  summary: string;
}) {
  return (
    <section className="stx-route-doc__summary">
      {/* Main heading for the endpoint section */}
      <h1>{summary}</h1>
    </section>
  );
}