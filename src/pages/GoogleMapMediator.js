import WikipediaApi from '../services/api/WikipediaApi';
import { useMapStore } from './store';

export const EVENT_TYPE = Object.freeze({
    MAP_DRAGGED: "MAP_DRAGGED"
})

const list = {};

export const emit = (eventType, ...args) => {
    list[eventType] && list[eventType](...args)
}

export const attachListener = (eventType, eventAction) => {
    list[eventType] = eventAction
}

const mapWikiArticleToMarker = ({ lat, lon, pageid }) => {
    return {
        lat,
        lng: lon,
        pageid
    }
}

export const useGoogleMapMediator = () => {

    const [, { addMarkers }] = useMapStore();

    const mapDragged = async (center) => {

        let { query: { geosearch: data } } = await WikipediaApi.getArticles({
            coord: center,
            limit: 10
        });

        addMarkers(data.map(mapWikiArticleToMarker));
    }

    attachListener(EVENT_TYPE.MAP_DRAGGED, mapDragged)
}

const GoogleMapMediator = () => {
    useGoogleMapMediator();
    return null
}

export default GoogleMapMediator