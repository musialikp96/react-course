import WikipediaApi from '../services/api/WikipediaApi';
import { useMapStore } from './store';
import { useState } from 'react';

export const EVENT_TYPE = Object.freeze({
    MAP_DRAGGED: "MAP_DRAGGED",
    MAP_LOADED: "MAP_LOADED",
    LANG_CHANGED: "LANG_CHANGED",
})

const list = {};

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

    const [{ lang: storeLang }, { addMarkers, setLang, setGoogleApiLoaded }] = useMapStore();
    const [lastCenter, setLastCenter] = useState();

    const updateMarkers = async (center = lastCenter, lang = storeLang) => {
        let { query: { geosearch: data } } = await WikipediaApi.getArticles({
            coord: center,
            limit: 100
        }, lang);
        setLastCenter(center);
        addMarkers(data.map(mapWikiArticleToMarker));
    }

    const mapDragged = async (center) => {
        updateMarkers(center)
    }

    const mapLoaded = async () => {
        setGoogleApiLoaded(true)
    }

    const langChanged = async (lang) => {
        setLang(lang);
        updateMarkers(lastCenter, lang)
    }

    attachListener(EVENT_TYPE.MAP_DRAGGED, mapDragged)
    attachListener(EVENT_TYPE.MAP_LOADED, mapLoaded)
    attachListener(EVENT_TYPE.LANG_CHANGED, langChanged)
}

const GoogleMapMediator = () => {
    useGoogleMapMediator();
    return null
}

export default GoogleMapMediator