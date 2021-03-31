import { createStore, createHook, defaults } from 'react-sweet-state';
import produce from 'immer';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const initialState = {
    markers: [],
    lang: 'pl',
    googleApiLoaded: false,
    modalVisible: false,
    styleModalVisible: false,
    drawerVisible: false,
    currentArticle: {},
    styles: [],
    mapStyle: '',
    stylesFilters: {},
    customMarkerColors: {
        DEFAULT: {
            background: '#ff7e23e0',
            shadow: '#ffa769',
        },
        READ: {
            background: '#237bffe0',
            shadow: '#698bff',
        },
        VISITED: {
            background: '#aaa',
            shadow: '#222',
        }
    }
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
    setDrawerVisible: value => ({ setState }) => {
        setState(draft => {
            draft.drawerVisible = value
        })
    },
    setModalVisible: value => ({ setState }) => {
        setState(draft => {
            draft.modalVisible = value
        })
    },
    setStyleModalVisible: value => ({ setState }) => {
        setState(draft => {
            draft.styleModalVisible = value
        })
    },
    setCurrentArticle: ({ url, title }) => ({ setState }) => {
        setState(draft => {
            draft.currentArticle = { url, title }
        })
    },
    setMarkerState: (state, title) => ({ setState, getState }) => {
        const { markers } = getState();
        const markerIndex = markers.findIndex(marker => marker.title === title);

        setState(draft => {
            draft.markers[markerIndex].state = state
        })
    },
    addStyles: styles => ({ setState }) => {
        setState(draft => {
            draft.styles = styles
        })
    },
    setMapStyle: style => ({ setState }) => {
        setState(draft => {
            draft.mapStyle = style
        })
    },
    setStyleFilters: (filterName, filterValue) => ({ setState }) => {
        setState(draft => {
            let filters = draft.stylesFilters;
            filters = {
                ...filters,
                [filterName]: filterValue
            }

            draft.stylesFilters = filters
        })
    }
};

const Store = createStore({
    initialState,
    actions,
});

export const useMapStore = createHook(Store);