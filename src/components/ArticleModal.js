import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { emit, EVENT_TYPE } from '../pages/GoogleMapMediator';
import { useMapStore } from '../pages/store';
import { ARTICLE_STATE } from '../services/ArticlesDatabase';

export default function ArticleModal() {

    const [{ modalVisible, currentArticle, markers }, { setModalVisible }] = useMapStore();
    const { title, url } = currentArticle;
    const [isVisited, setIsVisited] = useState(false);

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleVisitedClick = () => {
        emit(EVENT_TYPE.MARKER_VISITED, title);
        setIsVisited(true);
    }

    useEffect(() => {
        setIsVisited(markers.find(({ title: t }) => t === title)?.state === ARTICLE_STATE.VISITED)
    }, [modalVisible])

    return (
        <Modal
            title={title}
            visible={modalVisible}
            onCancel={handleCancel}
            footer={null}
            width='80vw'
            bodyStyle={{
                height: '80vh'
            }}
        >
            <Button onClick={handleVisitedClick} type={isVisited ? 'primary' : ''}>
                Mark as Visited
            </Button>
            <iframe
                src={url?.replace('wikipedia.org', 'm.wikipedia.org')}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={title}
            />
        </Modal>
    )
}
