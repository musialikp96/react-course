import { useMapStore } from '../pages/store';
import { Row, Col, Modal, Button } from 'antd';
import StylePreview from './StylePreview';
import { EVENT_TYPE, emit } from '../pages/GoogleMapMediator';


export const StylePickerToggle = () => {

    const showStyleModal = () => {
        emit(EVENT_TYPE.STYLE_TOGGLE_CLICKED);
    }

    return (
        <Button type="primary" shape="circle" onClick={showStyleModal}>
            style
        </Button>
    )
}

export default function StylePicker() {

    const [{ styleModalVisible, styles }, { setStyleModalVisible }] = useMapStore();

    const handleCancel = () => {
        setStyleModalVisible(false)
    };

    const onStyleClicked = (style) => {
        emit(EVENT_TYPE.STYLE_CLICKED, style)
    }

    return (
        <Modal
            title={'Choose style for map'}
            visible={styleModalVisible}
            onCancel={handleCancel}
            footer={null}
            width='80vw'
            bodyStyle={{
                height: '80vh'
            }}
        >
            <Row>
                {
                    styles.map(({ imageUrl, id, json }) => (

                        <Col span={6} key={id}>
                            <StylePreview
                                imageUrl={imageUrl}
                                onClick={() => onStyleClicked(JSON.parse(json))}
                            />
                        </Col>
                    ))
                }
            </Row>
        </Modal>
    )
}
