import React, {useMemo, useState} from "react"
import {getTabsWhenUnexpanded, getTabsByOptions} from "../helpers/Helpers"
import {Tab, TabsPanel} from "."

//Receives [Tab]'s as children
export function Tabs({options, tabs}){

    //console.log("active:", tabs.find(tab=>(tab.active)))

    // active field is used only to instantiate the state
    // ids of the tabs will be used to track activeTab
    const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.active === true).id)
    console.log("activeTab id:", activeTab)

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
                tabsToShow.map(tab => (
                    <Tab
                    key={tab.id}
                    tab={tab}
                    active={tab.id === activeTab}
                    onClick={()=>{setActiveTab(tab.id)}}
                    />
                ))
            }
            <TabsPanel
            tabs={tabsToShow}
            activeTab={activeTab}
            expanded={options.expanded}
            />
        </nav>
    )
}