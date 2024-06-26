import {api} from "wl/trpc/server";
import {sortImageInfo} from "wl/app/_utils/Images";
import {ImageView} from "wl/app/_components/ImageView";

export default async function Image() {
    const images = (await api.docker.listImages()).sort(sortImageInfo)
    return <div>
        {images.map((element) => {
            return <ImageView key={element.Id} element={element}></ImageView>
        })}
    </div>
}

