import { useMapStore } from '../pages/store';
import { Row, Col, Modal, Button } from 'antd';
import StylePreview from './StylePreview';
import { EVENT_TYPE, emit } from '../pages/GoogleMapMediator';
import Select from './Select';
import { BgColorsOutlined } from '@ant-design/icons';

const filters = {
    tag: [
        'colorful',
        'complex',
        'dark',
        'greyscal',
        'light',
        'monochro',
        'no-label',
        'simple',
        'two-tone',
    ],
    color: [
        'black',
        'blue',
        'gray',
        'green',
        'multi',
        'orange',
        'purple',
        'red',
        'white',
        'yellow',
    ]
}

export const StylePickerToggle = () => {

    const showStyleModal = () => {
        emit(EVENT_TYPE.STYLE_TOGGLE_CLICKED);
    }

    return (
        <Button type="primary" onClick={showStyleModal}>
            <BgColorsOutlined />
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

    const onFilterChanged = (filterName, filterValue) => {
        emit(EVENT_TYPE.STYLE_FILTER_CHANGED, filterName, filterValue);
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
            <Select
                options={filters.tag}
                placeholder={'Tag'}
                onChange={(value) => onFilterChanged('tag', value)}
            />
            <Select
                options={filters.color}
                placeholder={'Color'}
                onChange={(value) => onFilterChanged('color', value)}
            />

            <Row style={{ marginTop: 20 }}>
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
