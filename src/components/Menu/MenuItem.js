import React from 'react';
import styled from 'styled-components';

const MenuItem = styled.div`
  border-bottom: 1px solid #eaeaea;
  background: ${({ isActive }) => isActive ? 'default' : 'pointer'};
`

const MenuName = styled.span`
  padding: 1.5rem;
  font-size: 1.5rem;
  color: #6f6f6f;
  display: block;
  transition: all 0.2s ease;
  color: ${({ isActive }) => isActive ? '#fff' : '#6f6f6f'};
  background: ${({ isActive }) => isActive ? '#1d77ef' : '#fff'};
  font-weight: ${({ isActive }) => isActive ? 500 : 'normal'};
`

MenuItem.Name = MenuName;

export const MenuItem
