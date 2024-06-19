'use client'
import {api} from "wl/trpc/react";
import {useRouter} from "next/navigation";
import {CssSmallButton} from "wl/app/_utils/Css";
import {type ContainerInfo} from "dockerode";
import {type UseMutationOptions, type UseMutationResult} from "@tanstack/react-query";

export default function ContainerActions(input: { item: ContainerInfo }) {
    const router = useRouter();
    const useMutationOf = (mutationFn: {
        useMutation: (opts?: UseMutationOptions<void, object, {
            id: string
        }>) => UseMutationResult<void, object, {
            id: string
        }>;
    }) => mutationFn.useMutation({
        onSuccess: () => {
            router.refresh()
        },
        onError: (e: object) => {
            console.error(e)
        },
    })
    const actionConfigs: {
        action: string,
        mutation: UseMutationResult<void, object, { id: string }>,
        requiredVisibilityState: string | undefined
    } [] = [
        {action: 'start', mutation: useMutationOf(api.docker.startContainer), requiredVisibilityState: 'exited'},
        {action: 'restart', mutation: useMutationOf(api.docker.restartContainer), requiredVisibilityState: undefined},
        {action: 'pause', mutation: useMutationOf(api.docker.pauseContainer), requiredVisibilityState: 'running'},
        {action: 'unpause', mutation: useMutationOf(api.docker.unpauseContainer), requiredVisibilityState: 'paused'},
        {action: 'stop', mutation: useMutationOf(api.docker.stopContainer), requiredVisibilityState: 'running'},
        {action: 'remove', mutation: useMutationOf(api.docker.removeContainer), requiredVisibilityState: 'exited'},
    ];
    return <div className="flex flex-row gap-2 my-1">
        {actionConfigs.map((item) => <button key={"Button: " + item.action + input.item.Id} type="button"
                                             onClick={() => {
                                                 item.mutation.mutate({id: input.item.Id})
                                             }}
                                             className={CssSmallButton + (item.requiredVisibilityState && (input.item.State !== item.requiredVisibilityState ? " hidden" : ""))}>{item.action}</button>)}
    </div>
}