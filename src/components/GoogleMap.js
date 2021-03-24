import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { EVENT_TYPE, emit } from '../pages/GoogleMapMediator';

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

    const handleChangeMap = ({ center }) => {
        emit(EVENT_TYPE.MAP_DRAGGED, center);
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
                onChange={handleChangeMap}
            />
        </GoogleMapContainer>
    )
}
