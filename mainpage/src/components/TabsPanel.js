import React, {useMemo} from "react"
import {isThereSomethingToShow, isActiveTabInTabs, getLinks} from "../helpers/Helpers"

export function TabsPanel({tabs, activeTab, expanded}){
    //console.log("[TabsPanel] tabs:", tabs)

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

    // does not work
    // const links = getLinks(tabs, activeTab).splice().reverse()
    const links = [...getLinks(tabs, activeTab)].reverse()
    console.log("links:", links)
    const linksToShow = expanded ? links : [links[0]]
    console.log("linksToShow:", linksToShow)


    return (
        <ul className="links">
            {linksToShow.map((link, index) => (
            <li key={index}>
                <a  href={link} >{link}</a>
            </li>))}
        </ul>
    )
}