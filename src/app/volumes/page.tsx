import {api} from "wl/trpc/server";
import {VolumesCard} from "wl/app/_components/VolumeCard";

export default async function Container({params}: { params: { slug: string } }) {
    const volumes = await api.docker.listVolumes();
    return <>
        {volumes.Volumes.map(volume => (
                <VolumesCard key={volume.Name} element={volume} expandedView={false}></VolumesCard>
            ))}
        </>
}
