interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  id?: string;
  label?: string;
  name?: string;
  defaultValue?: string;
  options: SelectOption[];
  className?: string;
}

export function SelectInput({
  id,
  label,
  name,
  defaultValue,
  options,
  className = ""
}: SelectInputProps) {
  return (
    <div className={`stx-select-input ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        defaultValue={defaultValue}
        name={name}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}