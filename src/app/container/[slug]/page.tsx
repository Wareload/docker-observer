import {api} from "wl/trpc/server";
import {redirect} from "next/navigation";
import DetailedContainerView from "wl/app/_components/DetailedContainerView";

export default async function Container({params}: { params: { slug: string } }) {
    try {
        const containerInfo = await api.docker.getContainer({id: params.slug})
        return <DetailedContainerView containerInspectInfo={containerInfo}></DetailedContainerView>
    } catch (e) {
        redirect("/")
    }
}
