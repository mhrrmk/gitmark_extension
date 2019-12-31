import React from "react"

//Receives a [ModificationIndicator] as children
export function Tab({active, title, onClick, ...props}){
    //console.log("[Tab] props: ", props)
    return (
        <div className={"tab" + (active ? " active" : "")} >
            {props.children}
            <button
                className="tab-button"
                onClick={onClick}
            >{title}
            </button>
        </div>
    )
}