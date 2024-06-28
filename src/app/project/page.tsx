import {api} from "wl/trpc/server";
import {redirect} from "next/navigation";
import {ProjectPage} from "wl/app/_components/template-page/ProjectPage";
import {DEFAULT_PAGE} from "wl/app/_utils/Consts";

export default async function Project() {
    const containers = await api.docker.listContainer()
    const hit = containers.find(container => container.key == "")
    if (!hit) {
        redirect(DEFAULT_PAGE)
    }
    return <ProjectPage project={{...hit, key: "<none>"}}/>;

}
