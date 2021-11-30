import React from 'react'
import { NavLink } from 'react-router-dom'
import menuItems from './menuItems'

const Menu = () => {
    return (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menuItems.map(item => (
                <li key={item.id} className="nav-item">
                    <NavLink className="nav-link" to={`/category/${item.id}`}>{item.name}</NavLink>
                </li>
            ))}     
    </ul>
    )
}

export default Menu
