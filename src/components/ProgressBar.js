import React from 'react'

export default function ({ completed, total }) {
  const percentage = Math.floor(completed / total * 100)

  return (
    <>
      <h3 className={`progress-text ${completed > 0 ? 'active' : ''}`}>{completed}/{total}</h3>
      <div style={{ width: percentage + '%' }} className="progress-bar"></div>
    </>
  )
}
