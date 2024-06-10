import { Router } from 'express';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { DiveSite } from '../types/DiveSite'

const diveSiteRouter = Router();
 
diveSiteRouter.get('/sites/list', (req, res, next) => {
    const diveSiteDataRaw = getDiveSiteRawData();
    res.status(200);
    res.setHeader('Content-Type', 'application/json')
    return res.send(diveSiteDataRaw["dive_sites"]);
})


diveSiteRouter.delete('/sites/remove', (req, res, next) => {
    const diveSites = getDiveSiteRawData()["dive_sites"];
    const diveSiteIds = diveSites.map((site: DiveSite) => site.id)
    const invalidId = diveSiteIds.indexOf(req.body.id) === -1

    if(!req.body || !req.body.id || invalidId) {
        res.status(400);
        return res.send({ "error": `No Valid Dive Site Id Specified to Delete${invalidId ? ", invalid id " + req.body.id : ""}.`})
    }

    const arrExcludedDeletedSiteFromDiveSites = diveSites.filter((site: DiveSite) => site.id !== req.body.id)
    
    updateDiveSiteData({ "dive_sites": arrExcludedDeletedSiteFromDiveSites })

    res.status(200);
    res.setHeader('Content-Type', 'application/json')
    return res.send({ "status": "ok"});
})

diveSiteRouter.post('/sites/add', (req, res, next) => {
    const diveSites = getDiveSiteRawData()["dive_sites"];
    const isValidDiveSite = checkIsValidDiveSite(req.body)

    if(!req.body || !isValidDiveSite) {
        res.status(400);
        return res.send({ "error": `Invalid Dive Site Data Passed.`})
    }

    const id = diveSites[diveSites.length - 1].id + 1;
    const newDiveSiteObj = { id, ...req.body}
    const updatedDiveSitesArr = [...diveSites, newDiveSiteObj]
    updateDiveSiteData({ "dive_sites": updatedDiveSitesArr })
    res.status(200);
    res.send(newDiveSiteObj);
})

diveSiteRouter.post('/sites/addThumbnail', express.raw({
    inflate: true,
    limit: '50mb',
    type: ["image/png", "image/jpeg"],
  }),(req, res, next) => {
    const diveSites = getDiveSiteRawData()["dive_sites"];
    const diveSiteIds = diveSites.map((site: DiveSite) => site.id)

    //@ts-ignore
    if(!req?.query?.id || (diveSiteIds.indexOf(parseInt(req.query.id)) === -1)) {
        res.status(400);
        return res.send({ "error": "Must specify valid id for dive site." })
    } else if(!req.headers['content-type'] || !req.body) {
        res.status(400);
        return res.send({ "error": "Must use valid content type." })
    } 

    //@ts-ignore
    const id = parseInt(req.query.id)

    //@ts-ignore
    const fileType = req.headers['content-type'].split('/')[1]
    //@ts-ignore
    const imgNum = (parseInt(req.query.id)+1);
    const fileName = imgNum < 9 ? ('0' + imgNum.toString()) : imgNum

    //@ts-ignore
    const diveSitesUpdated = diveSites.map((site: DiveSite) => site.id === id ? { ...site, thumbnailPath: `/thumbnailImages/${fileName}.${fileType}` } : site)

    fs.writeFile(path.join(__dirname, '..', '..', 'public', 'thumbnailImages',`${fileName}.${fileType}`), req.body, () => {
        res.status(200);
        res.setHeader('Content-Type', 'application/json');
        updateDiveSiteData({ "dive_sites": diveSitesUpdated });
        return res.send({ "status": "ok"});
    })
})

function checkIsValidDiveSite(diveSite: any) {
    return !!diveSite?.name && !!diveSite.description && (!!diveSite.coordinates && !!diveSite.coordinates.lat  && !!diveSite.coordinates.long) && !!diveSite.region;
}

function getDiveSiteRawData() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'DiveSiteSampleData.json'), { encoding: 'utf8' }));
}

function updateDiveSiteData(updateDiveSiteData: any) {
    fs.writeFileSync(path.join(__dirname, '..', '..', 'DiveSiteSampleData.json'), JSON.stringify(updateDiveSiteData), { encoding: 'utf8' })
}

export default diveSiteRouter;