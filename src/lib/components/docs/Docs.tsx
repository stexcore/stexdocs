import { ITemplate, ITemplateMethod, ITemplatePage } from "../../../types/template";
import PageDoc from "./PageDoc";

export default function Docs({
    template
}: {
    template: ITemplate
}) {
    const paths = Object.entries(template.paths);
    
    const pages: {
        route: string,
        method: ITemplateMethod,
        page: ITemplatePage,
    }[] = 
        paths.flatMap(([route, path]) => {
            const methods = Object.entries(path);

            return methods.map(([method, page]) => {
                return {
                    route: route,
                    method: method as ITemplateMethod,
                    page: page
                }
            });
        });
    
    return (
        <>
            {pages.map((page) => (
                <PageDoc 
                    key={page.route + ":" + page.method} 
                    page={page.page}
                    method={page.method}
                    route={page.route}
                />
            ))}
        </>
    );
}