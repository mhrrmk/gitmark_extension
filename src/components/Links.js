import React from "react"

export function Links({links}){
    return (
        <ul>
            {links.map(link => (
            <li key={link}>
                <a  href={link} >{link}</a>
            </li>))}
        </ul>
    )
}