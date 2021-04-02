import { useMapStore } from '../pages/store';
import { List, Drawer } from 'antd';
import { emit, EVENT_TYPE } from '../pages/GoogleMapMediator';
import { ARTICLE_STATE } from '../services/ArticlesDatabase';

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
