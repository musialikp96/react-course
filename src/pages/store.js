import { createStore, createHook, defaults } from 'react-sweet-state';
import produce from 'immer';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const initialState = {
    markers: [],
    lang: 'pl'
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
    }
};

const Store = createStore({
    initialState,
    actions,
});

export const useMapStore = createHook(Store);