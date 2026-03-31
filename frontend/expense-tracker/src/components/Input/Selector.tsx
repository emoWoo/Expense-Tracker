import { Select } from "antd";

interface SelectorOption {
  label: string;
  value: string;
}

interface SelectorProps {
  label: string;
  value: string;
  options: SelectorOption[];
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Selector: React.FC<SelectorProps> = ({
  label,
  value,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <div className="flex flex-col justify-between gap-3 mb-4 mt-3">
      <label className="text-[13px] text-slate-800">{label}:</label>
      <Select
        value={value}
        onChange={(selectedValue) => {
          onChange({ target: { value: selectedValue } } as React.ChangeEvent<HTMLSelectElement>);
        }}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "#f1f5f9", // slate-100
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          padding: "12px 16px",
          fontSize: "14px",
          color: "#000",
        }}
        options={options}
      />

      {/* <input
          className="w-full bg-transparent outline-none"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        /> */}
    </div>
  );
};

export default Selector;
