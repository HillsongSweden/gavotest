import React, { useState, useRef } from 'react'

export default function ({ options = [], onSelect, placeholderText }) {
  const selectRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState()
  const [active, setActive] = useState()
  
  function select (index) {
    setIsOpen(false)
    
    if (index === selected) {
      setSelected()
      onSelect()
      return
    }

    setSelected(index)
    onSelect(options[index])
  }

  function unSelect (e) {
    e.stopPropagation()
    setSelected()
    onSelect()
    setIsOpen(false)
  }
  
  function keypress (e) {
    e.preventDefault()
    
    switch (e.key) {
      case 'Enter':
        if (!isOpen) {
          if (e.key === 'Enter') {
            setIsOpen(true)
            setActive(selected || 0)
          }
          return
        } else {
          select(active)
          return 
        }
      case 'Escape':
        if (!isOpen) {
          selectRef.current.blur()
        }
        
        setIsOpen(false)
        return
      case 'ArrowUp':
        if (active >= 1) {
          setActive(active - 1) 
        }
        return
      case 'ArrowDown':
        if (active < (options.length - 1)) {
          setActive(active + 1)
        }
        return
      default: return
    }
  }

  return (
    <div
      tabIndex="0"
      className={`dropdown ${isOpen ? 'open' : ''}`}
      onKeyDown={keypress}
      onBlur={() => setIsOpen(false)}
      ref={selectRef}>
      <div onClick={() => {
        setActive(0)
        setIsOpen(!isOpen)
      }}>
        {selected !== undefined
          ? <>{options[selected]} <span onClick={unSelect}>✘</span></>
          : <>{placeholderText} <span className="chevron">▼</span></>
        }
      </div>
      <br />
      <ul>
        {options.map((option, i) => (
          <li
            key={i}
            onClick={() => select(i)}
            onMouseEnter={() => setActive(i)}
            className={(active === i) ? 'active' : ''}>
            {option} {i === selected && <span role="img" className="checkmark">✔︎</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
