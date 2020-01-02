import React from "react"

//Receives [Tab]'s as children
export function Tabs(props){
    return (
        <nav className="tabs-nav">
            {props.children}
        </nav>
    )
}