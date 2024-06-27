import {api} from "wl/trpc/server";

export default async function Networks({params}: { params: { slug: string } }) {
    const networks = (await api.docker.listNetworks())
    return <div>
        {networks.join(", ")}
    </div>
}
