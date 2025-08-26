import { SelectInput } from "../ui/SelectInput";
import { ITemplateTheme } from "../../../types/template.type";

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

const themeOptions = themes.map((t) => ({
  value: t,
  label: t.replace(/-/g, " "),
}));

export default function ThemeSelector({ theme }: { theme: ITemplateTheme }) {
  return (
    <SelectInput
      label="Visual theme:"
      options={themeOptions}
      defaultValue={theme || "default"}
      className="stx-theme-select"
    />
  );
}