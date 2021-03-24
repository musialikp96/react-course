import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import ArticleModal from '../components/ArticleModal';
import GoogleMap from '../components/GoogleMap';
import Header from '../components/Header';
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
                <ArticleModal />
                <GoogleMap />
            </Inner>
        </Layout>
    )
}