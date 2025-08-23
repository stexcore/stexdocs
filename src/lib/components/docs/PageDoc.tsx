import { ITemplateMethod, ITemplatePage } from "../../../types/template";

export default function PageDoc({
  route,
  method,
  page,
}: {
  route: string;
  method: ITemplateMethod;
  page: ITemplatePage;
}) {
  return (
    <div className="page-doc">
      {/* Encabezado con método HTTP, ruta y toggle-icon */}
      <header className="page-doc__header">
        <div className="route">
          <span className={`method method--${method}`}>
            {method.toUpperCase()}
          </span>
          <code className="page-doc__route">{route}</code>
        </div>
        <span className="toggle-icon" style={{ float: "right"}}>▶</span>
      </header>

      {/* Resumen */}
      <section className="page-doc__summary">
        <h1>{page.summary}</h1>
      </section>

      {/* Tags */}
      {page.tags?.length && (
        <section className="page-doc__tags">
          <h2>Tags</h2>
          <ul>
            {page.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Parámetros */}
      {page.parameters?.length && (
        <section className="page-doc__parameters">
          <h2>Parameters</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>In</th>
                <th>Type</th>
                <th>Required</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {page.parameters.map((param, i) => (
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
      )}

      {/* Cuerpo de la petición */}
      {page.body && (
        <section className="page-doc__body">
          <h2>Request Body</h2>
          <p>
            <strong>Type:</strong> {page.body.type}
          </p>
          <p>
            <strong>Required:</strong>{" "}
            {page.body.required ? "Yes" : "No"}
          </p>
          <div className="pre-wrapper">
            <button className="copy-btn">Copy</button>
            <pre>{JSON.stringify(page.body.content, null, 2)}</pre>
          </div>
        </section>
      )}

      {/* Respuestas */}
      {page.responses && (
        <section className="page-doc__responses">
          <h2>Responses</h2>

          {/* Pestañas */}
          <div className="response-tabs">
            {Object.keys(page.responses).map((status, i) => (
              <button
                key={status}
                className={`response-tab ${i === 0 ? "active" : ""}`}
                data-status={status}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Contenidos */}
          <div className="response-contents">
            {Object.entries(page.responses).map(([status, resp], i) => (
              <div
                key={status}
                className={`response-content ${i === 0 ? "active" : ""}`}
                data-status={status}
              >
                <h3>Status {status}</h3>
                <p>{resp.description}</p>
                <div className="pre-wrapper">
                  <button className="copy-btn">Copy</button>
                  <pre>{JSON.stringify(resp.content, null, 2)}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
