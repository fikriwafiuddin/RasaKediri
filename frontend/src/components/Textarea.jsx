import React from "react"

function Textarea({ name, label, value, onChange }) {
  return (
    <div key={name} className="flex flex-col text-sm">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <textarea
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
