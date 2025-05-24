import React from "react"

function Textarea({ name, label, value, onChange, ref }) {
  return (
    <div key={name} className="flex flex-col text-sm">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <textarea
        ref={ref}
        className="outline-2 outline-green-900 rounded-sm p-1"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Textarea
