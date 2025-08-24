import { ITemplateTheme } from "src/types/template.type";

const themes = [
  "default",
  "hacker-green",
  "tokyo-night",
  "vscode-dark",
  "night-owl",
  "solarized-light",
  "cyberpunk-neon",
  "paper-white",
  "terminal-classic",
  "dracula",
  "nord",
];

export default function ThemeSelector({ theme }: { theme: ITemplateTheme }) {
  return (
    <div className="theme-selector">
      <label htmlFor="theme-select">Tema visual:</label>
      <select
        className="theme-select"
        defaultValue={theme || "default"}
        data-theme-selector
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.replace(/-/g, " ")}
          </option>
        ))}
      </select>
    </div>
  );
}