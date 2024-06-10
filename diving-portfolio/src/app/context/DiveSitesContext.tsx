'use client'

import { createContext, useEffect, useReducer } from "react"
import { APIService } from "../services/apiService"
import InitDiveSitesStateMutationsReducer from "../reducers/DiveSitesStateMutationsReducer"
import DiveSiteReducerActionsEnum from "../enum/DiveSitesStateMutationsReducerActions"

export const DiveSiteContext = createContext({ diveSites: [], userSavedDiveSites: [], diveSiteReducerDispatch: ({}) => {}, apiService: new APIService(), appError: null, showPopupModal: false })
    
const apiService = new APIService()

export function DiveSitesContextProvider({ children }: any) {

    const DiveSitesStateMutationsReducer = InitDiveSitesStateMutationsReducer(apiService);

    const [diveSitesData, dispatch] = useReducer(DiveSitesStateMutationsReducer, { diveSites: [], userSavedDiveSites: [], showPopupModal: false, appError: null })

    useEffect(() => {
        dispatch({ type: DiveSiteReducerActionsEnum.GET_USER_SITES })
        localStorage.theme = 'light';
    }, [])

    const ctxValue = {
        diveSites: diveSitesData.diveSites, 
        userSavedDiveSites: diveSitesData.userSavedDiveSites,
        diveSiteReducerDispatch: dispatch,
        apiService,
        appError: diveSitesData.appError,
        showPopupModal: diveSitesData.showPopupModal
    }

    return (
        //@ts-ignore
        <DiveSiteContext.Provider value={ctxValue}>
            {children}
        </DiveSiteContext.Provider>
    )
}