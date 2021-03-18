import { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import WikipediaApi from '../services/api/WikipediaApi';

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

    useEffect(() => {
        const getData = async () => {
            let { query: { geosearch: data } } = await WikipediaApi.getArticles({
                coord: katowicePosition,
                limit: 10
            });
            console.log({ data });
        }
        getData();
    }, [])

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
            />
        </GoogleMapContainer>
    )
}
