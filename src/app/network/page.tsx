import {api} from "wl/trpc/server";
import {NetworkCard} from "wl/app/_components/NetworkCard";

export default async function Networks({params}: { params: { slug: string } }) {
    const networks = await api.docker.listNetworks()
    return <div>
        {networks.map(element => <NetworkCard key={element.Id} expandedView={false} element={element}></NetworkCard>)}
    </div>
}
