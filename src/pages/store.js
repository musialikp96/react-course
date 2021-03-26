import { createStore, createHook, defaults } from 'react-sweet-state';
import produce from 'immer';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const initialState = {
    markers: [],
    lang: 'pl',
    googleApiLoaded: false,
    modalVisible: false,
    currentArticle: {},
    styles: []
};

const actions = {
    addMarkers: (markers) => ({
        setState,
    }) => {
        setState(draft => {
            draft.markers = markers;
        });
    },
    setLang: (lang) => ({
        setState
    }) => {
        setState(draft => {
            draft.lang = lang
        });
    },
    setGoogleApiLoaded: value => ({ setState }) => {
        setState(draft => {
            draft.googleApiLoaded = value
        })
    },
    setModalVisible: value => ({ setState }) => {
        setState(draft => {
            draft.modalVisible = value
        })
    },
    setCurrentArticle: ({ url, title }) => ({ setState }) => {
        setState(draft => {
            draft.currentArticle = { url, title }
        })
    },
    setMarkerColor: (color, title) => ({ setState, getState }) => {
        const { markers } = getState();
        const markerIndex = markers.findIndex(marker => marker.title === title);

        setState(draft => {
            draft.markers[markerIndex].color = color
        })
    },
    addStyles: styles => ({ setState }) => {
        setState(draft => {
            draft.styles = styles
        })
    }
};

const Store = createStore({
    initialState,
    actions,
});

export const useMapStore = createHook(Store);