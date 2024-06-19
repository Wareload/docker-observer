'use client'
import {api} from "wl/trpc/react";
import {useRouter} from "next/navigation";
import {CssSmallButton} from "wl/app/_utils/Css";
import {type ContainerInfo} from "dockerode";

export default function ContainerActions(input: { item: ContainerInfo }) {
    const router = useRouter();
    const restartContainer = api.docker.restartContainer.useMutation({
        onSuccess: () => {
            router.refresh()
        },
        onError: (e) => {
            console.error(e)
        }
    })
    const pauseContainer = api.docker.pauseContainer.useMutation({
        onSuccess: () => {
            router.refresh()
        },
        onError: (e) => {
            console.error(e)
        }
    })
    const unpauseContainer = api.docker.unpauseContainer.useMutation({
        onSuccess: () => {
            router.refresh()
        },
        onError: (e) => {
            console.error(e)
        }
    })
    const stopContainer = api.docker.stopContainer.useMutation({
        onSuccess: () => {
            router.refresh()
        },
        onError: (e) => {
            console.error(e)
        }
    })
    const removeContainer = api.docker.removeContainer.useMutation({
        onSuccess: () => {
            router.refresh()
        },
        onError: (e) => {
            console.error(e)
        }
    })
    const startContainer = api.docker.startContainer.useMutation({
        onSuccess: () => {
            router.refresh()
        },
        onError: (e) => {
            console.error(e)
        }
    })
    return <div className="flex flex-row gap-2 my-1">
        <button type="button" onClick={() => {
            startContainer.mutate({id: input.item.Id})
        }}
                className={CssSmallButton + (input.item.State !== "exited" ? " hidden" : "")}>Start
        </button>
        <button type="button" onClick={() => {
            restartContainer.mutate({id: input.item.Id})
        }}
                className={CssSmallButton}>Restart
        </button>
        <button type="button" onClick={() => {
            pauseContainer.mutate({id: input.item.Id})
        }}
                className={CssSmallButton + (input.item.State !== "running" ? " hidden" : "")}>Pause
        </button>
        <button type="button" onClick={() => {
            unpauseContainer.mutate({id: input.item.Id})
        }}
                className={CssSmallButton + (input.item.State !== "paused" ? " hidden" : "")}>Unpause
        </button>
        <button type="button" onClick={() => {
            stopContainer.mutate({id: input.item.Id})
        }}
                className={CssSmallButton + (input.item.State !== "running" ? " hidden" : "")}>Stop
        </button>
        <button type="button" onClick={() => {
            removeContainer.mutate({id: input.item.Id})
        }}
                className={CssSmallButton + (input.item.State !== "exited" ? " hidden" : "")}>Remove
        </button>
    </div>
}