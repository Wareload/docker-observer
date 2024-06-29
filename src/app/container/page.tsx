'use client'
import {useState} from "react";
import {api} from "wl/trpc/react";
import ContainerCard from "wl/app/_components/ContainerCard";

export default function Container() {
    const containers= api.docker.listAllContainer.useQuery()
    const [search, setSearch] = useState<string>("")
    if (containers.error){
        return <h1>Something went wrong</h1>
    }
    return (
        <div>
            <input type="text" id="searchInput" placeholder={"Search..."} onChange={e => setSearch(e.target.value)}
                   className="border w-fill-available m-4 text-base rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-800 font-bold dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {containers.data?.map((element) => {
                if (element.Names.join(", ").toLowerCase().includes(search.toLowerCase())) {
                    return <ContainerCard container={element} expandedView={false}></ContainerCard>
                }
            })}
        </div>
    )
}
