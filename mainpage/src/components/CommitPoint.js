import React, {useMemo} from "react"
import {DetailsButton, TabTypesOption, Content, Tabs, Tab, Links, ModificationIndicator} from "."
import {useCommitPointState} from "../state/commitPointState"
import {get_shown_tabs, get_links_of_active_tab} from "../helpers/Helpers"

export function CommitPoint({tabs}){
    //const [state, dispatch] = useReducer(reducer, initialState)
    const [state, actions, dispatch] = useCommitPointState()

    const shownTabs = useMemo(()=>{
        console.log("shownTabs calculated")
        return get_shown_tabs(state.show, tabs)},
        [state.show, tabs])

    const linksOfActiveTabInShownTabs = useMemo(
        () => get_links_of_active_tab(shownTabs, state.activeTab),
        [shownTabs, state.activeTab])

    const linksOfActiveTabInTabs = useMemo(
        () => get_links_of_active_tab(tabs, state.activeTab),
        [tabs, state.activeTab])

    const tabsToShow = state.expanded ? shownTabs : tabs

    const links = state.expanded ? linksOfActiveTabInShownTabs : linksOfActiveTabInTabs.slice(0, 1)

    return (
        <li className={"commit-point"} >
            <DetailsButton
                onClick={()=>dispatch([actions.TOGGLE_EXPANDED])} />
            <Content
                expanded={state.expanded} >
                <Tabs>
                    {tabsToShow.map(tab=>(
                    <Tab
                        title={tab.title}
                        active={tab.id === state.activeTab}
                        onClick={()=>dispatch([actions.SET_ACTIVE_TAB, {id: tab.id}])} >
                        {state.expanded &&
                        <ModificationIndicator
                            opened={tab.opened}
                            closed={tab.closed}
                            changed={tab.changed} />}
                    </Tab>))}
                </Tabs>
                <Links links={links}/>
            </Content>
            {state.expanded &&
            <TabTypesOption
                handleToggle={(id)=>dispatch([actions.TOGGLE_OPTION, {id: id}])}
                {...state.show} />}
        </li>
    )
}