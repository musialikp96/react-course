import WikipediaApi from '../services/api/WikipediaApi';

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

export const useGoogleMapMediator = () => {
    const mapDragged = async (center) => {

        let { query: { geosearch: data } } = await WikipediaApi.getArticles({
            coord: center,
            limit: 10
        });
        console.log({ data });
    }

    attachListener(EVENT_TYPE.MAP_DRAGGED, mapDragged)
}

const GoogleMapMediator = () => {
    useGoogleMapMediator();
    return null
}

export default GoogleMapMediator