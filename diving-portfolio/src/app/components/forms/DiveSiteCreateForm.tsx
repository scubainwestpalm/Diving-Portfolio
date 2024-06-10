import { DiveSiteContext } from "@/app/context/DiveSitesContext";
import DiveSiteReducerActionsEnum from "@/app/enum/DiveSitesStateMutationsReducerActions";
import useFetch from "@/app/hooks/useFetch";
import { useContext } from "react";

export default function DiveSiteCreateForm({ onSubmitFinished }) {
    const { apiService, diveSiteReducerDispatch } = useContext(DiveSiteContext)

    function handleCreateSubmit(event: any) {
        event.preventDefault();
        const newDiveSite = {
            name: event.target[0].value,
            description: event.target[1].value,
            coordinates: {
                lat: parseInt(event.target[2].value),
                long: parseInt(event.target[3].value)
            },
            region: event.target[4].value
        }
        apiCreateDiveSite()
        async function apiCreateDiveSite() {
            try {
                const response = await apiService.addDiveSite(newDiveSite)
                const resData = await response.json()
                if(!response.ok) {
                    throw new Error('Error creating dive site: ' + `${response.status}  ${response.statusText}`)
                }
                if(event.target[5] && event.target[5].files[0]) {
                    await uploadThumbnail(event.target[5].files[0], resData.id)
                }
            } catch(err) {
                diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.APPLICATION_ERROR, payload: err })
            }
            onSubmitFinished()
        }
        async function uploadThumbnail(file: any, id: number) {
            try {
                const response = await apiService.uploadDiveSiteThumb(file, id)
                if(!response.ok) {
                    throw new Error('Error creating dive site: ' + `${response.status}  ${response.statusText}`)
                }
            } catch(err) {
                diveSiteReducerDispatch({ type: DiveSiteReducerActionsEnum.APPLICATION_ERROR, payload: err })
            }
        }
    }


    return (<form className="flex flex-col" onSubmit={handleCreateSubmit}>
        <label>
            Name
        </label>
        <input className="border border-2 border-sky-700 rounded-md p-3" type="text" name="name" required />
        <label>
            Description
        </label>
        <textarea className="border border-2 border-sky-700 max-h-24 rounded-md" name="description" required />
        <label className="font-bold text-sm my-5 text-center w-full h-fit">
            Coordinates:
        </label>
        <label>
            Latitude
        </label>
        <input className="border border-2 border-sky-700 rounded-md p-3" type="number" name="lat" required />
        <label>
            Longitude
        </label>
        <input className="border border-2 border-sky-700 rounded-md p-3" type="number" name="long" required />
        <label className="mt-5">
            Region
        </label>
        <input className="border border-2 border-sky-700 mb-5 rounded-md p-3" type="text" name="name" required />
        <label>
            Thumbnail Image
        </label>
        <input className="my-2" type="file" name="file" accept=".png, .jpg, .jpeg" />
        <input className="bg-green-600 hover:bg-green-800 rounded-md p-3 ml-6 text-white font-bold" type="submit" value="Submit" />
    </form>)
}