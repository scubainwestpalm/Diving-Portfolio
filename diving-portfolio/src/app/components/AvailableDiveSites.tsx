'use client'

import { useContext, useEffect, useState } from "react"
import useFetch from "../hooks/useFetch"
import { DiveSiteContext } from "../context/DiveSitesContext"
import DiveSiteReducerActionsEnum from "../enum/DiveSitesStateMutationsReducerActions"
import DiveSiteListItem from "./DiveSiteListItem"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { createPortal } from "react-dom"
import PopupModal from "./popups/PopupModal"
import DiveSiteCreateForm from "./forms/DiveSiteCreateForm"

export default function AvailableDiveSites() {

    const { apiService, diveSiteReducerDispatch, diveSites, showPopupModal, appError } = useContext(DiveSiteContext)
    const { data, error, isLoading, setData: setDiveSitesData, callApi } = useFetch(apiService.getDiveSites, [])
    const [isConfirmingSiteCreate, setIsConfirmingSiteCreate] = useState(false)

    useEffect(() => {
        if (data.length && data.length > 0) {
            diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.GET_SITES, payload: data })
        }
    }, [data])

    useEffect(() => {
        if (error) {
            diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.APPLICATION_ERROR, payload: error })
        }
    }, [error])

    useEffect(() => {
        if (!showPopupModal) {
            setIsConfirmingSiteCreate(false);
        }
    }, [showPopupModal])

    function onClickAddDiveSite(diveSite: DiveSite) {
        diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.ADD_USER_SAVED_SITE, payload: { ...diveSite } })
    }

    function onClickCreateDiveSite() {
        diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.SHOW_POPUP_MODAL })
        setIsConfirmingSiteCreate(true)
    }

    function onClickConfirmCreateDiveSite() {
        if(!appError) {
            fetchNewList()
        }
        async function fetchNewList() {
            await callApi()
            diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.HIDE_POPUP_MODAL })
        }
    }

    return (<div className="availableDiveSites__wrapper flex-wrap z-0 relative w-full flex p-3 bg-white rounded-md min-h-80 flex-col">
        {(showPopupModal && isConfirmingSiteCreate) && createPortal(<PopupModal>
            <h1 className="font-bold text-md text-center w-full h-fit">Create New Dive Site</h1>
            <DiveSiteCreateForm onSubmitFinished={onClickConfirmCreateDiveSite} />
        </PopupModal>, document.getElementById("root__portal"))}
        <h1 className="flex items-center w-full font-bold">Available Dive Sites</h1>
        <span className="absolute top-2 z-10 right-2 text-green-500 text-lg cursor-pointer" onClick={onClickCreateDiveSite}>
            <FontAwesomeIcon icon={faCirclePlus} />
        </span>
        <ul className="w-full flex-wrap  flex">
            {isLoading ? <p>Loading Dive Sites...</p> : diveSites.map((diveSite: DiveSite, index: number) => <DiveSiteListItem key={index} diveSite={diveSite} buttonIcon={faCirclePlus} onClickDiveSite={onClickAddDiveSite} />)}
        </ul>
    </div>)
}