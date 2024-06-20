import DockerComposeCard from "wl/app/_components/DockerComposeCard";
import {api} from "wl/trpc/server";

export default async function Home() {
    const containers = await api.docker.listContainer()
    return (
        <div className="2xl:max-w-[800px] xl:w-3/5  md:w-3/4 w-full">
            {containers.map((element) => {
                return <DockerComposeCard key={element.key} containers={element}></DockerComposeCard>
            })}
        </div>
    )
}
