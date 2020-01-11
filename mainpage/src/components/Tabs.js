import React, {useMemo, useState} from "react"
import {getTabsWhenUnexpanded, getTabsByOptions} from "../helpers/Helpers"


//Receives [Tab]'s as children
export function Tabs({options, tabs}){

    //console.log("active:", tabs.find(tab=>(tab.active)))

    const [activeTab, setActiveTab] = useState(tabs.findIndex(tab=>(tab.active)))
    console.log("activeTab Index:", activeTab)

    const tabsWhenUnexpanded = useMemo(()=>{
        return getTabsWhenUnexpanded(tabs)
    },[tabs])
    console.log("tabsWhenUnexpanded:", tabsWhenUnexpanded)

    const tabsByOptions = useMemo(()=>{
        return getTabsByOptions(options.show, tabs)
    }, [options.show, tabs])
    console.log("tabsByOptions:", tabsByOptions)

    return (
        <nav className="tabs-nav">
        </nav>
    )
}