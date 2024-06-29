'use client'
import {usePathname} from "next/navigation"

const navbarItems = [
    {description: "Projects", path: "/projects"},
    {description: "Container", path: "/container"},
    {description: "Images", path: "/images"},
    {description: "Networks", path: "/networks"},
    {description: "Volumes", path: "/volumes"}
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