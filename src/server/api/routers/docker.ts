import {createTRPCRouter, publicProcedure} from "wl/server/api/trpc";
import Docker, {type ContainerInfo} from "dockerode";
import {z} from "zod";

const dockerConnector = new Docker({socketPath: "/var/run/docker.sock"});

export const dockerRouter = createTRPCRouter({
    listImages: publicProcedure.query(async () => {
        return await dockerConnector.listImages({all: true})
    }),
    listContainer: publicProcedure.query(async () => {
        return await listContainer()
    }),
    getContainer: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        return await dockerConnector.getContainer(input.id).inspect()
    }),
    getImage: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        return await dockerConnector.getImage(input.id).inspect()
    }),
    startContainer: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        await dockerConnector.getContainer(input.id).start()
    }),
    pauseContainer: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        await dockerConnector.getContainer(input.id).pause()
    }),
    stopContainer: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        await dockerConnector.getContainer(input.id).stop()
    }),
    removeContainer: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        await dockerConnector.getContainer(input.id).remove()
    }),
    unpauseContainer: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        await dockerConnector.getContainer(input.id).unpause()
    }),
    restartContainer: publicProcedure.input(z.object({id: z.string()})).mutation(async ({ctx, input}) => {
        await dockerConnector.getContainer(input.id).restart()
    })
});

async function listContainer() {
    await dockerConnector.listContainers({})
    const container = await dockerConnector.listContainers({all: true});
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
    return array.sort((a, b) => a.key.localeCompare(b.key));
}