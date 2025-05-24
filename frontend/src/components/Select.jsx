function Select({ label, name, options, value, onChange, ref, error }) {
  return (
    <div key={name} className="flex flex-col text-sm w-full">
      {label && (
        <label htmlFor={name} className="font-semibold">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        ref={ref}
        name="category"
        id="category"
        className="outline-2 outline-green-900 rounded-sm p-1"
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Select
