import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';

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
    return (
        <GoogleMapContainer>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyD5lXuWjwGpn5aodgkuA4nkjSpsKKIPnU0',
                    libraries: ['places']
                }}
                defaultCenter={katowicePosition}
                defaultZoom={defaultZoom}
                yesIWantToUseGoogleMapApiInternals
            />
        </GoogleMapContainer>
    )
}
