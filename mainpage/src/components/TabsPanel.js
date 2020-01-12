import React from "react"
import {isThereSomethingToShow, isActiveTabInTabs, getLinks} from "../helpers/Helpers"

export function TabsPanel({tabs, activeTab, expanded}){

    if(!isThereSomethingToShow(tabs)){
        return (
            <div className="show-nothing">THERE IS NOTHING TO SHOW</div>
        )
    }

    if(!isActiveTabInTabs(tabs, activeTab)){
        return (
            <div className="no-activeTab">ACTIVETAB IS NOT SHOWN</div>
        )
    }

    const links = getLinks(tabs, activeTab)

    return (
        <ul className="links">
            {links.map((link, index) => (
            <li key={index}>
                <a  href={link} >{link}</a>
            </li>))}
        </ul>
    )
}