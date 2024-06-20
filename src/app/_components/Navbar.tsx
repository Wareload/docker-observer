'use client'
import {usePathname} from "next/navigation"

const navbarItems = [
    {description: "Container", path: "/container"},
    {description: "Images", path: "/images"},
    {description: "Network", path: "/network"},
    {description: "Volumes", path: "/volumes"},
    {description: "Stats", path: "/stats"}
]

export default function Navbar() {
    const pathname = usePathname()
    return <div className="flex flex-row flex-wrap gap-7">
        {navbarItems.map(item => {
            return <span key={item.path}
                className={`font-extrabold text-lg underline-offset-2 text-shadow ${pathname === item.path ? 'underline' : ''}`}>
            <a href={item.path}>{item.description}</a>
        </span>
        })}
    </div>
}