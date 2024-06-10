import { DiveSiteContext } from "@/app/context/DiveSitesContext"
import DiveSiteReducerActionsEnum from "@/app/enum/DiveSitesStateMutationsReducerActions"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"

export default function PopupModal({children}: { children?: any }) {
    const { diveSiteReducerDispatch, appError } = useContext(DiveSiteContext)

    function closeModal() {
        diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.HIDE_POPUP_MODAL })
    }

    return (<div className="popupModal overflow-y-scroll rounded-md bg-white z-50 py-5 px-6 absolute flex flex-col m-auto">
        <span onClick={closeModal} className="popupModal__close m-2 text-right text-slate-500 hover:text-black cursor-pointer text-2xl">
            <FontAwesomeIcon icon={faClose} />
        </span>
        {!appError ? children : <h1>{appError?.message || 'Error'}</h1>}    
    </div>)
}