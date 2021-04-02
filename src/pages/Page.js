import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import ArticleDrawer from '../components/ArticleDrawer';
import ArticleModal from '../components/ArticleModal';
import ColorPicker from '../components/ColorPicker';
import GoogleMap from '../components/GoogleMap';
import Header from '../components/header/Header';
import StylePicker from '../components/StylePicker';
import GoogleMapMediator from './GoogleMapMediator';

const { Content } = AntLayout;

const Inner = styled(Content)`
    min-height:280px;
    padding:0;
    background:#fff;
`;
const Layout = styled(AntLayout)`
    min-height:100vh;
`;

export default function Page() {
    return (
        <Layout>
            <GoogleMapMediator />
            <Header />
            <Inner>
                <ColorPicker />
                <ArticleDrawer />
                <ArticleModal />
                <GoogleMap />
                <StylePicker />
            </Inner>
        </Layout>
    )
}