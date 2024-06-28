import {api} from "wl/trpc/server";
import {redirect} from "next/navigation";
import {DEFAULT_PAGE} from "wl/app/_utils/Consts";

export default async function Container({params}: { params: { slug: string } }) {
    try {
        const containerInfo = await api.docker.getContainer({id: params.slug})
        return <h1>Some data</h1>
    } catch (e) {
        redirect(DEFAULT_PAGE)
    }
}
