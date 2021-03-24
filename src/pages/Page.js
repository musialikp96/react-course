import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import GoogleMap from '../components/GoogleMap';
import LangToggle from '../components/lang/LangToggle';
import GoogleMapMediator from './GoogleMapMediator';

const { Header: AntHeader, Content } = AntLayout;

const Logo = styled.h2`
    color:#fff;
`;

const Inner = styled(Content)`
    min-height:280px;
    padding:0;
    background:#fff;
`;
const Layout = styled(AntLayout)`
    min-height:100vh;
`;
const Header = styled(AntHeader)`
    display:flex;
    justify-content:space-between;
    align-items:center;
`;

export default function Page() {
    return (
        <Layout>
            <GoogleMapMediator />
            <Header>
                <Logo>Wikipedia Map</Logo>
                <LangToggle />
            </Header>
            <Inner>
                <GoogleMap />
            </Inner>
        </Layout>
    )
}