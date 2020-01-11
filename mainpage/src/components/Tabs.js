import React, {useMemo, useState} from "react"
import {getTabsWhenUnexpanded, getTabsByOptions} from "../helpers/Helpers"
import {Tab} from "./Tab"

//Receives [Tab]'s as children
export function Tabs({options, tabs}){

    //console.log("active:", tabs.find(tab=>(tab.active)))

    // active field is used only to instantiate the state
    // indexes of the tabs will be used to track activeTab
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

    const tabsToShow = options.expanded ? tabsByOptions : tabsWhenUnexpanded
    console.log("tabsToShow:", tabsToShow)

    return (
        <nav className="tabs-nav">
            {
                tabsToShow.map((tab, index)=>(
                    <Tab
                    key={tab.id}
                    tab={tab}
                    active={index === activeTab}
                    onClick={()=>{setActiveTab(index)}}
                    />
                ))
            }
        </nav>
    )
}