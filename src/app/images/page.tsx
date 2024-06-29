'use client'
import {ImageView} from "wl/app/_components/ImageView";
import {api} from "wl/trpc/react";
import {useState} from "react";

export default function Image() {
    const images = api.docker.listImages.useQuery()
    const [search, setSearch] = useState<string>("")
    if (images.error){
        return <h1>Something went wrong</h1>
    }
    return <div>
        <input type="text" id="searchInput" placeholder={"Search..."} onChange={e => setSearch(e.target.value)}
               className="border w-fill-available m-4 text-base rounded-lg focus:ring-blue-500 block p-2.5 dark:bg-gray-800 font-bold dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        {images.data?.map((element) => {
            if (element.RepoTags?.join(", ").toLowerCase().includes(search.toLowerCase())) {
                return <ImageView key={element.Id} element={element}></ImageView>
            }
        })}
    </div>
}

