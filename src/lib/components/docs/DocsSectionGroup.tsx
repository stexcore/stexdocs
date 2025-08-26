import SectionDocs from "./RouteDocs";
import { ITemplateMethod, ITemplateRoute } from "../../../types/template.type";

export default function DocsSectionGroup({
  title,
  endpoints,
}: {
  title: string;
  endpoints: {
    routeName: string;
    method: ITemplateMethod;
    endpoint: ITemplateRoute;
  }[];
}) {
  return (
    <section className="stx-docs-section-group">
      <h2 className="stx-docs-section-title">{title}</h2>
      {endpoints.map(({ routeName, method, endpoint }) => (
        <SectionDocs
          key={routeName + ":" + method}
          route={routeName}
          method={method}
          endpoint={endpoint}
        />
      ))}
    </section>
  );
}