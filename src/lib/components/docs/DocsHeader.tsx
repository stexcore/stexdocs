import resourceUtil from "../../../utils/resource.util";
import { ITemplateMetadata } from "../../../types/template.type";
import ThemeSelector from "../theme/ThemeSelector";

interface DocsHeaderProps {
    metadata: ITemplateMetadata;
}

export default function DocsHeader({ metadata }: DocsHeaderProps) {
    const { title, description, version, author, icon, theme } = metadata;

    return (
        <header className="stx-docs-header">
            <div className="stx-docs-header__icon-title">
                <img src={resourceUtil.favicon(icon)} alt="API Icon" className="stx-docs-header__icon" />
                <div>
                    <h1 className="stx-docs-header__title">{title}</h1>
                    <p className="stx-docs-header__description">{description}</p>
                </div>
            </div>
            <div className="stx-docs-header__meta">
                <span className="stx-docs-header__version">v{version}</span>
                <span className="stx-docs-header__author">Documented by {author}</span>
            </div>
            <ThemeSelector theme={theme} />
        </header>
    );
}
