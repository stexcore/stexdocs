import { ITemplateParameter } from "../../../../types/template.type";

/**
 * SectionParameters — renders a table of parameters for an API endpoint.
 * Supports query, path, header, and cookie parameters as defined in OpenAPI.
 *
 * @param parameters Array of parameter definitions (name, location, schema, etc.)
 */
export default function SectionParameters({
  parameters,
}: {
  parameters: ITemplateParameter[];
}) {
  return (
    <section className="page-doc__parameters">
      {/* Section title */}
      <h2>Parameters</h2>

      {/* Parameters table with metadata columns */}
      <table>
        <thead>
          <tr>
            <th>Name</th>         {/* Parameter name */}
            <th>In</th>           {/* Location: query, path, header, cookie */}
            <th>Type</th>         {/* Schema type (string, number, etc.) */}
            <th>Required</th>     {/* Whether the parameter is required */}
            <th>Description</th>  {/* Optional description */}
          </tr>
        </thead>
        <tbody>
          {parameters.map((param, i) => (
            <tr key={i}>
              <td>{param.name}</td>
              <td>{param.in}</td>
              <td>{(param.schema as any).type || "—"}</td>
              <td>{param.required ? "Yes" : "No"}</td>
              <td>{param.description || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}