'use client'

export class APIService {
    public domain = 'http://localhost:3001';
    public getDiveSites = () => {
        const url = `${this.domain}/sites/list`
        return fetch(url)
    }

    public addDiveSite = (diveSiteData: any) => {
        const url = `${this.domain}/sites/add`
        return fetch(url, {
            method: "POST",
            body: JSON.stringify({...diveSiteData}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public uploadDiveSiteThumb = (file: any, id: number) => {
        const fileType = file.name.split('.')[1]
        const url = `${this.domain}/sites/addThumbnail?id=${id}`
        return fetch(url, {
            method: "POST",
            body: file,
            headers: {
                'Content-Type': `image/${fileType === 'jpg' ? 'jpeg' : fileType}`
            }
        })
    }

    public getUserSavedDiveSites = () => {
        const storedSitesString = localStorage.getItem('userSavedDiveSites')
        return  (storedSitesString ? JSON.parse(storedSitesString) : [])
    }

    public updateUserSavedDiveSites = (userSavedDiveSites: any[]) => {
        localStorage.setItem('userSavedDiveSites', JSON.stringify(userSavedDiveSites))
    }

    public removeDiveSite = (diveSiteId: number) => {
        const url = `${this.domain}/sites/remove`
        return fetch(url, {
            method: "DEL",
            body: JSON.stringify({ diveSiteId }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}