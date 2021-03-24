import WikipediaApi from '../services/api/WikipediaApi';
import { useMapStore } from './store';
import { useState } from 'react';

export const EVENT_TYPE = Object.freeze({
    MAP_CENTER_CHANGED: "MAP_CENTER_CHANGED",
    MAP_LOADED: "MAP_LOADED",
    PLACES_SEARCHED: "PLACES_SEARCHED",
    LANG_CHANGED: "LANG_CHANGED",
    MARKER_CLICKED: "MARKER_CLICKED",
})

const list = {};
let map = null;

export const emit = (eventType, ...args) => {
    list[eventType] && list[eventType](...args)
}

export const attachListener = (eventType, eventAction) => {
    list[eventType] = eventAction
}

const mapWikiArticleToMarker = ({ lat, lon, pageid, title }) => {
    return {
        lat,
        lng: lon,
        pageid,
        title
    }
}

export const useGoogleMapMediator = () => {

    const [{ lang: storeLang }, { addMarkers, setLang, setGoogleApiLoaded, setModalVisible, setCurrentArticle }] = useMapStore();
    const [lastCenter, setLastCenter] = useState();

    const updateMarkers = async (center = lastCenter, lang = storeLang) => {
        let { query: { geosearch: data } } = await WikipediaApi.getArticles({
            coord: center,
            limit: 100
        }, lang);
        setLastCenter(center);
        addMarkers(data.map(mapWikiArticleToMarker));
    }

    const mapCenterChanged = async (center) => {
        updateMarkers(center)
    }

    const mapLoaded = async (mapInstance) => {
        map = mapInstance;
        setGoogleApiLoaded(true)
    }

    const langChanged = async (lang) => {
        setLang(lang);
        updateMarkers(lastCenter, lang)
    }

    const placesSearched = async (location) => {
        map.setCenter(location);
    }


    const markerClicked = async (title) => {
        const { query: { pages } } = await WikipediaApi.getArticle({ title }, storeLang);
        const page = Object.values(pages)[0];
        setCurrentArticle({ url: page.fullurl, title });
        setModalVisible(true);
    }

    attachListener(EVENT_TYPE.MAP_CENTER_CHANGED, mapCenterChanged)
    attachListener(EVENT_TYPE.MAP_LOADED, mapLoaded)
    attachListener(EVENT_TYPE.LANG_CHANGED, langChanged)
    attachListener(EVENT_TYPE.PLACES_SEARCHED, placesSearched)
    attachListener(EVENT_TYPE.MARKER_CLICKED, markerClicked)
}

const GoogleMapMediator = () => {
    useGoogleMapMediator();
    return null
}

export default GoogleMapMediator