'use client'

import {type VolumeInspectInfo} from "dockerode";
import {useState} from "react";
import {CssCard, CssLink} from "wl/app/_utils/Css";

export function VolumesCard({element, expandedView}: {element: VolumeInspectInfo & {CreatedAt?: string}, expandedView: boolean}){
    const [expanded, setExpanded] = useState(false)
    return <div
        className={CssCard}>
        <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-center items-center w-full">
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
                <span className="font-extrabold text-2xl block truncate w-full"><a href={"/networks/" + element.Name}
                                                             className={CssLink}>{element.Name}</a></span>
            </div>
        </div>
        <div className={expanded ? "flex flex-col flex-wrap gap-2 m-4 ml-1 mr-1 mb-0" : "hidden"}>
            <span className="truncate w-full"><strong>MountPoint: </strong>{element.Mountpoint}</span>
            <span><strong>Scope: </strong>{element.Scope}</span>
            <span><strong>Created: </strong>{new Date(element.CreatedAt!).toDateString()}</span>
        </div>
    </div>
}