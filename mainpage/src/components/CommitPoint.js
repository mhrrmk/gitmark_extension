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

    return (
        <li className={"commit-point"} >
            <div className="settings">
                <ExpandButton
                expanded={state.expanded}
                onClick={()=>dispatch([actions.TOGGLE_EXPANDED])}
                />
                <Options
                handleToggle={(id)=>dispatch([actions.TOGGLE_OPTION, {id: id}])}
                {...state.show}
                expanded={state.expanded}
                />
            </div>
            <Tabs
            options={state}
            tabs={sortedTabs}
            />
        </li>
    )
}