import { useContext } from "react"
import { DiveSiteContext } from "../context/DiveSitesContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DiveSiteListItem({ diveSite, onClickDiveSite = (() => {}), showDesc = true, buttonIcon, classNameOverride }: { diveSite: DiveSite, onClickDiveSite?: any, showDesc?: boolean, buttonIcon?: any, classNameOverride?: string }) {
    const { apiService } = useContext(DiveSiteContext)

    return (<li className={classNameOverride || "p-2 w-1/4"}>
        {diveSite.thumbnailPath ? <div className="w-full min-h-32 h-1/3 z-10 bg-cover bg-center rounded-md" style={{ backgroundImage: `url("${apiService.domain}${diveSite.thumbnailPath}")`}}>{buttonIcon && <span className="cursor-pointer relative p-1 z-20 float-right mx-2 mt-1 text-xl text-white opacity-50 hover:opacity-100" onClick={() => { onClickDiveSite(diveSite) }}><FontAwesomeIcon z={10} icon={buttonIcon} /></span>}</div> : <div className="w-full">{buttonIcon && <span className="cursor-pointer relative p-1 z-20 float-right mx-2 mt-1 text-xl text-white opacity-50 hover:opacity-100" onClick={() => { onClickDiveSite(diveSite) }}><FontAwesomeIcon z={10} icon={buttonIcon} /></span>}</div>}
        <p className="text-sm text-center font-semibold text-sky-900 my-2">{diveSite.name}</p>
        <p className="text-xs text-left italic text-green-300 flex flex-col"><span className="mb-1 text-lime-400 not-italic">Region<span className="text-black font-normal italic"> - {diveSite.region}</span></span><span className="mb-1">Latitude: <span className="text-black font-bold not-italic">{diveSite.coordinates.lat}</span></span><span className="mb-1">Longitude: <span className="text-black font-bold not-italic">{diveSite.coordinates.long}</span></span></p>
        {showDesc && <p className="text-xs text-left text-ellipsis">{diveSite.description}</p>}
    </li>)
}