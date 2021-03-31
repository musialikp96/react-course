
import { useMapStore } from '../pages/store';
import { List, Drawer, Button } from 'antd';
import { emit, EVENT_TYPE } from '../pages/GoogleMapMediator';
import { UnorderedListOutlined } from '@ant-design/icons';



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
        return markers.filter(({ color }) => color !== 'orange');
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
                renderItem={item => <List.Item>{item.title}</List.Item>}
            />
        </Drawer>
    )
}
