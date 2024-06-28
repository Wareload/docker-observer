import type {ContainerInfo} from "dockerode";

export function getContainerStats(containers: { key: string; value: ContainerInfo[] }) {
    const containerStats = {running: 0, paused: 0, exited: 0}
    containers.value.forEach(element => {
        switch (element.State) {
            case "running":
                containerStats.running++;
                break
            case "paused":
                containerStats.paused++;
                break
            case "exited":
                containerStats.exited++;
                break
        }
    })
    return containerStats
}