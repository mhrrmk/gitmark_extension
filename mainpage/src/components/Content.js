import React from "react"

//Receives [Tabs] and [Links] as children
export function Content({expanded, ...props}){
        
    return (
        <div className={"content" + (expanded ? "-expanded" : "")}>
            {props.children}
        </div>
    )
}