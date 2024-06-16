import {api} from "wl/trpc/server";
import {type ContainerInfo} from "dockerode";

export default async function Home() {
    const container = await listContainer()
    return (
        <main
            className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                    Docker Observer
                </h1>
                <div className="sm:grid-cols-2 md:gap-8 flex flex-col">
                    {container.map(item => {
                        return <div key={item.key} className="flex flex-col">
                            <h3 key={item.key}>Project: {item.key}</h3>
                            {item.value.map(element => {
                                return <span key={element.Id}>{element.Names[0]!.substring(1)}</span>
                            })}
                        </div>
                    })}
                </div>
            </div>
        </main>
    );
}


async function listContainer() {
    const container = await (await api.docker.dockerode()).listContainers();

    const array: { key: string, value: ContainerInfo[] }[] = []
    container.forEach((item) => {
        const key = item.Labels["com.docker.compose.project"] ?? "<empty>";
        const hit = array.find(element => element.key == key);
        if (hit) {
            hit.value.push(item);
        } else {
            array.push({key: key, value: [item]});
        }
    })
    return array;
}