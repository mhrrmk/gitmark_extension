import React, {useMemo} from "react"

export function Indicator({opened, closed, changed}){
    //console.log("[Indicator] props: ", opened, changed, closed)
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
const coloredArea = (color) => (
    <div key={color} className={"indicator-button bg-" + color} />)
