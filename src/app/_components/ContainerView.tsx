import type {ContainerInfo} from "dockerode";
import {CssLink} from "wl/app/_utils/Css";
import ContainerActions from "wl/app/_components/ContainerActions";
import {createNetworkLinks, createVolumeLinks} from "wl/app/_utils/Utils";

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
