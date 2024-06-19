'use client'
import {type ContainerInfo} from "dockerode";
import {CssSmallButton, CssSmallButtonDisabled} from "wl/app/_utils/Css";
import {useState} from "react";

export function ProjectPage({project}: { project: { key: string, value: ContainerInfo[] } }) {
    let networks = new Set<string>([])
    const [networkFilter, setNetworkFilter] = useState<string | undefined>(undefined)
    project.value.forEach((element) => {
        networks = new Set([...networks, ...Object.keys(element.NetworkSettings.Networks)])
    })
    return <div className="flex flex-col">
        <h1 className="text-3xl"><strong>{project.key}</strong></h1>
        <div className="flex flex-row flex-wrap gap-2 m-4">
            {Array.from(networks).map(network => {
                return <button onClick={() => {
                    if (networkFilter == network) {
                        setNetworkFilter(undefined);
                    } else {
                        setNetworkFilter(network)
                    }
                }}
                               className={(networkFilter !== undefined && networkFilter !== network) ? CssSmallButtonDisabled : CssSmallButton}
                               key={"Network: " + network}>{network}</button>
            })}
        </div>
        {project.value.map(item => {
            return <>
                <span className={((Object.keys(item.NetworkSettings.Networks).some(nw => {
                    return nw === networkFilter || networkFilter === undefined
                }) ? "" : "opacity-30"))} key={"Span: " + item.Id}>{item.Image}</span>
            </>
        })}
    </div>
}