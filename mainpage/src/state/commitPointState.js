import { useReducer } from "react";

const actions = {
    TOGGLE_EXPANDED: "set_expanded",
    TOGGLE_OPTION: "toggle_option"
}

const initialState = {
    expanded: false,
    show: {
        opened: true,
        closed: true,
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