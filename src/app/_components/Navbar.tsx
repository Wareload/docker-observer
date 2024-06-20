'use client'
import {usePathname} from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()
    return (<div className="flex flex-row flex-wrap gap-7">
        <span className={`font-extrabold underline-offset-2 text-shadow ${pathname === '/container' ? 'underline' : ''}`}>
            <a href="/container">Container</a>
        </span>
        <span className={`font-extrabold underline-offset-2 text-shadow ${pathname === '/images' ? 'underline' : ''}`}>
            <a href="/images">Images</a>
        </span>
        <span className={`font-extrabold underline-offset-2 text-shadow ${pathname === '/network' ? 'underline' : ''}`}>
            <a href="/network">Network</a>
        </span>
        <span className={`font-extrabold underline-offset-2 text-shadow ${pathname === '/volumes' ? 'underline' : ''}`}>
            <a href="/volumes">Volumes</a>
        </span>
        <span className={`font-extrabold underline-offset-2 text-shadow ${pathname === '/stats' ? 'underline' : ''}`}>
            <a href="/stats">Stats</a>
        </span>
    </div>)
}