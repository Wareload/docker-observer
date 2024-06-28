import {redirect} from "next/navigation";
import {DEFAULT_PAGE} from "wl/app/_utils/Consts";

export default async function Home() {
    redirect(DEFAULT_PAGE)
}
