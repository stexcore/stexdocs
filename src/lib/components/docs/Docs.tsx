import { ITemplate, ITemplateMethod, ITemplateRoute } from "../../../types/template.type";
import DocsHeader from "./DocsHeader";
import DocsSectionGroup from "./DocsSectionGroup";

/**
 * Docs component — renders all documented API sections.
 * It flattens the `template.paths` structure into a list of route-method-section
 * triples and delegates rendering to `SectionDocs` for each one.
 *
 * @param template Parsed documentation template containing metadata and paths
 */
export default function Docs({
  template,
}: {
  template: ITemplate;
}) {
  // Extract all route-method pairs from the template
  const sectionNames = Object.entries(template.sections); // [route, { method: section }]

  /**
   * Flatten the nested structure into a list of sections.
   * Each section includes its route, method, and corresponding content.
   */
  const sections: {
    section: string,
    endpoints: {
      routeName: string;
      method: ITemplateMethod;
      endpoint: ITemplateRoute;
    }[]
  }[] = sectionNames.flatMap(([section, paths]) => {
    const pathEntries = Object.entries(paths);

    return {
      section,
      endpoints: pathEntries.flatMap(([routeName, path]) => {
        const methods = Object.entries(path); // [method, section]

        return methods.map(([method, route]) => ({
          routeName,
          method: method as ITemplateMethod,
          endpoint: route,
        }));
      })
    }
  });

  /**
   * Render each section using the SectionDocs component.
   * The key is composed of route + method to ensure uniqueness.
   */
  return (
    <>
      <DocsHeader metadata={template.metadata} />
      {sections.map((section) => (
        <DocsSectionGroup
          key={section.section}
          title={section.section}
          endpoints={section.endpoints}
        />
      ))}
    </>
  );
}