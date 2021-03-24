import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { EVENT_TYPE, emit } from '../pages/GoogleMapMediator';
import { useMapStore } from '../pages/store';
import MarkerWithTooltip from './MarkerWithTooltip';

const GoogleMapContainer = styled.div`
    width:100%;
    height:calc(100vh - 64px);
`;

const katowicePosition = {
    lat: 50.2600433,
    lng: 19.0347579
}

const defaultZoom = 14

export default function GoogleMap() {

    const [{ markers }] = useMapStore();

    const handleChangeMap = ({ center }) => {
        emit(EVENT_TYPE.MAP_DRAGGED, center);
    }

    const handleApiLoaded = (map, maps) => {
        emit(EVENT_TYPE.MAP_LOADED);
    }


    return (
        <GoogleMapContainer>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_API_KEY,
                    libraries: ['places']
                }}
                defaultCenter={katowicePosition}
                defaultZoom={defaultZoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ maps, map }) => handleApiLoaded(map, maps)}
                onChange={handleChangeMap}
            >
                {markers.map((marker) => (
                    <MarkerWithTooltip title={marker.title} key={marker.pageid} lat={marker.lat} lng={marker.lng} />
                ))}
            </GoogleMapReact>
        </GoogleMapContainer>
    )
}
