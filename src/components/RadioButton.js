import React from 'react'

export default function ({ value, setValue, checked, id, name }) {
  return (
    <label className={`radiobutton${checked ? ' active' : ''}`} htmlFor={id}>
      <input id={id} type="radio" value={value} onChange={e => setValue(e.target.value)} name={name} checked={checked} />
    </label>
  )
}
