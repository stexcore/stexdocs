/**
 * SectionTags — renders a list of tags associated with an API endpoint.
 * Tags are typically used for grouping, filtering, or categorizing endpoints.
 *
 * @param tags Array of tag strings (e.g. ["auth", "user", "admin"])
 */
export default function SectionTags({
  tags,
}: {
  tags: string[];
}) {
  return (
    <section className="page-doc__tags">
      {/* Section title */}
      <h2>Tags</h2>

      {/* Render each tag as a list item */}
      <ul>
        {tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </section>
  );
}