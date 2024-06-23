import {CssCard} from "wl/app/_utils/Css";
import {api} from "wl/trpc/server";
import {ImageInfo} from "dockerode";

export default async function Home() {
    const images = await api.docker.listImages()
    return <div className={CssCard}>
        <h1 className="text-3xl m-1"><strong>Images:</strong></h1>
        <div className="flex flex-col flex-wrap gap-2 m-4 ml-1 mr-1">
            {images.map((element) => {return Image(element)})}
        </div>
    </div>
}

function Image(element: ImageInfo){
    return <div className="flex flex-col flex-wrap gap-2 m-4 ml-1 mr-1">
        //TODO
        <span>{element.Id}</span>
    </div>
}



/*
{images.map(image => {
    return <span key={image.Id}>{image.RepoTags?.map(element =>{return <span key={element}>{element}</span>})}</span>
})}
*/