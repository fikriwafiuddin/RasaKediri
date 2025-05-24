function Input({
  name,
  label,
  value,
  onChange,
  type,
  placeholder,
  error,
  ref,
}) {
  return (
    <div key={name} className="flex flex-col text-sm w-full">
      {label && (
        <label htmlFor={name} className="font-semibold">
          {label}
        </label>
      )}
      <input
        ref={ref}
        value={type !== "file" ? value : null}
        onChange={onChange}
        className="outline-2 outline-green-900 rounded-sm p-1"
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Input
