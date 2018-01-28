import React from 'react'

import Aside from './Aside'
import MenuItem from './MenuItem'

export default ({
  menus,
  menuKeys,
  selectedMenu,
  onMenuChange
}) => {
  return (
    <Aside>
      {
        menuKeys.map((id, index) => {
          const name = menus[id] ? menus[id].name : '';

          return (
            <MenuItem
              key={id}
              isActive={id === selectedMenu}
              onClick={() => onMenuChange(id)}
            >
              <MenuItem.Name isActive={id === selectedMenu}>
                {name}
              </MenuItem.Name>
            </MenuItem>
          )
        })
      }
    </Aside> 
  )
}
