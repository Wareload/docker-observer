'use client'
import {api} from "wl/trpc/react";
import {useRouter} from "next/navigation";
import {CssSmallButton, CssSmallButtonDisabled} from "wl/app/_utils/Css";
import {type ContainerInfo} from "dockerode";
import {type UseMutationOptions, type UseMutationResult} from "@tanstack/react-query";
import {useState} from "react";
import {type TRPCClientErrorLike} from "@trpc/client";
import {type InferrableClientTypes} from "@trpc/server/unstable-core-do-not-import";

export default function ContainerActions(input: { item: ContainerInfo }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const useMutationOf = (mutationFn: {
        useMutation: (opts?: UseMutationOptions<void, TRPCClientErrorLike<InferrableClientTypes>, {
            id: string
        }>) => UseMutationResult<void, TRPCClientErrorLike<InferrableClientTypes>, {
            id: string
        }>;
    }) => mutationFn.useMutation({
        onMutate: () => setLoading(true),
        onSuccess: () => router.refresh(),
        onError: (e: TRPCClientErrorLike<InferrableClientTypes>) => alert("An error occurred: " + e.message),
        onSettled: () => setLoading(false)
    })
    const actionConfigs: {
        action: string,
        mutation: UseMutationResult<void, TRPCClientErrorLike<InferrableClientTypes>, { id: string }>,
        requiredVisibilityState: string[]
    } [] = [
        {action: 'start', mutation: useMutationOf(api.docker.startContainer), requiredVisibilityState: ['exited']},
        {action: 'restart', mutation: useMutationOf(api.docker.restartContainer), requiredVisibilityState: []},
        {action: 'pause', mutation: useMutationOf(api.docker.pauseContainer), requiredVisibilityState: ['running']},
        {action: 'unpause', mutation: useMutationOf(api.docker.unpauseContainer), requiredVisibilityState: ['paused']},
        {action: 'stop', mutation: useMutationOf(api.docker.stopContainer), requiredVisibilityState: ['running']},
        {action: 'remove', mutation: useMutationOf(api.docker.removeContainer), requiredVisibilityState: ['exited']},
    ];
    return <div className="flex flex-row gap-2 my-1">
        {actionConfigs.map((item) => <button key={"Button: " + item.action + input.item.Id} type="button"
                                             onClick={() => {
                                                 item.mutation.mutate({id: input.item.Id})
                                             }} disabled={loading}
                                             className={(loading ? CssSmallButtonDisabled : CssSmallButton) + (item.requiredVisibilityState.some(e => e !== input.item.State) ? " hidden" : "")}>{item.action}</button>)}
    </div>
}