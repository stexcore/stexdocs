import resourceUtil from "src/utils/resource.util";
import { ITemplateMetadata } from "../../../types/template.type";
import ThemeSelector from "../theme/ThemeSelector";

interface DocsHeaderProps {
    metadata: ITemplateMetadata;
}

export default function DocsHeader({ metadata }: DocsHeaderProps) {
    const { title, description, version, author, icon, theme } = metadata;

    return (
        <header className="docs-header">
            <div className="docs-header__icon-title">
                <img src={resourceUtil.favicon(icon)} alt="API Icon" className="docs-header__icon" />
                <div>
                    <h1 className="docs-header__title">{title}</h1>
                    <p className="docs-header__description">{description}</p>
                </div>
            </div>
            <div className="docs-header__meta">
                <span className="docs-header__version">v{version}</span>
                <span className="docs-header__author">Creado por {author}</span>
            </div>
            <ThemeSelector theme={theme} />
        </header>
    );
}
