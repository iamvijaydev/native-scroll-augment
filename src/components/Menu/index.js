import React from 'react'

import { Aside } from './Aside'
import { MenuItem } from './Aside'

export const Menu = ({
  menus,
  selectedMenu,
  onMenuChange
}) => {
  return (
    <Aside>
      {
        menus.map(({ id, name }, index) => {
          return (
            <MenuItem
              key={id}
              isActive={index === selectedMenu}
              onClick={() => onMenuChange(index)}
            >
              <MenuItem.Name isActive={index === selectedMenu}>
                {name}
              </MenuItem.Name>
            </MenuItem>
          )
        })
      }
    </Aside> 
  )
}
