import React, {useMemo} from "react"

export function ModificationIndicator({opened, closed, changed}){
    //console.log("[ModificationIndicator] props: ", props)
    const indicator = useMemo(() => {
        let colors = []
        if (!(opened || closed || changed)){
            colors.push(coloredArea("blue"))
            return (<div className="tab-mod">{colors}</div>)
        }
        if(opened){
            colors.push(coloredArea("green"))
        }
        if(changed){
            colors.push(coloredArea("orange"))
        }
        if(closed){
            colors.push(coloredArea("red"))
        }
        return (<div className="tab-mod">{colors}</div>)
    }, [opened, changed, closed])

    return indicator
}

export function coloredArea(color){
    return (<div key={color} className={"indicator-button bg-" + color} />)}
