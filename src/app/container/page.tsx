import DockerComposeCard from "wl/app/_components/DockerComposeCard";
import {api} from "wl/trpc/server";

export default async function Home() {
    const containers = await api.docker.listContainer()
    return (
        <div>
            {containers.map((element) => {
                return <DockerComposeCard key={element.key} containers={element}></DockerComposeCard>
            })}
        </div>
    )
}
