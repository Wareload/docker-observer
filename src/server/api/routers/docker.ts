import {createTRPCRouter, publicProcedure} from "wl/server/api/trpc";
import Docker from "dockerode";

const dockerode = new Docker({socketPath: "/var/run/docker.sock"});

export const dockerRouter = createTRPCRouter({
    test: publicProcedure
        .query(() => {
            return "Hallo"
        }),
    dockerode: publicProcedure.query(()=>{
        return dockerode
    }),
});

