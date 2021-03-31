import { Button, Modal } from 'antd';
import { emit, EVENT_TYPE } from '../pages/GoogleMapMediator';
import { useMapStore } from '../pages/store';

export default function ArticleModal() {

    const [{ modalVisible, currentArticle }, { setModalVisible }] = useMapStore();
    const { title, url } = currentArticle;

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleVisitedClick = () => {
        emit(EVENT_TYPE.MARKER_VISITED, title);
    }

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
            <Button onClick={handleVisitedClick}>
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
