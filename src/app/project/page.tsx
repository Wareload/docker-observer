import {api} from "wl/trpc/server";
import {redirect} from "next/navigation";
import {ProjectPage} from "wl/app/_components/template-page/ProjectPage";

export default async function Project() {
    const containers = await api.docker.listContainer()
    const hit = containers.find(container => container.key == "")
    if (!hit) {
        redirect("/")
    }
    return <ProjectPage project={{...hit, key: "Without project"}}/>;

}
