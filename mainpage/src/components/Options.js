import React from "react";

export function Options({opened, closed, changed, unchanged, handleToggle}){
    return(
        <ul className="tab-types-options">
            <li>
                <input
                    type="checkbox"
                    checked={unchanged}
                    onChange={()=>handleToggle("unchanged")}
                />no change
            </li>
            <li>
                <input
                    type="checkbox"
                    checked={opened}
                    onChange={()=>handleToggle("opened")}
                />opened
            </li>
            <li>
                <input
                    type="checkbox"
                    checked={closed}
                    onChange={()=>handleToggle("closed")}
                />closed
            </li>
            <li>
                <input
                    type="checkbox"
                    checked={changed}
                    onChange={()=>handleToggle("changed")}
                />changed
            </li>
        </ul>
        
    )
}