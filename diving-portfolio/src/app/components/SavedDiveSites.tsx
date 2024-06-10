import { useContext, useEffect, useState } from "react"
import { DiveSiteContext } from "../context/DiveSitesContext"
import DiveSiteListItem from "./DiveSiteListItem"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import DiveSiteReducerActionsEnum from "../enum/DiveSitesStateMutationsReducerActions"
import { createPortal } from "react-dom"
import PopupModal from "./popups/PopupModal"

export default function SavedDiveSites() {
    const { apiService, diveSiteReducerDispatch, userSavedDiveSites, showPopupModal } = useContext(DiveSiteContext)
    const [isConfirmingSiteRemoval, setIsConfirmingSiteRemoval] = useState({ isConfirming: false, diveSite: null })

    useEffect(() => {
        if(!showPopupModal) {
            setIsConfirmingSiteRemoval({ isConfirming: false, diveSite: null });
        }
    }, [showPopupModal])

    function onClickRemoveDiveSiteFromSaved(diveSite: DiveSite) {
        diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.SHOW_POPUP_MODAL })
        setIsConfirmingSiteRemoval({ isConfirming: true, diveSite });
    }

    function onClickConfirmRemove() {
        diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.REMOVE_USER_SAVED_SITE, payload: {...isConfirmingSiteRemoval.diveSite} })
        diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.HIDE_POPUP_MODAL })

    }

    function onClickCancelRemove() {
        diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.HIDE_POPUP_MODAL })
    }

    return (<div className="savedDiveSites__wrapper flex-wrap w-full flex p-3 bg-white rounded-md min-h-52 flex-col">
        {(showPopupModal && isConfirmingSiteRemoval.isConfirming) && createPortal(<PopupModal>
            <ul className="w-full flex h-4/5 flex-col">
                <DiveSiteListItem diveSite={isConfirmingSiteRemoval.diveSite} classNameOverride="p-2 w-full h-full" />
            </ul>
            <ul className="w-full items-center flex mt-2 grow flex-row-reverse">
                <li><button className="bg-green-600 hover:bg-green-800 rounded-md p-3 ml-6 text-white font-bold" onClick={onClickConfirmRemove}>Confirm</button></li>
                <li><button className="bg-red-600 hover:bg-red-800 rounded-md p-3  text-white font-bold" onClick={onClickCancelRemove}>Cancel</button></li>
                <h1 className="font-bold text-sm text-left w-full h-fit">Confirm Remove From Saved Sites?</h1>
            </ul>
        </PopupModal>, document.getElementById("root__portal"))}
        <h1 className="flex items-center w-full font-bold">Saved Dive Sites</h1>
        <ul className="w-full flex-wrap  flex">
            {userSavedDiveSites.map((diveSite: DiveSite, index: number) => <DiveSiteListItem key={index} showDesc={false} diveSite={diveSite} buttonIcon={faXmark} onClickDiveSite={onClickRemoveDiveSiteFromSaved} />)}
        </ul>
    </div>)
}