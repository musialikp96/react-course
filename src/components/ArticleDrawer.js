
import { useMapStore } from '../pages/store';
import { List, Drawer, Button } from 'antd';
import { emit, EVENT_TYPE } from '../pages/GoogleMapMediator';
import { UnorderedListOutlined } from '@ant-design/icons';
import { ARTICLE_STATE } from '../services/ArticlesDatabase';



export const DrawerToggle = () => {

    const showStyleModal = () => {
        emit(EVENT_TYPE.DRAWER_TOGGLE_CLICKED);
    }

    return (
        <Button type="primary" onClick={showStyleModal}>
            <UnorderedListOutlined />
        </Button>
    )
}

export default function ArticleDrawer() {

    const [{ markers, drawerVisible }, { setDrawerVisible }] = useMapStore();

    const onClose = () => {
        setDrawerVisible(false);
    };

    const filterMarkersToVisitedArticles = (markers) => {
        return markers.filter(({ state }) => state !== ARTICLE_STATE.DEFAULT);
    }

    const handleItemClick = (item) => {
        emit(EVENT_TYPE.DRAWER_ARTICLE_CLICKED, item);
    }

    return (
        <Drawer
            title="Visited markers"
            placement="left"
            closable={false}
            onClose={onClose}
            visible={drawerVisible}
        >
            <List
                size="large"
                bordered
                dataSource={filterMarkersToVisitedArticles(markers)}
                renderItem={item => <List.Item onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>{item.title}</List.Item>}
            />
        </Drawer>
    )
}
