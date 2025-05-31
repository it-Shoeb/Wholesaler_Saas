export default function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  className
}) {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`border-1 border-gray-300 text-gray-500 focus:ring-1 ring-blue-300 focus:outline-none rounded-md p-2 ${className}`}
        />
      </div>
    </>
  );
}
