
import {api} from "wl/trpc/server";
import type {ContainerInfo} from "dockerode";
import DockerComposeCard from "wl/app/_components/DockerComposeCard";

export default async function Home() {
    const containers = (await listContainer()).sort((a, b) => {
        return a.key.localeCompare(b.key)
    })

    return (
        <div>
            {containers.map((element) => {
                return <DockerComposeCard key={element.key} containers={element}></DockerComposeCard>
            })}
        </div>
    )
}

async function listContainer() {
    const container = await (await api.docker.dockerode()).listContainers({all:true});

    const array: { key: string, value: ContainerInfo[] }[] = []
    container.forEach((item) => {
        const key = item.Labels["com.docker.compose.project"] ?? "";
        const hit = array.find(element => element.key == key);
        if (hit) {
            hit.value.push(item);
        } else {
            array.push({key: key, value: [item]});
        }
    })
    return array;
}