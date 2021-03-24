import { Modal } from 'antd';
import { useMapStore } from '../pages/store';

export default function ArticleModal() {

    const [{ modalVisible, currentArticle }, { setModalVisible }] = useMapStore();
    const { title, url } = currentArticle;

    const handleCancel = () => {
        setModalVisible(false);
    };

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
            <iframe
                src={url?.replace('wikipedia.org', 'm.wikipedia.org')}
                style={{ width: '100%', height: '100%', border: 'none' }}
                title={title}
            />
        </Modal>
    )
}
