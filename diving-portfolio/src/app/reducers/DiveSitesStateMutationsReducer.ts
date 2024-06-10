import DiveSiteReducerActionsEnum from '../enum/DiveSitesStateMutationsReducerActions'
import { APIService } from '../services/apiService';



export default function InitDiveSitesStateMutationsReducer(apiService: APIService) {
    function DiveSitesStateMutationsReducer(state: any, action: { type: string, payload?: any }) {
        let updatedState = {...state}
        /*
            State Props:
            { diveSites: [], userSavedDiveSites: [], appError: Error, showPopupModal: boolean } 
        */
        switch(action.type){
            case DiveSiteReducerActionsEnum.GET_SITES:
                updatedState = {
                    ...state,
                    diveSites: action.payload
                }
                break;
            case DiveSiteReducerActionsEnum.GET_USER_SITES:
                updatedState = {
                    ...state,
                    userSavedDiveSites: apiService.getUserSavedDiveSites()
                }
                break;
            case DiveSiteReducerActionsEnum.ADD_USER_SAVED_SITE:
                const existing = state.userSavedDiveSites.find((site: DiveSite) => site.id == action.payload.id)
                if(!existing) {
                    apiService.updateUserSavedDiveSites([...state.userSavedDiveSites, action.payload])
                    updatedState = {
                        ...state,
                        userSavedDiveSites: [...state.userSavedDiveSites, action.payload]
                    }
                }               
                break;
            case DiveSiteReducerActionsEnum.CREATE_DIVE_SITE:
                updatedState = {
                    ...state,
                    diveSites: [...state.diveSites, action.payload]
                }
                break;
            case DiveSiteReducerActionsEnum.DELETE_DIVE_SITE:
                const arrExcludedDeletedSiteFromDiveSites = state.diveSites.filter((site: DiveSite) => site.id !== action.payload.id)
                const arrExcludedDeletedSiteFromUserSavedSites = state.userSavedDiveSites.filter((site: DiveSite) => site.id !== action.payload.id)
                apiService.updateUserSavedDiveSites([...arrExcludedDeletedSiteFromUserSavedSites])
                updatedState = {
                    ...state,
                    diveSites: [...arrExcludedDeletedSiteFromDiveSites],
                    userSavedDiveSites: [...arrExcludedDeletedSiteFromUserSavedSites]
                }
                break;
            case DiveSiteReducerActionsEnum.REMOVE_USER_SAVED_SITE:
                const arrExcludedRemovedSiteFromUserSavedSites = state.userSavedDiveSites.filter((site: DiveSite) => site.id !== action.payload.id)
                apiService.updateUserSavedDiveSites([...arrExcludedRemovedSiteFromUserSavedSites])
                updatedState = {
                    ...state,
                    userSavedDiveSites: [...arrExcludedRemovedSiteFromUserSavedSites]
                }
                break;
            case DiveSiteReducerActionsEnum.APPLICATION_ERROR:
                updatedState = {
                    ...state,
                    appError: action.payload
                }
                break;
            case DiveSiteReducerActionsEnum.APPLICATION_ERROR_CLEAR:
                updatedState = {
                    ...state,
                    appError: null
                }
                break;
            case DiveSiteReducerActionsEnum.SHOW_POPUP_MODAL:
                updatedState = {
                    ...state,
                    showPopupModal: true
                }
                break;
            case DiveSiteReducerActionsEnum.HIDE_POPUP_MODAL:
                updatedState = {
                    ...state,
                    showPopupModal: false
                }
                break;
        }
    
        return updatedState;
    }
    return DiveSitesStateMutationsReducer;
}



