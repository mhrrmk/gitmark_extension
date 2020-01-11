import React, {useMemo, useState} from "react"
import {getTabsWhenUnexpanded} from "../helpers/Helpers"


//Receives [Tab]'s as children
export function Tabs({options, tabs}){

    const [activeTab, setActiveTab] = useState(tabs.filter(tab=>(tab.active === true))[0])

    const tabsWhenUnexpanded = useMemo(()=>{
        return getTabsWhenUnexpanded(tabs)
    },[tabs])

    console.log("tabsWhenUnexpanded:", tabsWhenUnexpanded)

    return (
        <nav className="tabs-nav">
        </nav>
    )
}