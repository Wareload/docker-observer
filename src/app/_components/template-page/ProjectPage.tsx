'use client'
import {type ContainerInfo} from "dockerode";
import {CssCard, CssSmallButton, CssSmallButtonDisabled} from "wl/app/_utils/Css";
import {useState} from "react";
import ContainerView from "wl/app/_components/ContainerView";

export function ProjectPage({project}: { project: { key: string, value: ContainerInfo[] } }) {
    let networks = new Set<string>([])
    const [networkFilter, setNetworkFilter] = useState<string | undefined>(undefined)
    project.value.forEach((element) => {
        networks = new Set([...networks, ...Object.keys(element.NetworkSettings.Networks)])
    })
    return <div className={CssCard}>
        <h1 className="text-3xl m-1"><strong>Project: {project.key}</strong></h1>
        <div className="flex flex-row flex-wrap gap-2 m-4 ml-1 mr-1">
            {Array.from(networks).map(network => {
                return <button onClick={() => {
                    setNetworkFilter(networkFilter == network ? undefined : network);
                }}
                               className={(networkFilter && networkFilter !== network) ? CssSmallButtonDisabled : CssSmallButton}
                               key={"Network: " + network}>{network}</button>
            })}
        </div>
        {project.value.map(item => {
            return <span className={((Object.keys(item.NetworkSettings.Networks).some(nw => {
                return nw === networkFilter || networkFilter === undefined
            }) ? "" : "hidden"))} key={"Span: " + item.Id}>
                <ContainerView container={item} expandedView={true}></ContainerView>
            </span>
        })}
    </div>
}