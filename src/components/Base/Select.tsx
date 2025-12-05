interface SelectProps {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  label?: string; // Para el 'Placeholder' del primer valor
}

export const Select = ({ value, onChange, options, label }: SelectProps) => (
  <select 
    className="border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
    value={value} 
    onChange={e => onChange(e.target.value)}
  >
    {options.map(opt => (
      <option key={opt} value={opt}>
        {opt === 'Todas' || opt === 'Todos' ? (label || opt) : opt}
      </option>
    ))}
  </select>
);