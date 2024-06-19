import {api} from "wl/trpc/server";
import {redirect} from "next/navigation";
import {ProjectPage} from "wl/app/_components/template-page/ProjectPage";

export default async function Project({params}: { params: { slug: string } }) {
    const containers = await api.docker.listContainer()
    const hit = containers.find(container => container.key == params.slug);
    if (!hit) {
        redirect("/")
    }
    return <ProjectPage project={hit}></ProjectPage>
}
