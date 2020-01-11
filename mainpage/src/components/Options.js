import React from "react";

export function Options({opened, closed, changed, unchanged, handleToggle, expanded}){
    return(
        <ul className="tab-types-options">
            <li>
                <input
                disabled={!expanded}
                type="checkbox"
                checked={unchanged}
                onChange={()=>handleToggle("unchanged")}
                />no change
            </li>
            <li>
                <input
                disabled={!expanded}
                type="checkbox"
                checked={opened}
                onChange={()=>handleToggle("opened")}
                />opened
            </li>
            <li>
                <input
                disabled={!expanded}
                type="checkbox"
                checked={closed}
                onChange={()=>handleToggle("closed")}
                />closed
            </li>
            <li>
                <input
                disabled={!expanded}
                type="checkbox"           
                checked={changed}
                onChange={()=>handleToggle("changed")}
                />changed
            </li>
        </ul>
        
    )
}