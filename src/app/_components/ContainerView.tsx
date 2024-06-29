import type {ContainerInfo, NetworkInfo} from "dockerode";
import {CssLink} from "wl/app/_utils/Css";
import ContainerActions from "wl/app/_components/ContainerActions";

export default function ContainerView({container, expandedView}: {
    container: ContainerInfo,
    expandedView: boolean
}) {
    return <div key={container.Id + "-card"} className="flex flex-col m-2">
                    <span className="truncate" key={container.Id + "-name"}><strong>Name:</strong><a
                        className={CssLink}
                        href={"/container/" + container.Id}> {container.Names.map(item => item.substring(1)).join(", ")}</a></span>
        <span className="truncate" key={container.Id + "-id"}><strong>ID:</strong><a className={CssLink}
                                                                                     href={"/container/" + container.Id}> {container.Id}</a></span>
        <span className="truncate" key={container.Id + "-image"}><strong>Image:</strong><a className={CssLink}
                                                                                           href={"/images/" + container.ImageID}> {container.Image}</a></span>
        <span className={(expandedView ? "" : "hidden") + " truncate"}
              key={container.Id + "-nw"}><strong>Networks:</strong> {createNetworkLinks(container.NetworkSettings.Networks, container.Id)}</span>
        <span className={((expandedView && container.Mounts.length !== 0) ? "" : "hidden") + " truncate"}
              key={container.Id + "-mnt"}><strong>Volumes:</strong> {createVolumeLinks(container.Mounts, container.Id)}</span>
        <span className="font-thin truncate"
              key={container.Id + "-status"}>{container.State + " - " + container.Status.toLowerCase()}</span>
        <ContainerActions item={container}></ContainerActions>
    </div>
}

function createNetworkLinks(networks: Record<string, NetworkInfo>, id: string) {
    return <>
        {Object.keys(networks).map((key: string) => {
            return <a className={CssLink} key={id + key} href={"/networks/" + networks[key]!.NetworkID}>{key}</a>
        })}
    </>
}

function createVolumeLinks(volumes: Array<{
    Name?: string | undefined;
    Type: string;
    Source: string;
    Destination: string;
    Driver?: string | undefined;
    Mode: string;
    RW: boolean;
    Propagation: string
}>, id: string) {
    return <ul className="flex flex-col list-disc ml-1 list-inside">
        {volumes.sort((a, b) => a.Destination.localeCompare(b.Destination)).map((obj) => {
            return <li className="list-item" key={"li" + id + (obj.Name ? obj.Name : obj.Destination)}>
                {obj.Type === "bind" ? <span>{obj.Destination}<span
                    className="font-thin"> (bind)</span></span> : <a
                    className={CssLink}
                    key={id + (obj.Name ? obj.Name : obj.Destination)}
                    href={"/volumes/" + obj.Name}>{obj.Destination} <span className="font-thin">({obj.Type})</span></a>}

            </li>
        })}
    </ul>
}