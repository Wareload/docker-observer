'use client'
import {NetworkCard} from "wl/app/_components/NetworkCard";
import {useState} from "react";
import {api} from "wl/trpc/react";

export default function Networks() {
    const [search, setSearch] = useState<string>("")
    const networks = api.docker.listNetworks.useQuery()
    if (networks.error) {
        return <h1>Something went wrong</h1>
    }
    return <div>
        <input type="text" id="searchInput" placeholder={"Search..."} onChange={e => setSearch(e.target.value)}
               className="border w-fill-available m-4 text-base rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-800 font-bold dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        {networks.data?.map((element) => {
                if (element.Name.toLowerCase().includes(search.toLowerCase())) {
                    return <NetworkCard key={element.Id} expandedView={false} element={element}></NetworkCard>
                }
            }
        )}
    </div>
}
