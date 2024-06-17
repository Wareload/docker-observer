import {createTRPCRouter, publicProcedure} from "wl/server/api/trpc";
import Docker from "dockerode";
import {z} from "zod";

const dockerConnector = new Docker({socketPath: "/var/run/docker.sock"});

export const dockerRouter = createTRPCRouter({
    dockerode: publicProcedure.query(() => {
        return dockerConnector
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

