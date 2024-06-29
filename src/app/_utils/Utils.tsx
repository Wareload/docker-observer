import type {NetworkInfo} from "dockerode";
import {CssLink} from "wl/app/_utils/Css";

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


export function createNetworkLinks(networks: Record<string, NetworkInfo>, id: string) {
    return <>
        {Object.keys(networks).map((key: string) => {
            return <a className={CssLink} key={id + key} href={"/networks/" + networks[key]!.NetworkID}>{key}</a>
        })}
    </>
}

export function createVolumeLinks(volumes: Array<{
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