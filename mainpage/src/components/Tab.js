import React from "react"
import {Indicator} from "./Indicator"

//Receives a [ModificationIndicator] as children
export function Tab({active, tab, onClick, ...props}){
    
    const {opened, changed, closed} = tab
    //console.log("[Tab] props: ", props)

    return (
        <div className={"tab" + (active ? " active" : "")} >
            <Indicator opened={opened} changed={changed} closed={closed} />
            <button
                className="tab-button"
                onClick={onClick}
            >{tab.title}
            </button>
        </div>
    )
}