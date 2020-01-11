import React from "react"
import {ExpandButton, Options, Tabs} from "."
import {useCommitPointState} from "../state/commitPointState"
import {sortTabs} from "../helpers/Helpers"

export function CommitPoint({tabs}){
    console.log("tabs:", tabs)
    //const [state, dispatch] = useReducer(reducer, initialState)
    const [state, actions, dispatch] = useCommitPointState()

    // tabs will have elements with identical index fields.
    // this will sort those looking at closed and closingTime fields.
    // from this point on indexes of generated array will be used to identify elements
    const sortedTabs = sortTabs(tabs)
    console.log("sortedTabs:", sortedTabs)

    // const shownTabs = useMemo(()=>{
    //     console.log("shownTabs calculated")
    //     return get_shown_tabs(state.show, tabs)},
    //     [state.show, tabs])

    // const linksOfActiveTabInShownTabs = useMemo(
    //     () => get_links_of_active_tab(shownTabs, state.activeTab),
    //     [shownTabs, state.activeTab])

    // const linksOfActiveTabInTabs = useMemo(
    //     () => get_links_of_active_tab(tabs, state.activeTab),
    //     [tabs, state.activeTab])

    // const tabsToShow = state.expanded ? shownTabs : tabs

    // const links = state.expanded ? linksOfActiveTabInShownTabs : linksOfActiveTabInTabs.slice(0, 1)

    return (
        <li className={"commit-point"} >
            <ExpandButton
            expanded
            onClick={()=>dispatch([actions.TOGGLE_EXPANDED])}
            />
            <Tabs
            options={state}
            tabs={sortedTabs}
            />
            <Options
            handleToggle={(id)=>dispatch([actions.TOGGLE_OPTION, {id: id}])}
            {...state.show}
            expanded={state.expanded}
            />
        </li>
    )
}