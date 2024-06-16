'use client'
import {usePathname} from "next/navigation"


export default function Navbar() {
    const pathname = usePathname()
    return (<div className="flex flex-row flex-wrap gap-7">
        <span className={`font-bold underline-offset-2 ${pathname === '/container' ? 'underline' : ''}`}>
            <a href="container">Container</a>
        </span>
        <span className={`font-bold underline-offset-2 ${pathname === '/images' ? 'underline' : ''}`}>
            <a href="images">Images</a>
        </span>
        <span className={`bold font-bold underline-offset-2 ${pathname === '/network' ? 'underline' : ''}`}>
            <a href="network">Network</a>
        </span>
        <span className={`font-bold underline-offset-2 ${pathname === '/volumes' ? 'underline' : ''}`}>
            <a href="volumes">Volumes</a>
        </span>
        <span className={`font-bold underline-offset-2 ${pathname === '/stats' ? 'underline' : ''}`}>
            <a href="stats">Stats</a>
        </span>
    </div>)
}