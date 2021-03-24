import { useEffect } from 'react';
import { Layout as AntLayout, Input } from 'antd';
import styled from 'styled-components';
import LangToggle from './lang/LangToggle';
import { useMapStore } from '../pages/store';

const { Header: AntHeader } = AntLayout;

const Logo = styled.h2`
    color:#fff;
    margin-bottom:0;
`;

const StyledHeader = styled(AntHeader)`
    display:flex;
    align-items:center;
`;

const SearchBox = styled(Input)`
    margin: 10px 20px;
    max-width:300px;
`;

const RightAside = styled.div`
    margin-left:auto;
    padding:10px;
`;

export default function Header() {

    const [{ googleApiLoaded }] = useMapStore();

    useEffect(() => {
        if (googleApiLoaded) {
            const input = document.getElementById("pac-input");
            const autocomplete = new window.google.maps.places.Autocomplete(input);
        }
    }, [googleApiLoaded])

    return (
        <StyledHeader>
            <Logo>Wikipedia Map</Logo>
            <SearchBox placeholder="Basic usage" />
            <RightAside>
                <LangToggle />
            </RightAside>
        </StyledHeader>
    )
}
