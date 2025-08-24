import { ITemplate, ITemplateMethod, ITemplateSection } from "../../../types/template.type";
import SectionDocs from "./SectionDocs";

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
  const paths = Object.entries(template.paths); // [route, { method: section }]

  /**
   * Flatten the nested structure into a list of sections.
   * Each section includes its route, method, and corresponding content.
   */
  const sections: {
    route: string;
    method: ITemplateMethod;
    section: ITemplateSection;
  }[] = paths.flatMap(([route, path]) => {
    const methods = Object.entries(path); // [method, section]

    return methods.map(([method, page]) => ({
      route,
      method: method as ITemplateMethod,
      section: page,
    }));
  });

  /**
   * Render each section using the SectionDocs component.
   * The key is composed of route + method to ensure uniqueness.
   */
  return (
    <>
      {sections.map((section) => (
        <SectionDocs
          key={section.route + ":" + section.method}
          section={section.section}
          method={section.method}
          route={section.route}
        />
      ))}
    </>
  );
}