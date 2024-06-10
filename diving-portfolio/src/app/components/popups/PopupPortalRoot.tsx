import { DiveSiteContext } from "@/app/context/DiveSitesContext"
import { useContext } from "react"

export default function PopupPortalRoot() {
    const { showPopupModal } = useContext(DiveSiteContext);
    return (<div id="root__portal" className={'absolute h-full w-full items-center'}>
        <div id="" className={showPopupModal ? 'fixed h-full w-full bg-black opacity-80 z-40 items-center' : 'fixed h-full w-full bg-black opacity-0 hidden'}></div>
    </div>)
}