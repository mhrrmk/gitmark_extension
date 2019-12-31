
// returns links of the active tab in a given set of tabs
// returns empty if the active tab is not in the given tabs or...
// ...the given list of tabs is empty
export function get_links_of_active_tab(tabs, activeTab){
    if (Object.keys(tabs).length===0){
        return ["no tabs shown"]
    }
    const activeTabInList = tabs.filter(tab => {
        if (tab.id===activeTab){return true}
        return false
    })
    if (activeTabInList.length===0){
        return ["active tab is not in shown tabs"]
    }
    return activeTabInList[0].links
}

// filters a collection of tabs based on options
export function get_shown_tabs({opened, closed, changed, unchanged}, tabs){
    return tabs.filter(tab => {
        if (
            (opened && tab.opened) ||
            (closed && tab.closed) ||
            (changed && tab.changed) ||
            (unchanged && !(tab.opened || tab.closed || tab.changed))
        ){
            return true
        }
        return false
    })
}