import React from 'react'

export const Menu = ({
  menus,
  selectedMenu,
  onMenuChange
}) => {
  return (
    <aside className="menu">
    {
      menus.map(({ id, name }, index) => {
        return (
          <div
          key={id}
          className={`menuitem ${index === selectedMenu ? 'menuitem--active' : ''}`}
          onClick={() => onMenuChange(index)}
          >
            <span className="menuitem__name">{name}</span>
          </div>
        )
      })
    }
    </aside>
  )
}
