import React from "react"

export function  ExpandButton({expanded, onClick}){
    return (
        <button
            className="details-button"
            onClick={onClick}
            >details
        </button>
    )
} 
