'use client'
import type Dockerode from "dockerode";
import {CssLink, CssSmallButton} from "wl/app/_components/Css";
import {useState} from "react";

export default function DockerComposeCard({containers}: {
    containers: { key: string; value: Dockerode.ContainerInfo[] }
}) {
    const containerStats = getContainerStats(containers)
    const [expanded, setExpanded] = useState(false)
    return <div className="m-4 border-2 border-white rounded-2xl p-4 bg-blend-darken bg-gray-800 bg-opacity-60">
        <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-center items-center m-1">
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
                <span className="font-extrabold text-2xl">Project: <a href={"container/project/" + containers.key}
                                                                      className={CssLink}>{containers.key ? containers.key : "without"}</a></span>

            </div>
            <span
                className="ml-8 font-thin">{containerStats.running} running | {containerStats.paused} paused | {containerStats.exited} stopped</span>
        </div>

        <div className={expanded ? "flex flex-col" : "hidden"}>
            {containers.value.map((item) => {
                return <div key={item.Id} className="flex flex-col m-2">
                    <span key={item.Id}><strong>Name: </strong><a className={CssLink}
                                                 href={"container/" + item.Id}> {item.Names.map(item => item.substring(1)).join(", ")}</a></span>
                    <span key={item.Id}><strong>ID: </strong><a className={CssLink} href={"container/" + item.Id}> {item.Id}</a></span>
                    <span key={item.Id}><strong>Image: </strong><a className={CssLink}
                                                  href={"image/" + item.ImageID}> {item.Image}</a></span>
                    <span className="font-extralight"
                          key={item.Id}><strong>Status: </strong>{item.State + " - " + item.Status.toLowerCase()}</span>
                    <div className="flex flex-row gap-2 my-1">
                        <button type="button"
                                className={CssSmallButton + (item.State !== "paused" ? " hidden" : "")}>Start
                        </button>
                        <button type="button"
                                className={CssSmallButton + (item.State !== "running" ? " hidden" : "")}>Pause
                        </button>
                        <button type="button"
                                className={CssSmallButton + (item.State !== "running" && item.State !== "paused" ? " hidden" : "")}>Stop
                        </button>
                        <button type="button"
                                className={CssSmallButton + (item.State !== "exited" ? " hidden" : "")}>Remove
                        </button>
                    </div>
                </div>
            })}
        </div>
    </div>
}


function getContainerStats(containers: { key: string; value: Dockerode.ContainerInfo[] }) {
    const containerStats = {running: 0, paused: 0, exited: 0}
    containers.value.forEach(element => {
        switch (element.State) {
            case "running":
                containerStats.running++;
                break
            case "paused":
                containerStats.paused++;
                break
            case "exited":
                containerStats.exited++;
                break
        }
    })
    return containerStats
}