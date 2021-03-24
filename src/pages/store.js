import { createStore, createHook, defaults } from 'react-sweet-state';
import produce from 'immer';

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

const initialState = {
    markers: [],
};

const actions = {
    addMarkers: (markers) => ({
        setState,
        getState,
    }) => {
        const state = getState();
        const existingMarkers = state.markers.map((marker) => marker.pageid);
        const newMarkers = markers.filter(
            (marker) => !existingMarkers.includes(marker.pageid)
        );

        setState(draft => {
            draft.markers.push(...newMarkers);
        });
    },
};

const Store = createStore({
    initialState,
    actions,
});

export const useMapStore = createHook(Store);