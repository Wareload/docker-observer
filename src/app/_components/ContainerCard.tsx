import type {ContainerInfo} from "dockerode";
import {CssCard, CssLink} from "wl/app/_utils/Css";
import ContainerActions from "wl/app/_components/ContainerActions";
import {createNetworkLinks, createVolumeLinks} from "wl/app/_utils/Utils";
import {useState} from "react";

export default function ContainerCard({container, expandedView}: {
    container: ContainerInfo,
    expandedView: boolean
}) {
    const [expanded, setExpanded] = useState(false)
    return <div key={container.Id + "-card"} className={CssCard}>
        <div className="flex flex-col">
            <div className="flex flex-row">
                <button onClick={() => setExpanded(!expanded)}
                        className="relative mr-4 h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg border border-white text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
                        type="button">
      <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
          {expanded ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                           stroke="white"
                           className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5"/>
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="white"
                        className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"/>
          </svg>}
      </span>
                </button>

                <span key={"Header" + container.Id} className="font-extrabold text-2xl truncate flex items-center"><a
                    href={"/container/" + container.Id}
                    className={CssLink}>{container.Names.map(item => item.substring(1)).join(", ")}</a></span>
            </div>
            <div className={expanded ? "flex flex-col flex-wrap gap-2 m-4 ml-1 mr-1 mb-0" : "hidden"}>

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
        </div>
    </div>
}
