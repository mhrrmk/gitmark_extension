import { useReducer } from "react";

const actions = {
    TOGGLE_EXPANDED: "set_expanded",
    SET_ACTIVE_TAB: "set_active_tab",
    TOGGLE_OPTION: "toggle_option"
}

const initialState = {
    expanded: false,
    activeTab: 1,
    show: {
        opened: true,
        closed: false,
        changed: true,
        unchanged: true,
    }
}

function reducer(state, [type, payload]){
    switch (type) {
        case actions.TOGGLE_EXPANDED:{
            console.log("[TOGGLE_EXPANDED] before: ", state.expanded)
            console.log("State: ", state)
            return {
                ...state,
                expanded: !state.expanded
            }}
        case actions.SET_ACTIVE_TAB:{
            console.log("[SET_ACTIVE_TAB] id:", payload.id)
            console.log("State: ", state)
            return {
                ...state,
                activeTab: payload.id
            }}
        case actions.TOGGLE_OPTION:{
            console.log("[TOGGLE_OPTION] option:", payload.id, ", before: ", state.show[payload.id])
            console.log("State: ", state)
            return {
                ...state,
                show: {
                    ...state.show,
                    [payload.id]: !state.show[payload.id]
                }} }
        default: return state
    }}

export function useCommitPointState(){
    const [state, dispatch] = useReducer(reducer, initialState)
    return [state, actions, dispatch]
}