import type {ImageInfo} from "dockerode";

// case 1: if a has repo tags and b does not have tags
// case 2: if a has repo tags and b also has repo tags
// case 3: if a has no repo tags and b has no repo tags
// case 4: if a has repo tags and b has repo tags
export function sortImageInfo(a: ImageInfo, b: ImageInfo) {
    if (hasRepoTags(a.RepoTags)) {
        if (!hasRepoTags(b.RepoTags)) {
            return -1; //case 1
        } else {
            return a.RepoTags![0]!.localeCompare(b.RepoTags![0]!) //case 2
        }
    } else {
        if (!hasRepoTags(b.RepoTags)) {
            return a.Id.localeCompare(b.Id) //case 3
        } else {
            return 1; //case 4
        }
    }
}

function hasRepoTags(element: string[] | undefined) {
    return element !== undefined && element.length > 0;
}
