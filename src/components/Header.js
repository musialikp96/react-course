import { useEffect } from 'react';
import { Layout as AntLayout, Input, Space } from 'antd';
import styled from 'styled-components';
import LangToggle from './lang/LangToggle';
import { StylePickerToggle } from './StylePicker';
import { useMapStore } from '../pages/store';
import { emit, EVENT_TYPE } from '../pages/GoogleMapMediator';
import { DrawerToggle } from './ArticleDrawer';
import { ColorPickerToggle } from './ColorPicker';

const { Header: AntHeader } = AntLayout;

const Logo = styled.h2`
    color:#fff;
    margin-bottom:0;
`;

const StyledHeader = styled(AntHeader)`
    display:flex;
    align-items:center;
`;

const SearchBox = styled(Input).attrs({
    type: 'text',
    placeholder: 'Type location...'
})`
    margin: 10px 20px;
    max-width:300px;
`;

const RightAside = styled(Space)`
    margin-left:auto;
    padding:10px;
`;

export default function Header() {

    const [{ googleApiLoaded }] = useMapStore();

    useEffect(() => {
        if (googleApiLoaded) {
            const input = document.getElementById("searchbox");
            const searchbox = new window.google.maps.places.SearchBox(input);
            searchbox.addListener('places_changed', () => {
                const selectedPlace = searchbox.getPlaces()[0];
                const { location } = selectedPlace.geometry;
                emit(EVENT_TYPE.PLACES_SEARCHED, location.toJSON())
            })
        }
    }, [googleApiLoaded])

    return (
        <StyledHeader>
            <Logo>Wikipedia Map</Logo>
            <SearchBox id="searchbox" />
            <RightAside>
                <ColorPickerToggle />
                <DrawerToggle />
                <LangToggle />
                <StylePickerToggle />
            </RightAside>
        </StyledHeader>
    )
}
