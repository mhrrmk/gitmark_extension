
// returns links of the active tab in a given set of tabs
// returns empty if the active tab is not in the given tabs or...
// ...the given list of tabs is empty
// export function getLinksOfActiveTab(tabs, activeTab){
//     if (Object.keys(tabs).length===0){
//         return ["no tabs shown"]
//     }
//     const activeTabInList = tabs.filter(tab => {
//         if (tab.id === activeTab){return true}
//         return false
//     })
//     if (activeTabInList.length===0){
//         return ["active tab is not in shown tabs"]
//     }
//     return activeTabInList[0].links
// }

// filters a collection of tabs based on options
export function getTabsByOptions({opened, closed, changed, unchanged}, tabs){
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

// exclude closed tabs
export const getTabsWhenUnexpanded = tabs => tabs.filter(tab => tab.closed !== true)

// if same index, put closed one before
// if still same, put closed before, before
export function sortTabs(tabs){
    return [...tabs].sort((f, s)=>{
        if(f.index !== s.index){
            return f.index < s.index
        }
        if(f.closed && s.closed){
            return f.closedTime - s.closedTime
        }
        if(f.closed){
            return -1
        }
       return 1
    })
}

export const isThereSomethingToShow = tabs => tabs.length !== 0

export const isActiveTabInTabs = (tabs, activeTab) => tabs.some(tab => tab.id === activeTab)

export const getLinks = (tabs, activeTab) => tabs.find(tab => tab.id === activeTab).links