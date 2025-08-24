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
    route: ITemplateRoute;
  }[];
}) {
  return (
    <section className="docs-section-group">
      <h2 className="docs-section-title">{title}</h2>
      {endpoints.map(({ routeName, method, route }) => (
        <SectionDocs
          key={routeName + ":" + method}
          route={routeName}
          method={method}
          section={route}
        />
      ))}
    </section>
  );
}