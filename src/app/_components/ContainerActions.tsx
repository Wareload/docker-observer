'use client'
import {api} from "wl/trpc/react";
import {useRouter} from "next/navigation";
import {CssSmallButton} from "wl/app/_utils/Css";
import {type ContainerInfo} from "dockerode";

export default function ContainerActions(input: { item: ContainerInfo }) {
    const router = useRouter();
    const useMutationOf = (mutationFn: { useMutation: any}) => mutationFn.useMutation({
        onSuccess: () => router.refresh(),
        onError: (e: Error) => console.error(e),
    })
    const actionConfigs = [
        {action: 'start', mutation: useMutationOf(api.docker.startContainer), allowedVisibilityState: 'exited'},
        {action: 'restart', mutation: useMutationOf(api.docker.restartContainer), allowedVisibilityState: undefined},
        {action: 'pause', mutation: useMutationOf(api.docker.pauseContainer), allowedVisibilityState: 'running'},
        {action: 'unpause', mutation: useMutationOf(api.docker.unpauseContainer), allowedVisibilityState: 'paused'},
        {action: 'stop', mutation: useMutationOf(api.docker.stopContainer), allowedVisibilityState: 'running'},
        {action: 'remove', mutation: useMutationOf(api.docker.removeContainer), allowedVisibilityState: 'exited'},
    ];
    return <div className="flex flex-row gap-2 my-1">
        {actionConfigs.map((item) => <button key={"Button: " + item.action + input.item.Id} type="button"
                                             onClick={() => {
                                                 item.mutation.mutate({id: input.item.Id})
                                             }}
                                             className={CssSmallButton + (item.allowedVisibilityState && (input.item.State !== item.allowedVisibilityState ? " hidden" : ""))}>{item.action}</button>)}
    </div>
}