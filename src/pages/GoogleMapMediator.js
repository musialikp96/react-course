import WikipediaApi from '../services/api/WikipediaApi';
import SnazzyApi from '../services/api/SnazzyApi';
import { useMapStore } from './store';
import { useState } from 'react';
import ArticleDatabase from '../services/ArticlesDatabase';
import debounce from 'lodash/debounce';

export const EVENT_TYPE = Object.freeze({
    MAP_CENTER_CHANGED: "MAP_CENTER_CHANGED",
    MAP_LOADED: "MAP_LOADED",
    PLACES_SEARCHED: "PLACES_SEARCHED",
    LANG_CHANGED: "LANG_CHANGED",
    MARKER_CLICKED: "MARKER_CLICKED",
    STYLE_TOGGLE_CLICKED: "STYLE_TOGGLE_CLICKED",
    STYLE_CLICKED: "STYLE_CLICKED",
})

const list = {};
let map = null;
const defaultArticleColor = 'orange';
const readArticleColor = 'blue';

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
const mapReadArticle = ({ title, ...rest }) => {
    return {
        ...rest,
        title,
        color: ArticleDatabase.isArticleRead(title)
            ? readArticleColor
            : defaultArticleColor
    }
}

export const useGoogleMapMediator = () => {

    const [{ lang: storeLang }, {
        addMarkers,
        addStyles,
        setLang,
        setGoogleApiLoaded,
        setModalVisible,
        setCurrentArticle,
        setMarkerColor,
        setMapStyle,
        setStyleModalVisible
    }] = useMapStore();

    const [lastCenter, setLastCenter] = useState();

    const updateMarkers = async (center = lastCenter, lang = storeLang) => {
        let { query: { geosearch: data } } = await WikipediaApi.getArticles({
            coord: center,
            limit: 50
        }, lang);
        setLastCenter(center);

        let articles = data
            .map(mapWikiArticleToMarker)
            .map(mapReadArticle)

        addMarkers(articles);
    }

    const debouncedUpdateMarkes = debounce(updateMarkers, 250);

    const mapCenterChanged = async (center) => {
        debouncedUpdateMarkes(center)
    }

    const mapLoaded = async (mapInstance) => {
        map = mapInstance;
        setGoogleApiLoaded(true);
        updateStyles();
    }

    const langChanged = async (lang) => {
        setLang(lang);
        debouncedUpdateMarkes(lastCenter, lang)
    }

    const placesSearched = async (location) => {
        map.setCenter(location);
    }

    const markerClicked = async (title) => {
        const { query: { pages } } = await WikipediaApi.getArticle({ title }, storeLang);
        const page = Object.values(pages)[0];
        setCurrentArticle({ url: page.fullurl, title });
        setModalVisible(true);
        setMarkerColor(readArticleColor, title)
        ArticleDatabase.setArticleAsRead(title);
    }

    const updateStyles = async () => {
        let { styles } = await SnazzyApi.getStyles(1);
        addStyles(styles);
    }

    attachListener(EVENT_TYPE.MAP_CENTER_CHANGED, mapCenterChanged)
    attachListener(EVENT_TYPE.MAP_LOADED, mapLoaded)
    attachListener(EVENT_TYPE.LANG_CHANGED, langChanged)
    attachListener(EVENT_TYPE.PLACES_SEARCHED, placesSearched)
    attachListener(EVENT_TYPE.MARKER_CLICKED, markerClicked)
    attachListener(EVENT_TYPE.STYLE_TOGGLE_CLICKED, () => setStyleModalVisible(true))
    attachListener(EVENT_TYPE.STYLE_CLICKED, setMapStyle)
}

const GoogleMapMediator = () => {
    useGoogleMapMediator();
    return null
}

export default GoogleMapMediator