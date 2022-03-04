import React from 'react'
import './SidebarOption.css'
import SvgIcon from '@mui/material/Icon'

function SidebarOption({active, text, Icon, bird}) {
    return (
        <div className={`sidebarOption ${bird && 'sidebarOption--bird'} ${active && 'sidebarOption--active'}`}>
            <Icon/> 
            <h2>{text}</h2>
        </div>
    )
}

export default SidebarOption
